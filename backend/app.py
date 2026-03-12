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


@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.json

    # Validate input
    valid, error = validate_request(data)
    if not valid:
        return jsonify({"error": error}), 400

    results = []

    for internship in data:

        values = [
            internship["stipend"],
            internship["workload"],
            internship["company_reputation"],
            internship["time_flexibility"]
        ]

        cluster = prediction_service.predict_cluster(values)
        insight = insight_service.get_insight(cluster)

        results.append(
            format_response(internship["name"], cluster, insight)
        )

    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True)
