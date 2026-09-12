import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function CameraGame() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraStarted, setCameraStarted] = useState(false);
  const [captured, setCaptured] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraStarted(true);
    } catch (error) {
      alert("Camera permission is required to start the challenge.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setCameraStarted(false);
  };

  const captureGesture = () => {
    if (!cameraStarted) return;

    setCaptured(true);

    alert(
      "Gesture captured! ML sign recognition will be connected here."
    );
  };

  return (
    <div className="camera-game-page">

      {/* SIDEBAR */}
      <aside className="camera-sidebar">

        <Link to="/" className="camera-brand">
          <span className="camera-brand-icon">🤟</span>

          <div>
            <strong>
              Silent<span>Sync</span>
            </strong>
            <small>Practice Studio</small>
          </div>
        </Link>

        <nav className="camera-sidebar-nav">

          <Link to="/" className="camera-nav-item">
            <span>⌂</span>
            Home
          </Link>

          <Link to="/learning" className="camera-nav-item">
            <span>📚</span>
            Learning
          </Link>

          <Link to="/game" className="camera-nav-item active">
            <span>🎮</span>
            Practice Game
          </Link>

          <Link to="/progress" className="camera-nav-item">
            <span>📊</span>
            Progress
          </Link>

          <Link to="/profile" className="camera-nav-item">
            <span>👤</span>
            Profile
          </Link>

          <Link to="/feedback" className="camera-nav-item">
            <span>💬</span>
            Feedback
          </Link>

        </nav>

        <div className="camera-sidebar-bottom">
          <span>🤖</span>

          <div>
            <strong>AI Practice</strong>
            <small>Recognition ready</small>
          </div>
        </div>

      </aside>


      {/* MAIN */}
      <main className="camera-main">

        {/* TOPBAR */}
        <header className="camera-topbar">

          <div>
            <span className="camera-page-label">
              CAMERA PRACTICE
            </span>

            <h1>Camera Challenge</h1>
          </div>

          <div className="camera-xp">
            <span>⭐</span>

            <div>
              <small>Total XP</small>
              <strong>0 XP</strong>
            </div>
          </div>

        </header>


        {/* CHALLENGE HEADER */}
        <section className="camera-challenge-header">

          <div>

            <span className="camera-mode-badge">
              ● CAMERA MODE
            </span>

            <h2>
              Show the
              <span> ASL Sign</span>
            </h2>

            <p>
              Position your hand clearly inside the camera area.
              Our sign recognition system will analyze your sign.
            </p>

          </div>

          <div className="camera-progress-card">

            <span>CHALLENGE</span>

            <strong>10 / 10</strong>

            <div className="camera-progress-track">
              <div className="camera-progress-fill"></div>
            </div>

          </div>

        </section>


        {/* CAMERA WORKSPACE */}
        <section className="camera-workspace">

          {/* CAMERA PANEL */}
          <div className="camera-panel">

            <div className="camera-panel-header">

              <div>
                <span>LIVE CAMERA</span>

                <h3>
                  {cameraStarted
                    ? "Camera is active"
                    : "Camera is ready"}
                </h3>
              </div>

              <div
                className={`camera-status ${
                  cameraStarted ? "online" : ""
                }`}
              >
                <span></span>

                {cameraStarted
                  ? "LIVE"
                  : "READY"}
              </div>

            </div>


            {/* VIDEO */}
            <div className="camera-view">

              {!cameraStarted && (
                <div className="camera-placeholder">

                  <div className="camera-placeholder-icon">
                    📷
                  </div>

                  <h3>Start your camera</h3>

                  <p>
                    Your camera feed will appear here.
                  </p>

                  <button
                    className="camera-start-button"
                    onClick={startCamera}
                  >
                    Start Camera
                    <span>→</span>
                  </button>

                </div>
              )}

              <video
                ref={videoRef}
                autoPlay
                playsInline
                className={
                  cameraStarted
                    ? "camera-video active"
                    : "camera-video"
                }
              />

              {cameraStarted && (
                <div className="camera-frame">

                  <div className="corner top-left"></div>
                  <div className="corner top-right"></div>
                  <div className="corner bottom-left"></div>
                  <div className="corner bottom-right"></div>

                  <div className="hand-guide">
                    Position your hand here
                  </div>

                </div>
              )}

            </div>


            {/* CAMERA ACTIONS */}
            <div className="camera-actions">

              {!cameraStarted ? (
                <button
                  className="camera-primary-action"
                  onClick={startCamera}
                >
                  📷 Start Camera
                </button>
              ) : (
                <>
                  <button
                    className="camera-capture-button"
                    onClick={captureGesture}
                  >
                    <span>●</span>
                    Capture Sign
                  </button>

                  <button
                    className="camera-stop-button"
                    onClick={stopCamera}
                  >
                    Stop Camera
                  </button>
                </>
              )}

            </div>

          </div>


          {/* CHALLENGE INFO */}
          <aside className="camera-info-panel">

            <div className="current-challenge">

              <span className="info-label">
                CURRENT CHALLENGE
              </span>

              <div className="challenge-number">
                01
              </div>

              <h3>
                Show the requested sign
              </h3>

              <p>
                Follow the sign shown by the learning
                system and capture your hand gesture.
              </p>

            </div>


            <div className="camera-ai-card">

              <div className="ai-icon">
                🤖
              </div>

              <div>
                <span>AI SIGN RECOGNITION</span>

                <strong>
                  Integration Ready
                </strong>

                <p>
                  The ML model will analyze your
                  captured ASL gesture here.
                </p>
              </div>

            </div>


            <div className="camera-tip-card">

              <span>💡 PRACTICE TIP</span>

              <p>
                Keep your hand inside the guide area
                and make sure your gesture is clearly visible.
              </p>

            </div>

          </aside>

        </section>


        {/* CAPTURE STATUS */}
        {captured && (
          <section className="capture-success">

            <div className="capture-success-icon">
              ✓
            </div>

            <div>
              <span>SIGN CAPTURED</span>

              <strong>
                Ready for AI recognition
              </strong>
            </div>

            <button
              onClick={() => setCaptured(false)}
            >
              Try Again
            </button>

          </section>
        )}


        {/* FOOTER */}
        <footer className="camera-footer">

          <Link to="/game">
            ← Choose another game
          </Link>

          <Link to="/progress">
            View Progress →
          </Link>

        </footer>

      </main>

    </div>
  );
}

export default CameraGame;
