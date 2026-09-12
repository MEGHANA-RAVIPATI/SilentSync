import cv2
import time
import joblib
import pandas as pd

from pathlib import Path
from handlandmarker import HandLandmarker


def normalize_landmarks(hand):
    """Normalize landmarks relative to the wrist."""

    wrist = hand[0]

    normalized = []

    for landmark in hand:
        normalized.extend([
            landmark.x - wrist.x,
            landmark.y - wrist.y,
            landmark.z - wrist.z
        ])

    return normalized


def main():

    # Load trained model
    model_path = (
        Path(__file__).parent.parent
        / "models"
        / "gesture_model.pkl"
    )

    if not model_path.exists():
        print("❌ Trained model not found!")
        print("Run trainmodel.py first.")
        return

    model = joblib.load(model_path)

    print("✅ Model loaded")


    # Load MediaPipe
    detector = HandLandmarker()

    print("✅ MediaPipe loaded")


    # Start camera
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("❌ Could not open camera")
        return

    print("✅ Camera started")
    print("Show ASL letters to the camera")
    print("Press Q to quit")


    start_time = time.time()


    while True:

        success, frame = cap.read()

        if not success:
            print("❌ Could not read camera frame")
            break


        # Mirror camera
        frame = cv2.flip(frame, 1)


        # Timestamp for MediaPipe
        timestamp_ms = int(
            (time.time() - start_time) * 1000
        )


        # Detect hand
        result = detector.detect(
            frame,
            timestamp_ms
        )


        prediction = "NO HAND"
        confidence = 0.0


        if result.hand_landmarks:

            # Use first detected hand
            hand = result.hand_landmarks[0]

            h, w, _ = frame.shape


            # Draw landmarks
            for landmark in hand:

                x = int(landmark.x * w)
                y = int(landmark.y * h)

                cv2.circle(
                    frame,
                    (x, y),
                    5,
                    (0, 255, 0),
                    -1
                )


            # IMPORTANT:
            # Normalize exactly like training
            features = normalize_landmarks(hand)


            # Convert to DataFrame
            features_df = pd.DataFrame(
                [features],
                columns=model.feature_names_in_
            )


            # Predict letter
            prediction = model.predict(
                features_df
            )[0]


            # Get confidence
            probabilities = model.predict_proba(
                features_df
            )[0]

            confidence = max(probabilities) * 100


        # Display prediction
        cv2.putText(
            frame,
            f"Gesture: {prediction}",
            (20, 50),
            cv2.FONT_HERSHEY_SIMPLEX,
            1.2,
            (0, 255, 0),
            3
        )


        # Display confidence
        cv2.putText(
            frame,
            f"Confidence: {confidence:.1f}%",
            (20, 90),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (255, 255, 255),
            2
        )


        # Display instructions
        cv2.putText(
            frame,
            "Show ASL A-Z | Press Q to quit",
            (20, 130),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (255, 255, 255),
            2
        )


        # Show camera
        cv2.imshow(
            "SilentSync - Gesture Recognition",
            frame
        )


        # Quit
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break


    # Cleanup
    cap.release()
    cv2.destroyAllWindows()

    detector.close()

    print("Game closed.")


if __name__ == "__main__":
    main()