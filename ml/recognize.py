import joblib
import pandas as pd

from pathlib import Path


class GestureRecognizer:

    def __init__(self):

        model_path = (
            Path(__file__).parent
            / "models"
            / "gesture_model.pkl"
        )

        if not model_path.exists():
            raise FileNotFoundError(
                "gesture_model.pkl not found. "
                "Train the model first."
            )

        self.model = joblib.load(model_path)

    def predict(self, landmarks):

        features = []

        for landmark in landmarks:
            features.extend([
                landmark.x,
                landmark.y,
                landmark.z
            ])

        features_df = pd.DataFrame(
            [features],
            columns=self.model.feature_names_in_
        )

        prediction = self.model.predict(features_df)[0]

        probabilities = self.model.predict_proba(features_df)[0]

        confidence = max(probabilities)

        return prediction, confidence