import cv2
import csv
import time
from pathlib import Path

from handlandmarker import HandLandmarker


GESTURE_NAME = "Z"
NUM_SAMPLES = 150


def normalize_landmarks(hand):

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

    detector = HandLandmarker()

    dataset_path = (
        Path(__file__).parent.parent / "dataset"
    )

    dataset_path.mkdir(
        parents=True,
        exist_ok=True
    )

    csv_path = dataset_path / f"{GESTURE_NAME}.csv"

    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("❌ Could not open camera")
        return

    print(f"Collecting: {GESTURE_NAME}")
    print("USE THE SAME HAND FOR EVERY LETTER")
    print("Recommended: RIGHT HAND")
    print("Press SPACE to start")
    print("Press Q to quit")

    collecting = False
    sample_count = 0

    start_time = time.time()

    with open(
        csv_path,
        "w",
        newline=""
    ) as file:

        writer = csv.writer(file)

        header = ["label"]

        for i in range(21):
            header.extend([
                f"x{i}",
                f"y{i}",
                f"z{i}"
            ])

        writer.writerow(header)


        while True:

            success, frame = cap.read()

            if not success:
                break

            frame = cv2.flip(frame, 1)

            timestamp_ms = int(
                (time.time() - start_time) * 1000
            )

            result = detector.detect(
                frame,
                timestamp_ms
            )


            if result.hand_landmarks:

                hand = result.hand_landmarks[0]

                h, w, _ = frame.shape

                # Draw landmarks
                for landmark in hand:

                    x = int(
                        landmark.x * w
                    )

                    y = int(
                        landmark.y * h
                    )

                    cv2.circle(
                        frame,
                        (x, y),
                        5,
                        (0, 255, 0),
                        -1
                    )


                if (
                    collecting
                    and sample_count < NUM_SAMPLES
                ):

                    features = normalize_landmarks(
                        hand
                    )

                    writer.writerow(
                        [GESTURE_NAME] + features
                    )

                    sample_count += 1


            # -------------------------
            # UI
            # -------------------------

            cv2.putText(
                frame,
                f"Letter: {GESTURE_NAME}",
                (20, 40),
                cv2.FONT_HERSHEY_SIMPLEX,
                1,
                (255, 255, 255),
                2
            )

            cv2.putText(
                frame,
                f"Samples: {sample_count}/{NUM_SAMPLES}",
                (20, 80),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.9,
                (255, 255, 255),
                2
            )

            if collecting:

                cv2.putText(
                    frame,
                    "COLLECTING...",
                    (20, 120),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1,
                    (0, 255, 0),
                    2
                )

            else:

                cv2.putText(
                    frame,
                    "PRESS SPACE",
                    (20, 120),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1,
                    (0, 255, 255),
                    2
                )


            cv2.imshow(
                "SilentSync - Data Collection",
                frame
            )

            key = cv2.waitKey(1) & 0xFF


            if key == ord(" "):

                collecting = True


            if key == ord("q"):

                break


            if sample_count >= NUM_SAMPLES:

                print(
                    f"✅ Collected "
                    f"{NUM_SAMPLES} samples "
                    f"for {GESTURE_NAME}"
                )

                break


    cap.release()
    cv2.destroyAllWindows()

    detector.close()

    print(
        f"Dataset saved to: {csv_path}"
    )


if __name__ == "__main__":
    main()