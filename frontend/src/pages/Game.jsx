import { Link, useNavigate } from "react-router-dom";

function Game() {
  const navigate = useNavigate();

  return (
    <div className="game-dashboard-page">

      {/* SIDEBAR */}
      <aside className="game-sidebar">

        <Link to="/" className="game-brand">
          <span className="game-brand-icon">🤟</span>
          <div>
            <strong>Silent<span>Sync</span></strong>
            <small>Practice Studio</small>
          </div>
        </Link>

        <nav className="game-sidebar-nav">
          <Link to="/" className="game-nav-item">
            <span>⌂</span>
            Home
          </Link>

          <Link to="/learning" className="game-nav-item">
            <span>📚</span>
            Learning
          </Link>

          <Link to="/game" className="game-nav-item active">
            <span>🎮</span>
            Practice Game
          </Link>

          <Link to="/progress" className="game-nav-item">
            <span>📊</span>
            Progress
          </Link>

          <Link to="/profile" className="game-nav-item">
            <span>👤</span>
            Profile
          </Link>
        </nav>

        <div className="game-sidebar-bottom">
          <div className="game-mini-card">
            <span>🤟</span>
            <div>
              <strong>Keep practicing</strong>
              <small>Every sign matters.</small>
            </div>
          </div>
        </div>

      </aside>


      {/* MAIN CONTENT */}
      <main className="game-dashboard-main">

        {/* TOP BAR */}
        <header className="game-dashboard-topbar">

          <div>
            <span className="game-page-label">PRACTICE STUDIO</span>
            <h1>Practice Game</h1>
          </div>

          <div className="game-top-actions">

            <div className="game-xp-display">
              <span>⭐</span>
              <div>
                <small>Total XP</small>
                <strong>
                  {Number(localStorage.getItem("silentSyncXP") || 0)} XP
                </strong>
              </div>
            </div>

            <Link to="/profile" className="game-profile-button">
              👤
            </Link>

          </div>

        </header>


        {/* HERO */}
        <section className="game-dashboard-hero">

          <div className="game-hero-content">

            <span className="game-status-badge">
              ● READY TO PRACTICE
            </span>

            <h2>
              Test your
              <span> signing skills.</span>
            </h2>

            <p>
              Choose a practice mode and challenge yourself
              with interactive ASL activities.
            </p>

            <div className="game-hero-stats">

              <div>
                <strong>4</strong>
                <span>Challenge Types</span>
              </div>

              <div>
                <strong>2</strong>
                <span>Game Modes</span>
              </div>

              <div>
                <strong>∞</strong>
                <span>Practice</span>
              </div>

            </div>

          </div>

          <div className="game-hero-visual">

            <div className="hero-glow"></div>

            <div className="game-hand-card">
              <span>🤟</span>
              <small>ASL</small>
            </div>

            <div className="floating-game-chip chip-one">
              🔤 Alphabet
            </div>

            <div className="floating-game-chip chip-two">
              🧩 Words
            </div>

          </div>

        </section>


        {/* SECTION TITLE */}
        <section className="game-section-heading">

          <div>
            <span>CHOOSE YOUR MODE</span>
            <h2>How do you want to practice?</h2>
          </div>

          <p>
            Select a mode to begin your challenge.
          </p>

        </section>


        {/* GAME MODES */}
        <section className="game-mode-grid">

          {/* CAMERA */}
          <Link
            to="/game/camera"
            className="game-mode-card camera-mode"
          >

            <div className="mode-card-top">

              <div className="mode-icon">
                📷
              </div>

              <span className="mode-number">
                MODE 01
              </span>

            </div>

            <div className="mode-card-content">

              <span className="mode-label">
                LIVE PRACTICE
              </span>

              <h3>With Camera</h3>

              <p>
                Use your camera to practice making ASL signs
                and test your signing skills.
              </p>

              <div className="mode-features">

                <span>✓ Camera practice</span>
                <span>✓ Sign recognition</span>
                <span>✓ Real-time challenge</span>

              </div>

            </div>

            <div className="mode-card-footer">
              <span>Start Camera Game</span>
              <strong>→</strong>
            </div>

          </Link>


          {/* NO CAMERA */}
          <Link
            to="/game/no-camera"
            className="game-mode-card no-camera-mode"
          >

            <div className="mode-card-top">

              <div className="mode-icon">
                🎯
              </div>

              <span className="mode-number">
                MODE 02
              </span>

            </div>

            <div className="mode-card-content">

              <span className="mode-label">
                VISUAL PRACTICE
              </span>

              <h3>Without Camera</h3>

              <p>
                Identify signs and choose the correct answers
                without using your camera.
              </p>

              <div className="mode-features">

                <span>✓ Sign identification</span>
                <span>✓ Word challenges</span>
                <span>✓ Score & XP</span>

              </div>

            </div>

            <div className="mode-card-footer">
              <span>Start Practice Game</span>
              <strong>→</strong>
            </div>

          </Link>

        </section>


        {/* CHALLENGES */}
        <section className="game-challenges-section">

          <div className="game-section-heading compact">

            <div>
              <span>AVAILABLE CHALLENGES</span>
              <h2>Choose your challenge</h2>
            </div>

          </div>


          <div className="game-challenge-grid">

            <button
              type="button"
              className="game-challenge-card"
              onClick={() => navigate("/game/no-camera")}
            >
              <div className="challenge-icon">🔤</div>

              <div>
                <span>ALPHABET</span>
                <h3>Sign → Name</h3>
                <p>Identify the alphabet sign.</p>
              </div>

              <strong>01</strong>
            </button>


            <button
              type="button"
              className="game-challenge-card"
              onClick={() => navigate("/game/no-camera")}
            >
              <div className="challenge-icon">✍️</div>

              <div>
                <span>ALPHABET</span>
                <h3>Name → Sign</h3>
                <p>Choose the correct sign.</p>
              </div>

              <strong>02</strong>
            </button>


            <button
              type="button"
              className="game-challenge-card"
              onClick={() => navigate("/game/no-camera")}
            >
              <div className="challenge-icon">🧩</div>

              <div>
                <span>WORDS</span>
                <h3>Sign → Word</h3>
                <p>Identify the complete word.</p>
              </div>

              <strong>03</strong>
            </button>


            <button
              type="button"
              className="game-challenge-card"
              onClick={() => navigate("/game/no-camera")}
            >
              <div className="challenge-icon">💡</div>

              <div>
                <span>WORDS</span>
                <h3>Word → Sign</h3>
                <p>Select the correct sign sequence.</p>
              </div>

              <strong>04</strong>
            </button>

          </div>

        </section>


        {/* HOW IT WORKS */}
        <section className="game-how-section">

          <div className="game-how-header">

            <div>
              <span>QUICK GUIDE</span>
              <h2>How the game works</h2>
            </div>

            <div className="game-trophy">
              🏆
            </div>

          </div>


          <div className="game-how-grid">

            <div className="game-how-step">
              <span>01</span>
              <div>
                <strong>Choose a mode</strong>
                <p>Camera or visual practice.</p>
              </div>
            </div>

            <div className="game-how-step">
              <span>02</span>
              <div>
                <strong>Select a challenge</strong>
                <p>Alphabet or word challenge.</p>
              </div>
            </div>

            <div className="game-how-step">
              <span>03</span>
              <div>
                <strong>Answer questions</strong>
                <p>Identify signs correctly.</p>
              </div>
            </div>

            <div className="game-how-step">
              <span>04</span>
              <div>
                <strong>Earn XP</strong>
                <p>Improve your learning progress.</p>
              </div>
            </div>

          </div>

        </section>


        {/* FOOTER */}
        <footer className="game-dashboard-footer">

          <Link to="/learning">
            ← Back to Learning
          </Link>

          <span>
            SilentSync Practice Studio · Keep learning. Keep signing. 🤟
          </span>

        </footer>

      </main>

    </div>
  );
}

export default Game;