import joblib
import numpy as np
import os


class PredictionService:
    def __init__(self):
        """
        Loads the trained scaler and KMeans model
        when the service is initialized.
        """

        base_path = os.path.dirname(os.path.dirname(__file__))

        scaler_path = os.path.join(base_path, "model", "scaler.pkl")
        model_path = os.path.join(base_path, "model", "kmeans_model.pkl")

        self.scaler = joblib.load(scaler_path)
        self.model = joblib.load(model_path)

    def predict_cluster(self, values):
        """
        Takes raw internship attribute values
        Scales them using trained scaler
        Returns predicted cluster ID
        """

        # Convert to numpy array
        values_array = np.array(values).reshape(1, -1)

        # Scale using trained scaler
        scaled_values = self.scaler.transform(values_array)

        # Predict cluster
        cluster = self.model.predict(scaled_values)

        return int(cluster[0])
