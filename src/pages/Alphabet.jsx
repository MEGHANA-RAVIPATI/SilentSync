import { useState } from "react";
import { Link } from "react-router-dom";

const signImages = import.meta.glob(
  "../assets/signs/*.png",
  {
    eager: true,
    import: "default",
  }
);

const levels = [
  {
    id: 1,
    title: "Getting Started",
    letters: ["A", "B", "C", "D", "E"],
  },
  {
    id: 2,
    title: "Keep Going",
    letters: ["F", "G", "H", "I", "J"],
  },
  {
    id: 3,
    title: "Build Your Skills",
    letters: ["K", "L", "M", "N", "O"],
  },
  {
    id: 4,
    title: "Almost There",
    letters: ["P", "Q", "R", "S", "T"],
  },
  {
    id: 5,
    title: "Alphabet Master",
    letters: ["U", "V", "W", "X", "Y", "Z"],
  },
];

function getSignImage(letter) {
  const file = Object.keys(signImages).find(
    (path) => {
      const name = path
        .split("/")
        .pop()
        .split(".")[0];

      return (
        name.toUpperCase() ===
        letter.toUpperCase()
      );
    }
  );

  return file ? signImages[file] : null;
}

function Alphabet() {
  const [completedLevels, setCompletedLevels] =
    useState(() => {
      return JSON.parse(
        localStorage.getItem(
          "alphabetCompletedLevels"
        ) || "[]"
      );
    });

  const [selectedLevel, setSelectedLevel] =
    useState(null);

  const [currentLetterIndex, setCurrentLetterIndex] =
    useState(0);

  const [stage, setStage] =
    useState("levels");

  const [score, setScore] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState("");

  const level = levels.find(
    (item) => item.id === selectedLevel
  );

  const currentLetter =
    level?.letters[currentLetterIndex];

  const isUnlocked = (levelId) => {
    return (
      levelId === 1 ||
      completedLevels.includes(levelId - 1)
    );
  };

  const startLevel = (levelId) => {
    if (!isUnlocked(levelId)) return;

    setSelectedLevel(levelId);
    setCurrentLetterIndex(0);
    setScore(0);
    setSelectedAnswer("");
    setStage("learn");
  };

  const completeLevel = () => {
    const wasAlreadyCompleted =
      completedLevels.includes(selectedLevel);

    const updated = [
      ...new Set([
        ...completedLevels,
        selectedLevel,
      ]),
    ];

    setCompletedLevels(updated);

    localStorage.setItem(
      "alphabetCompletedLevels",
      JSON.stringify(updated)
    );

    // Save XP only the first time a level is completed
    if (!wasAlreadyCompleted) {
      const oldXP = Number(
        localStorage.getItem(
          "silentSyncXP"
        ) || 0
      );

      localStorage.setItem(
        "silentSyncXP",
        String(oldXP + score)
      );
    }

    setStage("result");
  };

  const nextLetter = () => {
    if (
      !level ||
      currentLetterIndex >=
        level.letters.length - 1
    ) {
      completeLevel();
      return;
    }

    setCurrentLetterIndex(
      (previous) => previous + 1
    );

    setSelectedAnswer("");
    setStage("learn");
  };

  const startPractice = () => {
    setSelectedAnswer("");
    setStage("practice");
  };

  const selectAnswer = (answer) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    if (answer === currentLetter) {
      setScore(
        (previous) => previous + 10
      );

      setTimeout(() => {
        nextLetter();
      }, 1200);
    } else {
      setTimeout(() => {
        setSelectedAnswer("");
      }, 1500);
    }
  };

  const getOptions = () => {
    if (!level) return [];

    const otherLetters =
      level.letters.filter(
        (letter) =>
          letter !== currentLetter
      );

    return [
      currentLetter,
      ...otherLetters.slice(0, 2),
    ].sort(
      () => Math.random() - 0.5
    );
  };

  /* ================= RESULT ================= */

  if (stage === "result") {
    return (
      <div className="alphabet-page">

        <div className="alphabet-result">

          <div className="alphabet-trophy">
            🏆
          </div>

          <p className="section-label">
            LEVEL {selectedLevel} COMPLETE
          </p>

          <h1>
            Alphabet Mastered!
          </h1>

          <p>
            You completed all the letters
            in this level.
          </p>

          <div className="alphabet-score">
            ⭐ {score} Points
          </div>

          <button
            className="alphabet-primary-button"
            onClick={() => {
              setStage("levels");
              setSelectedLevel(null);
            }}
          >
            Continue →
          </button>

        </div>

      </div>
    );
  }

  /* ================= LEARN ================= */

  if (stage === "learn" && level) {
    return (
      <div className="alphabet-page">

        <header className="alphabet-topbar">

          <button
            className="alphabet-back"
            onClick={() => {
              setStage("levels");
              setSelectedLevel(null);
            }}
          >
            ← Levels
          </button>

          <div>
            <span>
              LEVEL {level.id}
            </span>

            <h1>
              {level.title}
            </h1>
          </div>

          <div>
            {currentLetterIndex + 1} /{" "}
            {level.letters.length}
          </div>

        </header>

        <main className="alphabet-learning">

          <p className="section-label">
            LEARN THIS SIGN
          </p>

          <h2>
            Letter {currentLetter}
          </h2>

          <div className="alphabet-sign-card">

            {getSignImage(currentLetter) ? (
              <img
                src={getSignImage(
                  currentLetter
                )}
                alt={`ASL sign for ${currentLetter}`}
              />
            ) : (
              <div className="alphabet-no-image">
                {currentLetter}
              </div>
            )}

          </div>

          <p className="alphabet-hint">
            Study the ASL sign carefully.
          </p>

          <button
            className="alphabet-primary-button"
            onClick={startPractice}
          >
            I’m Ready →
          </button>

        </main>

      </div>
    );
  }

  /* ================= PRACTICE ================= */

  if (stage === "practice" && level) {
    const options = getOptions();

    return (
      <div className="alphabet-page">

        <header className="alphabet-topbar">

          <button
            className="alphabet-back"
            onClick={() =>
              setStage("learn")
            }
          >
            ← Learn
          </button>

          <div>
            <span>
              LEVEL {level.id}
            </span>

            <h1>
              Practice
            </h1>
          </div>

          <div>
            ⭐ {score}
          </div>

        </header>

        <main className="alphabet-learning">

          <p className="section-label">
            TEST YOURSELF
          </p>

          <h2>
            Which letter is this?
          </h2>

          <div className="alphabet-small-sign">

            {getSignImage(currentLetter) ? (
              <img
                src={getSignImage(
                  currentLetter
                )}
                alt={`ASL sign for ${currentLetter}`}
              />
            ) : (
              <div>
                {currentLetter}
              </div>
            )}

          </div>

          <div className="alphabet-options">

            {options.map((option) => {

              const correct =
                selectedAnswer ===
                  currentLetter &&
                option === currentLetter;

              const wrong =
                selectedAnswer === option &&
                option !== currentLetter;

              return (
                <button
                  key={option}
                  className={`alphabet-option ${
                    correct
                      ? "alphabet-correct"
                      : ""
                  } ${
                    wrong
                      ? "alphabet-wrong"
                      : ""
                  }`}
                  onClick={() =>
                    selectAnswer(option)
                  }
                >
                  {option}

                  {correct && " ✓"}
                  {wrong && " ✕"}

                </button>
              );
            })}

          </div>

          {selectedAnswer && (
            <div
              className={`alphabet-message ${
                selectedAnswer ===
                currentLetter
                  ? "correct"
                  : "wrong"
              }`}
            >
              {selectedAnswer ===
              currentLetter
                ? "🎉 Correct!"
                : "💪 Try Again!"}
            </div>
          )}

        </main>

      </div>
    );
  }

  /* ================= LEVEL MAP ================= */

  return (
    <div className="alphabet-page">

      <header className="alphabet-map-header">

        <Link
          to="/learning"
          className="alphabet-back"
        >
          ← Learning
        </Link>

        <div>

          <p className="section-label">
            ALPHABET ADVENTURE
          </p>

          <h1>
            Learn ASL Alphabet
          </h1>

          <p>
            Complete each level to unlock the next.
          </p>

        </div>

        <div className="alphabet-total">
          ⭐ {completedLevels.length} / 5
        </div>

      </header>

      <main className="alphabet-level-map">

        {levels.map((item) => {

          const unlocked =
            isUnlocked(item.id);

          const completed =
            completedLevels.includes(
              item.id
            );

          return (
            <div
              key={item.id}
              className={`alphabet-level-card ${
                completed
                  ? "completed"
                  : unlocked
                  ? "unlocked"
                  : "locked"
              }`}
            >

              <div className="alphabet-level-number">

                {completed
                  ? "★"
                  : unlocked
                  ? item.id
                  : "🔒"}

              </div>

              <div className="alphabet-level-content">

                <span>
                  LEVEL {item.id}
                </span>

                <h2>
                  {item.title}
                </h2>

                <p>
                  {item.letters.join(
                    " • "
                  )}
                </p>

                <small>
                  {item.letters.length} letters
                </small>

              </div>

              <button
                className="alphabet-level-button"
                disabled={!unlocked}
                onClick={() =>
                  startLevel(item.id)
                }
              >
                {completed
                  ? "Replay"
                  : "Start →"}
              </button>

            </div>
          );
        })}

      </main>

    </div>
  );
}

export default Alphabet;