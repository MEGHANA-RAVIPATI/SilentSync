import cv2
import time
import random
import joblib
import pandas as pd

from pathlib import Path
from collections import Counter

import sys
sys.path.append(str(Path(__file__).parent / "training"))

from handlandmarker import HandLandmarker


# ============================================================
# WORDS
# ============================================================

WORDS = [
    "LOVE",
    "BAD",
    "HAPPY",
    "SAD",
    "HOME",
    "SCHOOL",
    "PLAY",
    "WORK",
    "BOOK",
    "FOOD",
    "CAKE",
    "BABY",
    "HOUSE",
    "PARK",
    "RAIN",
    "SUN",
    "FISH",
    "BIRD",
    "FLOWER",
    "CLOUD",
    "APPLE",
    "RED",
    "BLUE",
    "PINK",
    "LOVE",
    "CARE",
    "HELP",
    "PEACE"
]

FORBIDDEN_LETTERS = set("MTJZG")

WORDS = [
    word for word in WORDS
    if not any(letter in FORBIDDEN_LETTERS for letter in word)
]


# ============================================================
# GAME SETTINGS
# ============================================================

FRAMES_REQUIRED = 10

# Minimum confidence needed
CONFIDENCE_THRESHOLD = 0.30

# Correct prediction must appear in at least 60% of frames
STABILITY_THRESHOLD = 0.60


# ============================================================
# NORMALIZE LANDMARKS
# ============================================================

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


# ============================================================
# LOAD MODEL
# ============================================================

BASE_DIR = Path(__file__).parent

MODEL_PATH = (
    BASE_DIR
    / "models"
    / "gesture_model.pkl"
)

if not MODEL_PATH.exists():

    print("❌ Gesture model not found!")
    print(f"Expected: {MODEL_PATH}")
    exit()


model = joblib.load(MODEL_PATH)

print("✅ Gesture model loaded")


# ============================================================
# MEDIAPIPE
# ============================================================

detector = HandLandmarker()

print("✅ MediaPipe loaded")


# ============================================================
# CAMERA
# ============================================================

cap = cv2.VideoCapture(0)

if not cap.isOpened():

    print("❌ Camera could not open")
    detector.close()
    exit()


print("✅ Camera started")


# ============================================================
# GAME VARIABLES
# ============================================================

word = random.choice(WORDS)

letter_index = 0

score = 0

lives = 3

history = []

message = "Show the target letter!"

message_timer = time.time()

start_time = time.time()


print()
print("======================================")
print("          SILENTSYNC GAME")
print("======================================")
print(f"WORD: {word}")
print("Press S to skip word")
print("Press Q to quit")
print("======================================")


# ============================================================
# MAIN LOOP
# ============================================================

while True:

    success, frame = cap.read()

    if not success:

        print("❌ Could not read frame")
        break


    # Mirror camera
    frame = cv2.flip(frame, 1)


    # Timestamp
    timestamp_ms = int(
        (time.time() - start_time) * 1000
    )


    # ========================================================
    # DETECT HAND
    # ========================================================

    result = detector.detect(
        frame,
        timestamp_ms
    )


    prediction = "NO HAND"

    confidence = 0.0


    # ========================================================
    # HAND FOUND
    # ========================================================

    if result.hand_landmarks:

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


        # Normalize
        features = normalize_landmarks(hand)


        # Model input
        features_df = pd.DataFrame(
            [features],
            columns=model.feature_names_in_
        )


        # Prediction
        prediction = model.predict(
            features_df
        )[0]


        # Confidence
        probabilities = model.predict_proba(
            features_df
        )[0]

        confidence = max(probabilities)


        # Add prediction to history
        history.append(prediction)


        if len(history) > FRAMES_REQUIRED:

            history.pop(0)


    else:

        history.clear()


    # ========================================================
    # CURRENT TARGET
    # ========================================================

    if letter_index < len(word):

        target = word[letter_index]

    else:

        target = ""


    # ========================================================
    # CHECK ANSWER
    # ========================================================

    if (
        len(history) >= FRAMES_REQUIRED
        and letter_index < len(word)
    ):

        common = Counter(history).most_common(1)[0]

        stable_prediction = common[0]

        stability = (
            common[1] / len(history)
        )


        # Correct letter
        if (
            stable_prediction.upper() == target
            and confidence >= CONFIDENCE_THRESHOLD
            and stability >= STABILITY_THRESHOLD
        ):

            print(
                f"✅ Correct: {target} "
                f"({confidence * 100:.1f}%)"
            )


            score += 10

            letter_index += 1

            history.clear()

            message = f"✓ Correct! {target}"

            message_timer = time.time()


            # =================================================
            # WORD COMPLETE
            # =================================================

            if letter_index >= len(word):

                score += 50

                print()
                print("======================================")
                print("🎉 WORD COMPLETE!")
                print(f"WORD: {word}")
                print(f"SCORE: {score}")
                print("======================================")


                message = "🎉 WORD COMPLETE!"

                cv2.putText(
                    frame,
                    "WORD COMPLETE!",
                    (120, 300),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1.3,
                    (0, 255, 0),
                    3
                )


                cv2.putText(
                    frame,
                    f"Score: {score}",
                    (250, 350),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.9,
                    (255, 255, 255),
                    2
                )


                cv2.imshow(
                    "SilentSync - Game",
                    frame
                )

                cv2.waitKey(1500)


                # New word
                word = random.choice(WORDS)

                letter_index = 0

                history.clear()

                message = "New word!"

                message_timer = time.time()


    # ========================================================
    # UI
    # ========================================================

    cv2.putText(
        frame,
        "SILENTSYNC",
        (20, 40),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (255, 255, 255),
        2
    )


    cv2.putText(
        frame,
        f"WORD: {word}",
        (20, 80),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.9,
        (255, 255, 255),
        2
    )


    if letter_index < len(word):

        cv2.putText(
            frame,
            f"SHOW: {word[letter_index]}",
            (20, 130),
            cv2.FONT_HERSHEY_SIMPLEX,
            1.3,
            (0, 255, 0),
            3
        )


    cv2.putText(
        frame,
        f"Prediction: {prediction}",
        (20, 175),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.8,
        (255, 255, 255),
        2
    )


    cv2.putText(
        frame,
        f"Confidence: {confidence * 100:.1f}%",
        (20, 210),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.7,
        (255, 255, 255),
        2
    )


    cv2.putText(
        frame,
        f"Score: {score}",
        (20, 250),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.8,
        (255, 255, 255),
        2
    )


    cv2.putText(
        frame,
        f"Lives: {lives}",
        (20, 290),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.8,
        (255, 255, 255),
        2
    )


    cv2.putText(
        frame,
        f"Progress: {letter_index}/{len(word)}",
        (20, 330),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.7,
        (255, 255, 255),
        2
    )


    # Instructions
    cv2.putText(
        frame,
        "S = Skip Word     Q = Quit",
        (20, frame.shape[0] - 20),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.65,
        (255, 255, 255),
        2
    )


    # Feedback
    if time.time() - message_timer < 2:

        cv2.putText(
            frame,
            message,
            (20, 380),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0, 255, 255),
            2
        )


    # ========================================================
    # DISPLAY
    # ========================================================

    cv2.imshow(
        "SilentSync - Game",
        frame
    )


    # ========================================================
    # KEYBOARD
    # ========================================================

    key = cv2.waitKey(1) & 0xFF


    # Quit
    if key == ord("q"):

        break


    # Skip word
    if key == ord("s"):

        print(
            f"⏭️ Skipping word: {word}"
        )


        word = random.choice(WORDS)

        letter_index = 0

        history.clear()

        message = "⏭ Word skipped!"

        message_timer = time.time()


# ============================================================
# CLEANUP
# ============================================================

cap.release()

cv2.destroyAllWindows()

detector.close()

print("Game closed.")