import pandas as pd
import joblib

from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score


def main():

    # Dataset folder
    dataset_path = Path(__file__).parent.parent / "dataset"

    # Find all CSV files
    csv_files = list(dataset_path.glob("*.csv"))

    if not csv_files:
        print("❌ No dataset files found!")
        print("Run collecthand.py first.")
        return

    print(f"Found {len(csv_files)} gesture dataset(s).")

    # Read all CSV files
    dataframes = []

    for file in csv_files:
        print(f"Loading: {file.name}")
        dataframes.append(pd.read_csv(file))

    data = pd.concat(dataframes, ignore_index=True)

    print(f"Total samples: {len(data)}")

    # Separate labels and features
    X = data.drop("label", axis=1)
    y = data["label"]

    # Split dataset
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    print("Training model...")

    # Create Random Forest classifier
    model = RandomForestClassifier(
        n_estimators=200,
        random_state=42
    )

    # Train
    model.fit(X_train, y_train)

    # Test
    predictions = model.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)

    print(f"✅ Model accuracy: {accuracy * 100:.2f}%")

    # Create models folder
    models_path = Path(__file__).parent.parent / "models"
    models_path.mkdir(parents=True, exist_ok=True)

    # Save model
    model_file = models_path / "gesture_model.pkl"

    joblib.dump(model, model_file)

    print(f"✅ Model saved to: {model_file}")


if __name__ == "__main__":
    main()