import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* NAVBAR */}
      <nav className="home-navbar">
        <Link to="/" className="brand">
          

          <span>Silent<span>Sync</span></span>
        </Link>

        <div className="nav-links">
          <Link to="/learning">Learning</Link>
          <Link to="/game">Game</Link>
          <Link to="/progress">Progress</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/feedback">Feedback</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section">

        <div className="hero-content">

          <p className="hero-small-text">
            WELCOME TO SILENTSYNC
          </p>

          <h1>
            Learn. Practice.
            <span> Play.</span>
          </h1>

          <p className="hero-description">
            Learn American Sign Language through interactive
            lessons, visual challenges and fun games.
          </p>

          <div className="hero-buttons">
            <Link to="/learning" className="primary-button">
              Start Learning →
            </Link>

            <Link to="/game" className="secondary-button">
              🎮 Play Game
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>26</strong>
              <span>Alphabets</span>
            </div>

            <div>
              <strong>150+</strong>
              <span>Words</span>
            </div>

            <div>
              <strong>∞</strong>
              <span>Practice</span>
            </div>
          </div>

        </div>

        <div className="hero-visual">

          <div className="floating-card card-one">
            🔤
            <span>Alphabet</span>
          </div>

          <div className="sign-display">
            <div className="sign-emoji">🤟</div>
            <p>Learn through signs</p>
          </div>

          <div className="floating-card card-two">
            🎮
            <span>Challenge</span>
          </div>

        </div>

      </section>

      {/* MAIN OPTIONS */}
      <section className="home-options">

        <div className="home-card learning-card">

          <div className="card-icon">
            📚
          </div>

          <span className="card-label">
            MODULE 01
          </span>

          <h2>
            Learning Modules
          </h2>

          <p>
            Learn alphabets and words step by step
            through interactive lessons and visual
            practice activities.
          </p>

          <div className="feature-list">
            <span>✓ Alphabet A–Z</span>
            <span>✓ Word sequences</span>
            <span>✓ Progressive levels</span>
          </div>

          <Link
            to="/learning"
            className="home-button"
          >
            Start Learning →
          </Link>

        </div>

        <div className="home-card game-card">

          <div className="card-icon">
            🎮
          </div>

          <span className="card-label">
            MODULE 02
          </span>

          <h2>
            Game
          </h2>

          <p>
            Test your sign language skills with
            camera and no-camera challenges.
          </p>

          <div className="feature-list">
            <span>✓ Alphabet challenges</span>
            <span>✓ Word challenges</span>
            <span>✓ Score & progress</span>
          </div>

          <Link
            to="/game"
            className="home-button"
          >
            Play Game →
          </Link>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">

        <p className="section-label">
          HOW IT WORKS
        </p>

        <h2>
          Learn Sign Language
          <span> Your Way</span>
        </h2>

        <div className="how-grid">

          <div className="how-card">
            <div className="how-number">01</div>
            <div className="how-icon">📖</div>
            <h3>Learn</h3>
            <p>
              Learn signs visually through
              simple lessons.
            </p>
          </div>

          <div className="how-card">
            <div className="how-number">02</div>
            <div className="how-icon">🧠</div>
            <h3>Practice</h3>
            <p>
              Test yourself with interactive
              challenges.
            </p>
          </div>

          <div className="how-card">
            <div className="how-number">03</div>
            <div className="how-icon">🏆</div>
            <h3>Master</h3>
            <p>
              Complete levels and improve
              your score.
            </p>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="home-footer">

        <div className="brand">
          <span className="brand-icon">🤟</span>
          Silent<span>Sync</span>
        </div>

        <p>
          Making sign language learning
          interactive and accessible.
        </p>

        <span>
          © 2026 SilentSync
        </span>

      </footer>

    </div>
  );
}

export default Home;
