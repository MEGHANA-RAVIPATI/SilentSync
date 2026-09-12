import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import words from "../data/words";

import A from "../assets/signs/A.png";
import B from "../assets/signs/B.png";
import C from "../assets/signs/C.png";
import D from "../assets/signs/D.png";
import E from "../assets/signs/E.png";
import F from "../assets/signs/F.png";
import G from "../assets/signs/G.png";
import H from "../assets/signs/H.png";
import I from "../assets/signs/I.png";
import J from "../assets/signs/J.png";
import K from "../assets/signs/K.png";
import L from "../assets/signs/L.png";
import M from "../assets/signs/M.png";
import N from "../assets/signs/N.png";
import O from "../assets/signs/O.png";
import P from "../assets/signs/P.png";
import Q from "../assets/signs/Q.png";
import R from "../assets/signs/R.png";
import S from "../assets/signs/S.png";
import T from "../assets/signs/T.png";
import U from "../assets/signs/U.png";
import V from "../assets/signs/V.png";
import W from "../assets/signs/W.png";
import X from "../assets/signs/X.png";
import Y from "../assets/signs/Y.png";
import Z from "../assets/signs/Z.png";

const signImages = {
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T,
  U,
  V,
  W,
  X,
  Y,
  Z,
};

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const questions = alphabet;

function getRandomOptions(correctLetter) {
  const otherLetters = alphabet.filter(
    (letter) => letter !== correctLetter
  );

  const shuffled = [...otherLetters].sort(
    () => Math.random() - 0.5
  );

  const options = [
    correctLetter,
    shuffled[0],
    shuffled[1],
    shuffled[2],
  ];

  return options.sort(() => Math.random() - 0.5);
}

function createQuestions() {
  return questions.map((letter) => ({
    letter,
    options: getRandomOptions(letter),
  }));
}

function createWordQuestions() {
  const shuffledWords = [...words].sort(
    () => Math.random() - 0.5
  );

  return shuffledWords.slice(0, 10).map((item) => {
    const otherWords = words
      .filter(
        (wordItem) => wordItem.word !== item.word
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options = [
      item.word,
      ...otherWords.map(
        (wordItem) => wordItem.word
      ),
    ].sort(() => Math.random() - 0.5);

    return {
      word: item.word,
      options,
    };
  });
}

function NoCameraGame() {
  const navigate = useNavigate();

  const [mode, setMode] = useState(null);
  const [wordMode, setWordMode] = useState(false);

  const [gameQuestions, setGameQuestions] =
    useState([]);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const [score, setScore] = useState(0);

  const [finished, setFinished] = useState(false);

  const question =
    gameQuestions[currentQuestion];


function startMode(selectedMode) {
  const isWordChallenge =
    selectedMode === "signToWord" ||
    selectedMode === "wordToSign";

  setMode(selectedMode);
  setWordMode(isWordChallenge);

  setGameQuestions(
    isWordChallenge
      ? createWordQuestions()
      : createQuestions()
  );

  setCurrentQuestion(0);
  setSelectedAnswer(null);
  setScore(0);
  setFinished(false);
}
  
    

  function handleAnswer(answer) {
    if (selectedAnswer || !question) return;

    setSelectedAnswer(answer);

    const correctAnswer = wordMode
      ? question.word
      : question.letter;

    const isCorrect =
      answer === correctAnswer;

    if (isCorrect) {
      setScore(
        (previous) => previous + 10
      );
    }

    setTimeout(() => {
      if (
        currentQuestion <
        gameQuestions.length - 1
      ) {
        setCurrentQuestion(
          (previous) => previous + 1
        );

        setSelectedAnswer(null);
      } else {
        setFinished(true);
      }
    }, 2000);
  }

  function restartGame() {
    const isWordChallenge =
      mode === "signToWord" ||
      mode === "wordToSign";

    setGameQuestions(
      isWordChallenge
        ? createWordQuestions()
        : createQuestions()
    );

    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
  }

  function backToModes() {
    setMode(null);
    setWordMode(false);
    setGameQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
  }

  /* ================= MODE SELECTION ================= */

  if (!mode) {
    return (
      <div className="no-camera-page">

        <header className="no-camera-header">

          <Link to="/game">
            ← Game
          </Link>

          <div className="no-camera-title">
            <span>NO CAMERA MODE</span>
            <h1>Practice Game</h1>
          </div>

          <div className="no-camera-score">
            ⭐ 0 XP
          </div>

        </header>

        <main className="no-camera-mode-selection">

          <p className="section-label">
            CHOOSE YOUR CHALLENGE
          </p>

          <h2>
            How do you want to practice?
          </h2>

          <p className="mode-selection-description">
            Choose a challenge type to begin
            your ASL practice.
          </p>

          <div className="no-camera-mode-grid">

            {/* 01 - ALPHABET SIGN TO NAME */}

            <button
              className="no-camera-mode-card"
              onClick={() =>
                startMode("signToName")
              }
            >

              <span className="mode-selection-number">
                01
              </span>

              <div className="mode-selection-icon">
                🖐️
              </div>

              <span className="mode-selection-label">
                ALPHABET
              </span>

              <h3>
                Sign → Name
              </h3>

              <p>
                See an ASL hand sign and
                choose the correct alphabet.
              </p>

              <strong>
                Start Challenge →
              </strong>

            </button>


            {/* 02 - ALPHABET NAME TO SIGN */}

            <button
              className="no-camera-mode-card"
              onClick={() =>
                startMode("nameToSign")
              }
            >

              <span className="mode-selection-number">
                02
              </span>

              <div className="mode-selection-icon">
                🔤
              </div>

              <span className="mode-selection-label">
                ALPHABET
              </span>

              <h3>
                Name → Sign
              </h3>

              <p>
                See an alphabet letter and
                choose the correct ASL sign.
              </p>

              <strong>
                Start Challenge →
              </strong>

            </button>


            {/* 03 - WORD SIGN TO WORD */}

            <button
              className="no-camera-mode-card"
              onClick={() =>
                startMode("signToWord")
              }
            >

              <span className="mode-selection-number">
                03
              </span>

              <div className="mode-selection-icon">
                🧩
              </div>

              <span className="mode-selection-label">
                WORDS
              </span>

              <h3>
                Sign → Word
              </h3>

              <p>
                See a sequence of ASL signs
                and choose the correct word.
              </p>

              <strong>
                Start Challenge →
              </strong>

            </button>


            {/* 04 - WORD TO SIGN */}

            <button
              className="no-camera-mode-card"
              onClick={() =>
                startMode("wordToSign")
              }
            >

              <span className="mode-selection-number">
                04
              </span>

              <div className="mode-selection-icon">
                ✍️
              </div>

              <span className="mode-selection-label">
                WORDS
              </span>

              <h3>
                Word → Sign
              </h3>

              <p>
                See a word and choose
                the correct ASL sign sequence.
              </p>

              <strong>
                Start Challenge →
              </strong>

            </button>

          </div>

        </main>

        <footer className="no-camera-footer">

          <Link to="/game">
            ← Choose another mode
          </Link>

          <span>
            Keep practicing. 🤟
          </span>

        </footer>

      </div>
    );
  }


  /* ================= RESULT ================= */

  if (finished) {
    const challengeName =
      mode === "signToName"
        ? "Sign → Name"
        : mode === "nameToSign"
        ? "Name → Sign"
        : mode === "signToWord"
        ? "Sign → Word"
        : "Word → Sign";

    return (
      <div className="no-camera-page">

        <header className="no-camera-header">

          <Link to="/game">
            ← Game
          </Link>

          <div className="no-camera-title">
            <span>NO CAMERA MODE</span>
            <h1>Practice Complete</h1>
          </div>

          <div className="no-camera-score">
            ⭐ {score} XP
          </div>

        </header>

        <main className="no-camera-result">

          <div className="result-trophy">
            🏆
          </div>

          <p className="result-label">
            CHALLENGE COMPLETE
          </p>

          <h2>
            Great Job!
          </h2>

          <p>
            You completed the{" "}
            {challengeName} challenge.
          </p>

          <div className="no-camera-result-score">

            <strong>
              {score}
            </strong>

            <span>
              XP Earned
            </span>

          </div>

          <div className="no-camera-result-info">

            <div>
              <strong>
                {gameQuestions.length}
              </strong>

              <span>
                Questions
              </span>
            </div>

            <div>
              <strong>
                {score / 10}
              </strong>

              <span>
                Correct
              </span>
            </div>

            <div>
              <strong>
                {Math.round(
                  (score /
                    (gameQuestions.length * 10)) *
                    100
                )}
                %
              </strong>

              <span>
                Accuracy
              </span>
            </div>

          </div>

          <div className="no-camera-result-buttons">

            <button
              className="primary-word-button"
              onClick={restartGame}
            >
              Play Again
            </button>

            <button
              className="secondary-word-button"
              onClick={backToModes}
            >
              Choose Challenge
            </button>

            <button
              className="secondary-word-button"
              onClick={() =>
                navigate("/game")
              }
            >
              Back to Game
            </button>

          </div>

        </main>

      </div>
    );
  }


  /* ================= QUESTION ================= */

  return (
    <div className="no-camera-page">

      <header className="no-camera-header">

        <button
          className="no-camera-back-button"
          onClick={backToModes}
        >
          ← Challenges
        </button>

        <div className="no-camera-title">

          <span>
            NO CAMERA MODE
          </span>

          <h1>
            {mode === "signToName"
              ? "Sign → Name"
              : mode === "nameToSign"
              ? "Name → Sign"
              : mode === "signToWord"
              ? "Sign → Word"
              : "Word → Sign"}
          </h1>

        </div>

        <div className="no-camera-score">
          ⭐ {score} XP
        </div>

      </header>


      {/* PROGRESS */}

      <div className="no-camera-progress">

        <div className="no-camera-progress-info">

          <span>
            Question {currentQuestion + 1} of{" "}
            {gameQuestions.length}
          </span>

          <span>
            {Math.round(
              ((currentQuestion + 1) /
                gameQuestions.length) *
                100
            )}
            %
          </span>

        </div>

        <div className="no-camera-progress-track">

          <div
            className="no-camera-progress-fill"
            style={{
              width: `${
                ((currentQuestion + 1) /
                  gameQuestions.length) *
                100
              }%`,
            }}
          />

        </div>

      </div>


      <main className="no-camera-main">

        <section className="no-camera-question">

          {/* ALPHABET SIGN → NAME */}

          {mode === "signToName" && (
            <>
              <p className="section-label">
                ALPHABET • SIGN → NAME
              </p>

              <h2>
                Which letter does this sign represent?
              </h2>

              <div className="no-camera-sign-card">

                <div className="mock-sign">

                  <img
                    src={
                      signImages[
                        question.letter
                      ]
                    }
                    alt={`ASL sign for ${question.letter}`}
                    className="main-asl-sign-image"
                  />

                </div>

              </div>

              <div className="answer-grid">

                {question.options.map(
                  (option) => {

                    let answerClass =
                      "answer-button";

                    if (
                      selectedAnswer === option
                    ) {
                      answerClass +=
                        option === question.letter
                          ? " correct"
                          : " wrong";
                    }

                    return (
                      <button
                        key={option}
                        className={answerClass}
                        onClick={() =>
                          handleAnswer(option)
                        }
                      >

                        <span className="answer-letter">
                          {option}
                        </span>

                        <span>
                          Letter {option}
                        </span>

                      </button>
                    );
                  }
                )}

              </div>
            </>
          )}


          {/* ALPHABET NAME → SIGN */}

          {mode === "nameToSign" && (
            <>
              <p className="section-label">
                ALPHABET • NAME → SIGN
              </p>

              <h2>
                Select the ASL sign for this letter
              </h2>

              <div className="name-to-sign-letter">
                {question.letter}
              </div>

              <div className="answer-grid">

                {question.options.map(
                  (option) => {

                    let answerClass =
                      "answer-button image-answer";

                    if (
                      selectedAnswer === option
                    ) {
                      answerClass +=
                        option === question.letter
                          ? " correct"
                          : " wrong";
                    }

                    return (
                      <button
                        key={option}
                        className={answerClass}
                        onClick={() =>
                          handleAnswer(option)
                        }
                      >

                        <img
                          src={
                            signImages[option]
                          }
                          alt={`ASL sign for ${option}`}
                          className="answer-asl-image"
                        />

                      </button>
                    );
                  }
                )}

              </div>
            </>
          )}

{/* WORD CHALLENGES */}

{mode === "signToWord" && (
  <>
    <p className="section-label">
      WORDS • SIGN → WORD
    </p>

    <h2>
      Which word do these signs spell?
    </h2>

    <div className="word-sign-sequence">
      {question.word.split("").map((letter, index) => (
        <div className="word-sign-item" key={`${letter}-${index}`}>
          <img
            src={signImages[letter]}
            alt={`ASL sign for ${letter}`}
            className="word-sign-image"
          />
        
        </div>
      ))}
    </div>

    <div className="answer-grid">
      {question.options.map((option) => {
        let answerClass = "answer-button";

        if (selectedAnswer === option) {
          answerClass +=
            option === question.word
              ? " correct"
              : " wrong";
        }

        return (
          <button
            key={option}
            className={answerClass}
            onClick={() => handleAnswer(option)}
          >
            <span className="answer-letter">
              {option}
            </span>
          </button>
        );
      })}
    </div>
  </>
)}

{mode === "wordToSign" && (
  <>
    <p className="section-label">
      WORDS • WORD → SIGN
    </p>

    <h2>
      Select the correct ASL sign sequence
    </h2>

    <div className="name-to-sign-letter">
      {question.word}
    </div>

    <div className="word-sign-options">
      {question.options.map((option) => {
        let answerClass = "word-sign-option";

        if (selectedAnswer === option) {
          answerClass +=
            option === question.word
              ? " correct"
              : " wrong";
        }

        return (
          <button
            key={option}
            className={answerClass}
            onClick={() => handleAnswer(option)}
          >
            <div className="word-sign-sequence small">
              {option.split("").map((letter, index) => (
                <div
                  className="word-sign-item"
                  key={`${option}-${letter}-${index}`}
                >
                  <img
                    src={signImages[letter]}
                    alt={`ASL sign for ${letter}`}
                    className="word-sign-image"
                  />
                 
                </div>
              ))}
            </div>
          </button>
        );
      })}
    </div>
  </>
)}
          


          {/* FEEDBACK */}

          {selectedAnswer && (
            <div
              className={`answer-feedback ${
                selectedAnswer ===
                (wordMode
                  ? question.word
                  : question.letter)
                  ? "success"
                  : "error"
              }`}
            >

              {selectedAnswer ===
              (wordMode
                ? question.word
                : question.letter)
                ? "✓ Correct! Great work."
                : "✗ Not quite. Try again on the next question."}

            </div>
          )}

        </section>


        <section className="game-info-strip">

          <div>
            <span>🎯</span>

            <div>
              <strong>
                +10 XP
              </strong>

              <small>
                For every correct answer
              </small>
            </div>
          </div>

          <div>
            <span>💡</span>

            <div>
              <strong>
                Take your time
              </strong>

              <small>
                Learn before answering
              </small>
            </div>
          </div>

          <div>
            <span>🏆</span>

            <div>
              <strong>
                Build your score
              </strong>

              <small>
                Improve with every challenge
              </small>
            </div>
          </div>

        </section>

      </main>


      <footer className="no-camera-footer">

        <Link to="/game">
          ← Choose another mode
        </Link>

        <span>
          Keep practicing. 🤟
        </span>

      </footer>

    </div>
  );
}

export default NoCameraGame;