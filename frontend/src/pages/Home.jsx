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
            FEATURE 01
          </span>

          <h2>
            Learning
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
            Open Learning →
          </Link>

        </div>

        <div className="home-card game-card">

          <div className="card-icon">
            🎮
          </div>

          <span className="card-label">
            FEATURE 02
          </span>

          <h2>
            Game
          </h2>

          <p>
            Test your sign language skills with
            camera and no-camera challenges.
          </p>

          <div className="feature-list">
            <span>✓ Camera practice</span>
            <span>✓ Challenge modes</span>
            <span>✓ Score & XP</span>
          </div>

          <Link
            to="/game"
            className="home-button"
          >
            Open Game →
          </Link>

        </div>

        <div className="home-card progress-card">

          <div className="card-icon">
            📊
          </div>

          <span className="card-label">
            FEATURE 03
          </span>

          <h2>
            Progress
          </h2>

          <p>
            Track your learning journey,
            see milestones, and review your
            overall sign language improvement.
          </p>

          <div className="feature-list">
            <span>✓ XP tracking</span>
            <span>✓ Progress stats</span>
            <span>✓ Learning overview</span>
          </div>

          <Link
            to="/progress"
            className="home-button"
          >
            View Progress →
          </Link>

        </div>

        <div className="home-card profile-card">

          <div className="card-icon">
            👤
          </div>

          <span className="card-label">
            FEATURE 04
          </span>

          <h2>
            Profile
          </h2>

          <p>
            Manage your account, update your
            profile details, and keep your
            learning identity in one place.
          </p>

          <div className="feature-list">
            <span>✓ Profile details</span>
            <span>✓ Photo & name</span>
            <span>✓ Account settings</span>
          </div>

          <Link
            to="/profile"
            className="home-button"
          >
            Open Profile →
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
