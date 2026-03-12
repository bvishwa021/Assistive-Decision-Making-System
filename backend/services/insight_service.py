import json
import os


class InsightService:
    def __init__(self):
        """
        Loads cluster insight mappings
        """

        base_path = os.path.dirname(os.path.dirname(__file__))
        insights_path = os.path.join(base_path, "model", "cluster_insights.json")

        with open(insights_path, "r") as f:
            self.insights = json.load(f)

    def get_insight(self, cluster_id):
        """
        Returns insight information for a given cluster
        """

        cluster_id_str = str(cluster_id)

        if cluster_id_str not in self.insights:
            return {
                "label": "Unknown Cluster",
                "description": "No insight available for this cluster."
            }

        return self.insights[cluster_id_str]
