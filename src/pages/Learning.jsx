import { Link } from "react-router-dom";

function Learning() {
  return (
    <div className="learning-page">

      {/* HEADER */}
      <header className="learning-header">
        <Link to="/" className="learning-back">
          ← Home
        </Link>

        <div className="learning-title">
          <span>SILENTSYNC</span>
          <h1>Learning Modules</h1>
        </div>

        <div className="learning-progress">
          ⭐ 0%
        </div>
      </header>


      {/* INTRO */}
      <section className="learning-intro">

        <p className="section-label">
          YOUR LEARNING JOURNEY
        </p>

        <h2>
          Learn Sign Language
          <span> Step by Step</span>
        </h2>

        <p>
          Start with the alphabet, build words with signs,
          and practice your skills through interactive challenges.
        </p>

      </section>


      {/* MODULES */}
      <main className="learning-modules">

        {/* ALPHABET */}
        <div className="learning-module-card">

          <div className="module-top">
            <div className="module-icon alphabet-logo">
              🔤
            </div>

            <span className="module-number">
              MODULE 01
            </span>
          </div>

          <h3>
            Alphabet
          </h3>

          <p>
            Learn the ASL alphabet from A to Z.
            Practice individual signs and unlock
            new alphabet levels.
          </p>

          <div className="module-info">
            <span>26 Letters</span>
            <span>5 Levels</span>
          </div>

          <Link
            to="/alphabet"
            className="module-button"
          >
            Learn Alphabet →
          </Link>

        </div>


        {/* WORDS */}
        <div className="learning-module-card">

          <div className="module-top">
            <div className="module-icon">
              📝
            </div>

            <span className="module-number">
              MODULE 02
            </span>
          </div>

          <h3>
            Words
          </h3>

          <p>
            Build complete words using sequences
            of ASL signs and discover new vocabulary
            level by level.
          </p>

          <div className="module-info">
            <span>150 Words</span>
            <span>14 Levels</span>
          </div>

          <Link
            to="/words"
            className="module-button"
          >
            Build Words →
          </Link>

        </div>


        {/* PRACTICE */}
        <div className="learning-module-card">

          <div className="module-top">
            <div className="module-icon">
              🎮
            </div>

            <span className="module-number">
              MODULE 03
            </span>
          </div>

          <h3>
            Practice Game
          </h3>

          <p>
            Test what you have learned through
            fun interactive challenges and improve
            your sign language skills.
          </p>

          <div className="module-info">
            <span>Challenges</span>
            <span>XP & Rewards</span>
          </div>

          <Link
            to="/game"
            className="module-button"
          >
            Start Practice →
          </Link>

        </div>

      </main>


      {/* LEARNING PATH */}
      <section className="learning-path">

        <p className="section-label">
          LEARNING PATH
        </p>

        <h2>
          Your Journey
        </h2>

        <div className="path-container">

          <div className="path-step active">
            <div className="path-circle">
              1
            </div>

            <div>
              <strong>
                Alphabet
              </strong>

              <span>
                Learn individual signs
              </span>
            </div>
          </div>


          <div className="path-line" />


          <div className="path-step">
            <div className="path-circle">
              2
            </div>

            <div>
              <strong>
                Words
              </strong>

              <span>
                Build words with signs
              </span>
            </div>
          </div>


          <div className="path-line" />


          <div className="path-step">
            <div className="path-circle">
              3
            </div>

            <div>
              <strong>
                Practice
              </strong>

              <span>
                Test your skills
              </span>
            </div>
          </div>


          <div className="path-line" />


          <div className="path-step">
            <div className="path-circle">
              🏆
            </div>

            <div>
              <strong>
                Master
              </strong>

              <span>
                Complete your journey
              </span>
            </div>
          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="learning-footer">

        <Link to="/">
          ← Back to SilentSync
        </Link>

        <span>
          Keep learning. Keep signing. 🤟
        </span>

      </footer>

    </div>
  );
}

export default Learning;