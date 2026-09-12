import { Link } from "react-router-dom";
import words from "../data/words";

const levels = Array.from(
  { length: 14 },
  (_, index) => index + 1
);

function Words() {
  const completedLevels = JSON.parse(
    localStorage.getItem("wordCompletedLevels") || "[]"
  );

  const completedWords = completedLevels.reduce(
    (total, levelNumber) => {
      const levelWords = words.filter(
        (item) => item.level === levelNumber
      );

      return total + levelWords.length;
    },
    0
  );

  return (
    <div className="words-map-page">

      {/* HEADER */}
      <header className="words-header">

        <Link
          to="/learning"
          className="words-back"
        >
          ← Learning
        </Link>

        <div className="words-header-content">

          <p className="words-label">
            WORD ADVENTURE
          </p>

          <h1>
            Build Words with Signs
          </h1>

          <p>
            Learn words step by step and
            unlock new worlds.
          </p>

        </div>

        <div className="words-total">
          ⭐ {completedLevels.length} / 14
        </div>

      </header>


      {/* OVERALL PROGRESS */}
      <section className="words-overall-progress">

        <div className="words-progress-text">
          <span>
            Your Progress
          </span>

          <span>
            {completedWords} / {words.length} words
          </span>
        </div>

        <div className="words-progress-track">

          <div
            className="words-progress-fill"
            style={{
              width: `${
                (completedWords / words.length) * 100
              }%`,
            }}
          />

        </div>

      </section>


      {/* LEVEL MAP */}
      <main className="adventure-map">

        {levels.map((levelNumber, index) => {

          const levelWords = words.filter(
            (item) =>
              item.level === levelNumber
          );

          const completed =
            completedLevels.includes(
              levelNumber
            );

          const unlocked =
            levelNumber === 1 ||
            completedLevels.includes(
              levelNumber - 1
            );

          const category =
            levelWords[0]?.category ||
            "Word Adventure";

          return (
            <div
              className={`map-level ${
                index % 2 === 0
                  ? "left"
                  : "right"
              }`}
              key={levelNumber}
            >

              {/* PATH */}
              {index < levels.length - 1 && (
                <div className="map-path" />
              )}


              {/* LEVEL CIRCLE */}
              <Link
                to={
                  unlocked
                    ? `/words/level/${levelNumber}`
                    : "#"
                }

                className={`level-circle ${
                  completed
                    ? "completed"
                    : unlocked
                    ? "unlocked"
                    : "locked"
                }`}

                onClick={(event) => {

                  if (!unlocked) {
                    event.preventDefault();
                  }

                }}
              >

                {completed ? (
                  <span>★</span>
                ) : unlocked ? (
                  <span>{levelNumber}</span>
                ) : (
                  <span>🔒</span>
                )}

              </Link>


              {/* LEVEL INFORMATION */}
              <div className="level-info">

                <span>
                  LEVEL {levelNumber}
                </span>

                <h2>
                  {category}
                </h2>

                <p>
                  {levelWords.length} words
                </p>

                <small>
                  {completed
                    ? "✓ Completed"
                    : unlocked
                    ? "Ready to play"
                    : "Complete previous level"}
                </small>

              </div>

            </div>
          );

        })}

      </main>


      {/* BOTTOM */}
      <footer className="words-footer">

        <Link
          to="/learning"
          className="words-bottom-button"
        >
          ← Back to Learning
        </Link>

        <p>
          Keep learning. Keep signing. 🤟
        </p>

      </footer>
    </div>
  );
}

export default Words;