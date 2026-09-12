import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import words from "../data/words";

const signImages = import.meta.glob(
  "../assets/signs/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const allImages = import.meta.glob(
  "../assets/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

function fileName(path) {
  return path.split("/").pop().split(".")[0].toLowerCase();
}

function getSignImage(letter) {
  const image = Object.entries(signImages).find(
    ([path]) =>
      fileName(path) === letter.toLowerCase()
  );

  return image ? image[1] : null;
}

function getWordImage(word) {
  const cleanWord = word
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const image = Object.entries(allImages).find(
    ([path]) => {
      const name = fileName(path).replace(
        /[^a-z0-9]/g,
        ""
      );

      return (
        name === cleanWord &&
        path.toLowerCase().includes("/words/")
      );
    }
  );

  return image ? image[1] : null;
}

function shuffle(array) {
  return [...array].sort(
    () => Math.random() - 0.5
  );
}

function WordLevel() {
  const { levelId } = useParams();
  const navigate = useNavigate();

  const levelNumber = Number(levelId);

  const levelWords = useMemo(
    () =>
      words.filter(
        (item) => item.level === levelNumber
      ),
    [levelNumber]
  );

  const category =
    levelWords[0]?.category ||
    "Everyday & Common Words";

  const [wordIndex, setWordIndex] = useState(0);

  const [challengeType, setChallengeType] =
    useState("sign-word");

  const [stage, setStage] = useState("learn");

  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);

  const [showXp, setShowXp] = useState(false);

  const [levelComplete, setLevelComplete] =
    useState(false);

  const currentWord = levelWords[wordIndex];

  const word =
    currentWord?.word ||
    currentWord?.name ||
    "";

  const letters = word
    .toUpperCase()
    .split("");

  const wordImage = getWordImage(word);

  /*
   * WORD OPTIONS
   */
  const wordOptions = useMemo(() => {
    if (!word) return [];

    const otherWords = words
      .map((item) => item.word || item.name)
      .filter(Boolean)
      .filter(
        (item) =>
          item.toLowerCase() !==
          word.toLowerCase()
      );

    return shuffle([
      word,
      ...shuffle(otherWords).slice(0, 3),
    ]);
  }, [word, wordIndex]);

  /*
   * WORD → SIGN OPTIONS
   */
  const signOptions = useMemo(() => {
    if (!word) return [];

    const otherWords = words
      .map((item) => item.word || item.name)
      .filter(Boolean)
      .filter(
        (item) =>
          item.toLowerCase() !==
          word.toLowerCase()
      );

    return shuffle([
      word,
      ...shuffle(otherWords).slice(0, 3),
    ]);
  }, [word, wordIndex]);

  if (!currentWord) {
    return (
      <div className="word-page">
        <div className="word-empty">
          <h2>Level not found</h2>

          <Link to="/words">
            ← Back to Levels
          </Link>
        </div>
      </div>
    );
  }

  /*
   * START PRACTICE
   */
  function startPractice() {
    setStage("practice");
    setSelectedAnswer(null);
  }

  /*
   * SELECT ANSWER
   */
  function handleAnswer(answer) {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    const isCorrect =
      answer.toLowerCase() ===
      word.toLowerCase();

    if (isCorrect) {
      setScore(
        (previous) => previous + 10
      );

      setXp(
        (previous) => previous + 10
      );

      setShowXp(true);

      setTimeout(() => {
        setShowXp(false);
      }, 1300);
    }
  }

  /*
   * CHANGE CHALLENGE
   */
  function changeChallenge(type) {
    setChallengeType(type);
    setStage("practice");
    setSelectedAnswer(null);
  }

  /*
   * NEXT WORD
   */
  function nextWord() {
    if (
      wordIndex ===
      levelWords.length - 1
    ) {
      finishLevel();
      return;
    }

    setWordIndex(
      (previous) => previous + 1
    );

    setStage("learn");
    setSelectedAnswer(null);
  }

  /*
   * COMPLETE LEVEL
   */
  function finishLevel() {
    const completedLevels = JSON.parse(
      localStorage.getItem(
        "wordCompletedLevels"
      ) || "[]"
    );

    if (
      !completedLevels.includes(levelNumber)
    ) {
      const updatedLevels = [
        ...completedLevels,
        levelNumber,
      ];

      localStorage.setItem(
        "wordCompletedLevels",
        JSON.stringify(updatedLevels)
      );
    }

    const previousXP = Number(
      localStorage.getItem(
        "silentSyncXP"
      ) || 0
    );

    const alreadyCompleted =
      completedLevels.includes(
        levelNumber
      );

    if (!alreadyCompleted) {
      localStorage.setItem(
        "silentSyncXP",
        String(previousXP + xp)
      );
    }

    setLevelComplete(true);
  }

  /*
   * RESTART LEVEL
   */
  function restartLevel() {
    setWordIndex(0);
    setStage("learn");
    setChallengeType("sign-word");
    setSelectedAnswer(null);
    setScore(0);
    setXp(0);
    setShowXp(false);
    setLevelComplete(false);
  }

  /*
   * LEVEL COMPLETE SCREEN
   */
  if (levelComplete) {
    return (
      <div className="word-page word-result-page">

        <div className="word-result-card">

          <div className="result-celebration">
            <span>✨</span>
            <span>🎉</span>
            <span>✨</span>
            <span>🎊</span>
            <span>✨</span>
          </div>

          <div className="word-trophy">
            🏆
          </div>

          <p className="word-stage-label">
            LEVEL {levelNumber} COMPLETE
          </p>

          <h1>
            Level {levelNumber} Complete!
          </h1>

          <p className="word-result-category">
            Great job! You've finished all{" "}
            {levelWords.length} words.
          </p>

          <div className="result-score">

            <div>
              <span>Score</span>
              <strong>{score}</strong>
            </div>

            <div>
              <span>XP Earned</span>
              <strong>
                +{xp}
              </strong>
            </div>

            <div>
              <span>Words</span>
              <strong>
                {levelWords.length} /{" "}
                {levelWords.length}
              </strong>
            </div>

          </div>

          {levelNumber < 14 ? (
            <div className="level-unlocked">

              <span>🔓</span>

              <div>
                <strong>
                  Level {levelNumber + 1} Unlocked!
                </strong>

                <small>
                  Keep going and learn more words.
                </small>
              </div>

            </div>
          ) : (
            <div className="level-unlocked">

              <span>👑</span>

              <div>
                <strong>
                  All Levels Complete!
                </strong>

                <small>
                  You mastered SilentSync.
                </small>
              </div>

            </div>
          )}

          <div className="word-result-buttons">

            {levelNumber < 14 && (
              <button
                className="practice-button"
                onClick={() =>
                  navigate(
                    `/words/level/${levelNumber + 1}`
                  )
                }
              >
                Continue to Level{" "}
                {levelNumber + 1} →
              </button>
            )}

            <button
              className="practice-button secondary"
              onClick={restartLevel}
            >
              Play Again
            </button>

            <button
              className="practice-button secondary"
              onClick={() =>
                navigate("/words")
              }
            >
              Back to Levels
            </button>

          </div>

        </div>

      </div>
    );
  }

  const isCorrect =
    selectedAnswer &&
    selectedAnswer.toLowerCase() ===
      word.toLowerCase();

  return (
    <div className="word-page">

      {/* TOP BAR */}

      <header className="word-topbar">

        <Link
          to="/words"
          className="word-back"
        >
          ← Back
        </Link>

        <div className="word-title">

          <span>
            WORD LEVEL
          </span>

          <h1>
            Level {levelNumber}
          </h1>

        </div>

        <div className="word-count">
          ⭐ {wordIndex + 1} /{" "}
          {levelWords.length}
        </div>

      </header>

      {/* PROGRESS */}

      <section className="word-progress-container">

        <div className="word-progress-text">

          <span>
            Level {levelNumber} •{" "}
            {category}
          </span>

          <strong>
            {wordIndex + 1} /{" "}
            {levelWords.length}
          </strong>

        </div>

        <div className="word-progress-bar">

          <div
            className="word-progress-fill"
            style={{
              width: `${
                ((wordIndex + 1) /
                  levelWords.length) *
                100
              }%`,
            }}
          />

        </div>

      </section>

      {/* CHALLENGE SWITCH */}

      {stage === "practice" && (
        <div className="challenge-switch">

          <button
            className={
              challengeType === "sign-word"
                ? "active"
                : ""
            }
            onClick={() =>
              changeChallenge(
                "sign-word"
              )
            }
          >
            Sign → Word
          </button>

          <button
            className={
              challengeType === "word-sign"
                ? "active"
                : ""
            }
            onClick={() =>
              changeChallenge(
                "word-sign"
              )
            }
          >
            Word → Sign
          </button>

        </div>
      )}

      {/* ========================= */}
      {/* LEARNING SCREEN */}
      {/* ========================= */}

      {stage === "learn" && (

        <main className="word-learning-container">

          <div className="word-stage-label">
            LEVEL {levelNumber} •{" "}
            {category}
          </div>

          <h2 className="learning-word">
            {word.toUpperCase()}
          </h2>

          <p className="learning-description">
            Learn how this word is formed using
            <strong>
              {" "}ASL alphabet signs.
            </strong>
          </p>

          <div className="word-sign-sequence">

            {letters.map(
              (letter, index) => {

                const image =
                  getSignImage(letter);

                return (
                  <div
                    className="word-sign-card sign-blink"
                    key={`${letter}-${index}`}
                  >

                    <div className="sign-image-container">

                      {image ? (
                        <img
                          src={image}
                          alt={`ASL sign for ${letter}`}
                        />
                      ) : (
                        <div className="sign-placeholder">
                          🤟
                        </div>
                      )}

                    </div>

                  </div>
                );
              }
            )}

          </div>

          <div className="sequence-text">

            {letters.map(
              (letter, index) => (
                <span key={index}>
                  {letter}

                  {index <
                    letters.length - 1 && (
                    <b> → </b>
                  )}
                </span>
              )
            )}

          </div>

          <button
            className="practice-button"
            onClick={startPractice}
          >
            I'm Ready — Start Practice →
          </button>

        </main>
      )}

      {/* ========================= */}
      {/* PRACTICE SCREEN */}
      {/* ========================= */}

      {stage === "practice" && (

        <main className="word-learning-container">

          {/* SIGN → WORD */}

          {challengeType === "sign-word" && (
            <>
              <div className="challenge-label">
                Challenge 1 • Sign → Word
              </div>

              <h2 className="learning-word">
                What word do these signs spell?
              </h2>

              <p className="learning-description">
                Look carefully at the ASL signs
                and choose the correct word.
              </p>

              <div className="visual-options sign-question">

                {letters.map(
                  (letter, index) => {

                    const image =
                      getSignImage(letter);

                    return (
                      <div
                        className="sign-choice sign-blink"
                        key={`${letter}-${index}`}
                      >

                        <div className="sign-image-container">

                          {image ? (
                            <img
                              src={image}
                              alt={`ASL sign for ${letter}`}
                            />
                          ) : (
                            <div className="sign-placeholder">
                              🤟
                            </div>
                          )}

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

              <div className="answer-options">

                {wordOptions.map(
                  (option) => {

                    const correct =
                      option.toLowerCase() ===
                      word.toLowerCase();

                    let className =
                      "answer-option";

                    if (selectedAnswer) {

                      if (correct) {
                        className +=
                          " correct-option";
                      }

                      if (
                        option ===
                          selectedAnswer &&
                        !correct
                      ) {
                        className +=
                          " wrong-option";
                      }
                    }

                    return (
                      <button
                        key={option}
                        className={className}
                        disabled={
                          Boolean(
                            selectedAnswer
                          )
                        }
                        onClick={() =>
                          handleAnswer(
                            option
                          )
                        }
                      >
                        {option}
                      </button>
                    );
                  }
                )}

              </div>
            </>
          )}

          {/* WORD → SIGN */}

          {challengeType === "word-sign" && (
            <>
              <div className="challenge-label">
                Challenge 2 • Word → Sign
              </div>

              <h2 className="learning-word">
                {word.toUpperCase()}
              </h2>

              <p className="learning-description">
                Which ASL sign sequence represents
                this word?
              </p>

              <div className="sign-sequence-options">

                {signOptions.map(
                  (option, optionIndex) => {

                    const optionLetters =
                      option
                        .toUpperCase()
                        .split("");

                    const correct =
                      option.toLowerCase() ===
                      word.toLowerCase();

                    const selected =
                      selectedAnswer ===
                      option;

                    let className =
                      "sequence-option";

                    if (selected) {
                      className +=
                        " selected";
                    }

                    if (
                      selectedAnswer &&
                      correct
                    ) {
                      className +=
                        " correct-option";
                    }

                    if (
                      selectedAnswer ===
                        option &&
                      !correct
                    ) {
                      className +=
                        " wrong-option";
                    }

                    return (
                      <button
                        key={`${option}-${optionIndex}`}
                        className={className}
                        disabled={
                          Boolean(
                            selectedAnswer
                          )
                        }
                        onClick={() =>
                          handleAnswer(
                            option
                          )
                        }
                      >

                        <div className="sequence-choice">

                          {optionLetters.map(
                            (
                              letter,
                              letterIndex
                            ) => {

                              const image =
                                getSignImage(
                                  letter
                                );

                              return (
                                <div
                                  className="mini-sign sign-blink"
                                  key={`${letter}-${letterIndex}`}
                                >

                                  {image ? (
                                    <img
                                      src={image}
                                      alt={`ASL sign for ${letter}`}
                                    />
                                  ) : (
                                    <span>
                                      🤟
                                    </span>
                                  )}

                                </div>
                              );
                            }
                          )}

                        </div>

                        <span className="choice-radio">
                          {selected
                            ? "●"
                            : "○"}
                        </span>

                      </button>
                    );
                  }
                )}

              </div>
            </>
          )}

          {/* WRONG */}

          {selectedAnswer &&
            !isCorrect && (

            <div className="answer-message wrong">

              <strong>
                Try again!
              </strong>

              <span>
                Look carefully at the ASL signs.
              </span>

              <button
                className="practice-button retry-button"
                onClick={() =>
                  setSelectedAnswer(null)
                }
              >
                Try Again
              </button>

            </div>
          )}

          {/* CORRECT */}

          {isCorrect && (

            <div className="correct-reveal">

              <div className="correct-heading">

                <span>✓</span>

                <strong>
                  Correct!
                </strong>

                <span>🎉</span>

              </div>

              <p>
                That's the right word!
              </p>

              <div className="magic-word">
                {word.toUpperCase()}
              </div>

              {wordImage ? (

                <div className="revealed-word-image">

                  <img
                    src={wordImage}
                    alt={word}
                  />

                </div>

              ) : (

                <div className="revealed-word-placeholder">

                  <span>🖼️</span>

                  <strong>
                    {word}
                  </strong>

                </div>

              )}

              <div className="revealed-sequence">

                {letters.map(
                  (letter, index) => {

                    const image =
                      getSignImage(letter);

                    return (
                      <div
                        className="revealed-sign sign-blink"
                        key={`${letter}-${index}`}
                      >

                        {image ? (
                          <img
                            src={image}
                            alt={`ASL sign for ${letter}`}
                          />
                        ) : (
                          <span>
                            🤟
                          </span>
                        )}

                      </div>
                    );
                  }
                )}

              </div>

              <div className="xp-earned">
                ⭐ +10 XP
              </div>

              {showXp && (
                <div className="xp-animation">
                  +10 XP ✨
                </div>
              )}

              <button
                className="practice-button next-word-button"
                onClick={nextWord}
              >
                {wordIndex ===
                levelWords.length - 1
                  ? "Complete Level 🏆"
                  : "Next Word →"}
              </button>

            </div>
          )}

        </main>
      )}

    </div>
  );
}

export default WordLevel;