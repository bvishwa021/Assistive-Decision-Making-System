print("App is starting...")

from flask import Flask, request, jsonify
from flask_cors import CORS
from services.prediction_service import PredictionService
from services.insight_service import InsightService
from utils.validations import validate_request
from utils.response_formatter import format_response

app = Flask(__name__)
CORS(app)
prediction_service = PredictionService()
insight_service = InsightService()

@app.route("/analyze", methods=["GET", "POST"])
def analyze():

    data = request.json

    # Validate input
    valid, error = validate_request(data)
    if not valid:
        return jsonify({"error": error}), 400

    results = []
    raw_values = []

    for internship in data:
        values = [
            internship["stipend"],
            internship["workload"],
            internship["company_reputation"],
            internship["time_flexibility"]
        ]
        raw_values.append(values)
        cluster = prediction_service.predict_cluster(values)
        insight = insight_service.get_insight(cluster)
        results.append(format_response(internship["name"], cluster, insight))

    feature_names = ["stipend", "workload", "company reputation", "time flexibility"]
    for i in range(len(results)):
        for j in range(i + 1, len(results)):
            if results[i]["cluster_id"] == results[j]["cluster_id"]:
                # Find the feature with the largest difference
                diffs = [abs(raw_values[i][k] - raw_values[j][k]) for k in range(4)]
                max_diff = max(diffs)
                max_diff_index = diffs.index(max_diff)
                feature = feature_names[max_diff_index]
                val_i = raw_values[i][max_diff_index]
                val_j = raw_values[j][max_diff_index]
                if max_diff == 0:
                    msg_i = "These two internships have identical ratings across all dimensions."
                    msg_j = msg_i
                elif val_i > val_j:
                    msg_i = f"Compared to {results[j]['internship_name']}, this one rated higher on {feature} ({val_i} vs {val_j})."
                    msg_j = f"Compared to {results[i]['internship_name']}, this one rated lower on {feature} ({val_j} vs {val_i})."
                else:
                    msg_i = f"Compared to {results[j]['internship_name']}, this one rated lower on {feature} ({val_i} vs {val_j})."
                    msg_j = f"Compared to {results[i]['internship_name']}, this one rated higher on {feature} ({val_j} vs {val_i})."


                # Inject into both cards
                if results[i]["differentiator"] is None:
                    results[i]["differentiator"] = msg_i
                if results[j]["differentiator"] is None:
                    results[j]["differentiator"] = msg_j

    # Generate contextual comparison text
    comparison_text = None
    if len(results) > 1:
        cluster_ids = [r["cluster_id"] for r in results]
        unique_clusters = set(cluster_ids)

        if len(unique_clusters) == 1:
            # All same cluster
            comparison_text = f"All submitted internships fall into the same archetype — {results[0]['category']}. The experience pattern is structurally similar across all options. Your decision likely comes down to factors this system cannot measure: the team, the domain, or your instinct."
        elif len(unique_clusters) == len(cluster_ids):
            # All different clusters
            comparison_text = "Each internship you submitted represents a distinctly different experience archetype. There is no overlap in pattern — which means your options are genuinely varied. The comparison across cards should surface which trade-off set feels most aligned with where you are right now."
        else:
            # Some overlap, some different
            from collections import Counter
            counts = Counter(cluster_ids)
            duplicate_label = None
            for cid, count in counts.items():
                if count > 1:
                    duplicate_label = next(r["category"] for r in results if r["cluster_id"] == cid)
                    break
            comparison_text = f"Some of your internships share the same archetype ({duplicate_label}), while others differ. Where archetypes overlap, look at the differentiator callouts on each card for what sets them apart. Where they differ, the contrast between cards is itself the insight."

    return jsonify({"results": results, "comparison_text": comparison_text})

if __name__ == "__main__":
    app.run(debug=True)
