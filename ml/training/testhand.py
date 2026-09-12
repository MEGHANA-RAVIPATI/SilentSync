import cv2
import time
from handlandmarker import HandLandmarker


def main():
    detector = HandLandmarker()

    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("❌ Could not open camera")
        return

    print("✅ Camera started")
    print("Press Q to quit")

    start_time = time.time()

    while True:
        success, frame = cap.read()

        if not success:
            print("❌ Could not read camera frame")
            break

        # Calculate timestamp in milliseconds
        timestamp_ms = int((time.time() - start_time) * 1000)

        # Detect hands
        result = detector.detect(frame, timestamp_ms)

        # Draw detected landmarks
        if result.hand_landmarks:
            for hand in result.hand_landmarks:

                for landmark in hand:
                    h, w, _ = frame.shape

                    x = int(landmark.x * w)
                    y = int(landmark.y * h)

                    cv2.circle(
                        frame,
                        (x, y),
                        5,
                        (0, 255, 0),
                        -1
                    )

        cv2.imshow("SilentSync - Hand Detection", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()
    detector.close()


if __name__ == "__main__":
    main()