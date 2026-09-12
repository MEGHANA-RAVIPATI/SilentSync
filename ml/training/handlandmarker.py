import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from pathlib import Path


class HandLandmarker:
    def __init__(self):
        model_path = Path(__file__).parent / "hand_landmarker.task"

        base_options = python.BaseOptions(
            model_asset_path=str(model_path)
        )

        options = vision.HandLandmarkerOptions(
            base_options=base_options,
            running_mode=vision.RunningMode.VIDEO,
            num_hands=2,
            min_hand_detection_confidence=0.5,
            min_hand_presence_confidence=0.5,
            min_tracking_confidence=0.5
        )

        self.landmarker = vision.HandLandmarker.create_from_options(
            options
        )

    def detect(self, frame, timestamp_ms):
        """
        Detect hands in an OpenCV frame.

        Returns:
            MediaPipe hand landmark results.
        """

        # OpenCV uses BGR, MediaPipe expects RGB
        rgb_frame = frame[:, :, ::-1]

        mp_image = mp.Image(
            image_format=mp.ImageFormat.SRGB,
            data=rgb_frame
        )

        result = self.landmarker.detect_for_video(
            mp_image,
            timestamp_ms
        )

        return result

    def close(self):
        self.landmarker.close()