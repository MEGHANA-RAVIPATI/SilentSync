import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import words from "../data/words";

function Progress() {
    const [, setRefresh] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      setRefresh((value) => value + 1);
    };

    window.addEventListener("storage", updateProgress);

    return () => {
      window.removeEventListener("storage", updateProgress);
    };
  }, []);
  const completedLevels = JSON.parse(
    localStorage.getItem("wordCompletedLevels") || "[]"
  );

  const alphabetCompleted = JSON.parse(
    localStorage.getItem("alphabetCompletedLevels") || "[]"
  );

  const completedWords = completedLevels.reduce(
    (total, levelNumber) => {
      return (
        total +
        words.filter(
          (item) => item.level === levelNumber
        ).length
      );
    },
    0
  );

  const totalWords = words.length;
  const totalLevels = 14;
  const alphabetLevels = 5;

  const wordProgress = Math.round(
    (completedWords / totalWords) * 100
  );

  const alphabetProgress = Math.round(
    (alphabetCompleted.length / alphabetLevels) * 100
  );

  const overallProgress = Math.round(
    ((completedLevels.length +
      alphabetCompleted.length) /
      (totalLevels + alphabetLevels)) *
      100
  );

  const currentLevel =
    completedLevels.length < totalLevels
      ? completedLevels.length + 1
      : totalLevels;

  /* REAL SAVED XP */
  const totalXP = Number(
    localStorage.getItem("silentSyncXP") || 0
  );

  return (
    <div className="progress-page">

      <header className="progress-header">
        <Link
          to="/"
          className="progress-back"
        >
          ← Home
        </Link>

        <div>
          <p className="section-label">
            YOUR JOURNEY
          </p>

          <h1>
            My Progress
          </h1>

          <p>
            Track your SilentSync learning journey.
          </p>
        </div>
      </header>

      <main className="progress-container">

        {/* MAIN PROGRESS */}

        <section className="progress-overview">

          <div className="progress-overview-content">

            <span className="progress-label">
              OVERALL PROGRESS
            </span>

            <h2>
              {overallProgress}%
            </h2>

            <p>
              Keep learning and complete your journey!
            </p>

          </div>

          <div className="progress-circle">
            <span>
              {overallProgress}%
            </span>
          </div>

        </section>


        {/* STATISTICS */}

        <section className="progress-stats">

          <div className="progress-stat-card">

            <div className="progress-stat-icon">
              ⭐
            </div>

            <span>
              Total XP
            </span>

            <strong>
              {totalXP}
            </strong>

          </div>


          <div className="progress-stat-card">

            <div className="progress-stat-icon">
              📝
            </div>

            <span>
              Words Completed
            </span>

            <strong>
              {completedWords} / {totalWords}
            </strong>

          </div>


          <div className="progress-stat-card">

            <div className="progress-stat-icon">
              🏆
            </div>

            <span>
              Levels Completed
            </span>

            <strong>
              {completedLevels.length} / {totalLevels}
            </strong>

          </div>


          <div className="progress-stat-card">

            <div className="progress-stat-icon">
              🔤
            </div>

            <span>
              Alphabet Progress
            </span>

            <strong>
              {alphabetProgress}%
            </strong>

          </div>

        </section>


        {/* LEARNING PROGRESS */}

        <section className="progress-section">

          <div className="progress-section-header">

            <div>

              <span className="section-label">
                LEARNING MODULES
              </span>

              <h2>
                Your Progress
              </h2>

            </div>

          </div>


          {/* ALPHABET */}

          <div className="progress-module">

            <div className="progress-module-icon">
              🔤
            </div>

            <div className="progress-module-content">

              <div className="progress-module-title">

                <div>

                  <h3>
                    Alphabet
                  </h3>

                  <p>
                    Learn the ASL alphabet A–Z.
                  </p>

                </div>

                <strong>
                  {alphabetProgress}%
                </strong>

              </div>

              <div className="progress-track">

                <div
                  className="progress-fill alphabet-fill"
                  style={{
                    width: `${alphabetProgress}%`,
                  }}
                />

              </div>

              <span className="progress-module-info">
                {alphabetCompleted.length} /{" "}
                {alphabetLevels} levels completed
              </span>

            </div>

          </div>


          {/* WORDS */}

          <div className="progress-module">

            <div className="progress-module-icon">
              📝
            </div>

            <div className="progress-module-content">

              <div className="progress-module-title">

                <div>

                  <h3>
                    Word Learning
                  </h3>

                  <p>
                    Build words using sequences of ASL signs.
                  </p>

                </div>

                <strong>
                  {wordProgress}%
                </strong>

              </div>

              <div className="progress-track">

                <div
                  className="progress-fill word-fill"
                  style={{
                    width: `${wordProgress}%`,
                  }}
                />

              </div>

              <span className="progress-module-info">
                {completedWords} /{" "}
                {totalWords} words completed
              </span>

            </div>

          </div>

        </section>


        {/* CURRENT LEVEL */}

        <section className="current-level-card">

          <div className="current-level-icon">
            🚀
          </div>

          <div>

            <span className="section-label">
              CURRENT LEVEL
            </span>

            <h2>
              Level {currentLevel}
            </h2>

            <p>
              {completedLevels.length < totalLevels
                ? "Continue learning and unlock the next level."
                : "You completed all levels!"}
            </p>

          </div>

          {completedLevels.length < totalLevels && (
            <Link
              to={`/words/level/${currentLevel}`}
              className="progress-action-button"
            >
              Continue Learning →
            </Link>
          )}

        </section>


        {/* ACHIEVEMENTS */}

        <section className="achievements-section">

          <div className="progress-section-header">

            <div>

              <span className="section-label">
                ACHIEVEMENTS
              </span>

              <h2>
                Your Milestones
              </h2>

            </div>

          </div>


          <div className="achievement-grid">

            <div
              className={`achievement-card ${
                completedWords >= 1
                  ? "earned"
                  : ""
              }`}
            >

              <div>
                🌱
              </div>

              <h3>
                First Word
              </h3>

              <p>
                Complete your first word.
              </p>

            </div>


            <div
              className={`achievement-card ${
                completedWords >= 10
                  ? "earned"
                  : ""
              }`}
            >

              <div>
                🔥
              </div>

              <h3>
                10 Words
              </h3>

              <p>
                Complete 10 words.
              </p>

            </div>


            <div
              className={`achievement-card ${
                completedLevels.length >= 1
                  ? "earned"
                  : ""
              }`}
            >

              <div>
                🏆
              </div>

              <h3>
                First Level
              </h3>

              <p>
                Complete your first level.
              </p>

            </div>


            <div
              className={`achievement-card ${
                completedLevels.length >= 5
                  ? "earned"
                  : ""
              }`}
            >

              <div>
                ⭐
              </div>

              <h3>
                Level Master
              </h3>

              <p>
                Complete 5 levels.
              </p>

            </div>

          </div>

        </section>

      </main>


      <footer className="progress-footer">

        <Link to="/learning">
          ← Back to Learning
        </Link>

        <span>
          Keep learning. Keep signing. 🤟
        </span>

      </footer>

    </div>
  );
}

export default Progress;