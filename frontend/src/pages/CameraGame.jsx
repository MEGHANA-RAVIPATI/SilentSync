import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BACKEND_BASE_URL = "http://127.0.0.1:8001";

function CameraGame() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraStarted, setCameraStarted] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [prediction, setPrediction] = useState("Waiting...");
  const [confidence, setConfidence] = useState(0);
  const [predictionStatus, setPredictionStatus] = useState("Camera ready");

  useEffect(() => {
    const existingScript = document.querySelector('script[data-mediapipe-hands="true"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js";
      script.async = true;
      script.dataset.mediapipeHands = "true";
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!cameraStarted || !videoRef.current || !window.Hands) return undefined;

    let cancelled = false;
    let animationFrameId = null;
    let handsInstance = null;

    const configureHands = () => {
      handsInstance = new window.Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      handsInstance.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.65,
        minTrackingConfidence: 0.65,
      });

      handsInstance.onResults((results) => {
        if (cancelled || !videoRef.current) return;

        const landmarks = results?.multiHandLandmarks?.[0];
        if (!landmarks) {
          setPrediction("No hand");
          setConfidence(0);
          setPredictionStatus("Position your hand in frame");
          return;
        }

        const payload = landmarks.map((point) => ({
          x: point.x,
          y: point.y,
          z: point.z,
        }));

        fetch(`${BACKEND_BASE_URL}/predict`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ landmarks: payload }),
        })
          .then(async (response) => {
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
              throw new Error(data.detail || "Prediction failed");
            }
            return data;
          })
          .then((data) => {
            const detected = String(data.prediction || "UNKNOWN").toUpperCase();
            const nextConfidence = Number(data.confidence || 0) * 100;
            setPrediction(detected);
            setConfidence(nextConfidence);
            setPredictionStatus(`Model confidence: ${nextConfidence.toFixed(0)}%`);
          })
          .catch((error) => {
            console.error("Prediction request error:", error);
            setPrediction("Backend unavailable");
            setConfidence(0);
            setPredictionStatus("Check the backend on port 8001");
          });
      });

      const loop = async () => {
        if (!cancelled && cameraStarted && videoRef.current) {
          try {
            await handsInstance.send({ image: videoRef.current });
          } catch (error) {
            console.error("MediaPipe frame error:", error);
          }
        }
        animationFrameId = requestAnimationFrame(loop);
      };

      animationFrameId = requestAnimationFrame(loop);
    };

    configureHands();

    return () => {
      cancelled = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (handsInstance && typeof handsInstance.close === "function") {
        handsInstance.close();
      }
    };
  }, [cameraStarted]);

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
      setPredictionStatus("Camera active");
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
    setPrediction("Waiting...");
    setConfidence(0);
    setPredictionStatus("Camera ready");
  };

  const captureGesture = async () => {
    if (!cameraStarted) return;

    const payload = {
      user_id: "demo-user",
      sign_id: 1,
      recognized_sign: prediction === "Waiting..." || prediction === "No hand" ? "UNKNOWN" : prediction,
      correct: prediction !== "Waiting..." && prediction !== "No hand" && prediction !== "Backend unavailable",
      confidence: Math.min(Math.max(Number(confidence) / 100 || 0, 0), 1),
      response_time: 1.0,
      xp_earned: prediction !== "Waiting..." && prediction !== "No hand" && prediction !== "Backend unavailable" ? 10 : 0,
    };

    setCaptured(true);

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/attempt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        console.error("Attempt save failed:", data);
      } else {
        console.log("Attempt saved:", data);
      }
    } catch (error) {
      console.error("Attempt save error:", error);
    }
  };

  return (
    <div className="camera-game-page">
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
          <Link to="/" className="camera-nav-item"><span>⌂</span>Home</Link>
          <Link to="/learning" className="camera-nav-item"><span>📚</span>Learning</Link>
          <Link to="/game" className="camera-nav-item active"><span>🎮</span>Practice Game</Link>
          <Link to="/progress" className="camera-nav-item"><span>📊</span>Progress</Link>
          <Link to="/profile" className="camera-nav-item"><span>👤</span>Profile</Link>
        </nav>

        <div className="camera-sidebar-bottom">
          <span>🤖</span>
          <div>
            <strong>AI Practice</strong>
            <small>Recognition ready</small>
          </div>
        </div>
      </aside>

      <main className="camera-main">
        <header className="camera-topbar">
          <div>
            <span className="camera-page-label">CAMERA PRACTICE</span>
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

        <section className="camera-challenge-header">
          <div>
            <span className="camera-mode-badge">● CAMERA MODE</span>
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

        <section className="camera-workspace">
          <div className="camera-panel">
            <div className="camera-panel-header">
              <div>
                <span>LIVE CAMERA</span>
                <h3>{cameraStarted ? "Camera is active" : "Camera is ready"}</h3>
              </div>

              <div className={`camera-status ${cameraStarted ? "online" : ""}`}>
                <span></span>
                {cameraStarted ? "LIVE" : "READY"}
              </div>
            </div>

            <div className="camera-view">
              {!cameraStarted && (
                <div className="camera-placeholder">
                  <div className="camera-placeholder-icon">📷</div>
                  <h3>Start your camera</h3>
                  <p>Your camera feed will appear here.</p>
                  <button className="camera-start-button" onClick={startCamera}>
                    Start Camera
                    <span>→</span>
                  </button>
                </div>
              )}

              <video ref={videoRef} autoPlay playsInline className={cameraStarted ? "camera-video active" : "camera-video"} />

              {cameraStarted && (
                <div className="camera-frame">
                  <div className="corner top-left"></div>
                  <div className="corner top-right"></div>
                  <div className="corner bottom-left"></div>
                  <div className="corner bottom-right"></div>
                  <div className="hand-guide">Position your hand here</div>
                </div>
              )}
            </div>

            <div className="camera-actions">
              {!cameraStarted ? (
                <button className="camera-primary-action" onClick={startCamera}>
                  📷 Start Camera
                </button>
              ) : (
                <>
                  <button className="camera-capture-button" onClick={captureGesture}>
                    <span>●</span>
                    Capture Sign
                  </button>

                  <button className="camera-stop-button" onClick={stopCamera}>
                    Stop Camera
                  </button>
                </>
              )}
            </div>
          </div>

          <aside className="camera-info-panel">
            <div className="current-challenge">
              <span className="info-label">CURRENT CHALLENGE</span>
              <div className="challenge-number">01</div>
              <h3>Show the requested sign</h3>
              <p>
                Follow the sign shown by the learning system and capture your hand gesture.
              </p>
            </div>

            <div className="camera-ai-card">
              <div className="ai-icon">🤖</div>
              <div>
                <span>AI SIGN RECOGNITION</span>
                <strong>Live Prediction</strong>
                <p>{predictionStatus}</p>
                <p>
                  Detected sign: <strong>{prediction}</strong>
                </p>
                <p>Confidence: {confidence.toFixed(0)}%</p>
              </div>
            </div>

            <div className="camera-tip-card">
              <span>💡 PRACTICE TIP</span>
              <p>
                Keep your hand inside the guide area and make sure your gesture is clearly visible.
              </p>
            </div>
          </aside>
        </section>

        {captured && (
          <section className="capture-success">
            <div className="capture-success-icon">✓</div>
            <div>
              <span>SIGN CAPTURED</span>
              <strong>Ready for AI recognition</strong>
            </div>
            <button onClick={() => setCaptured(false)}>Try Again</button>
          </section>
        )}

        <footer className="camera-footer">
          <Link to="/game">← Choose another game</Link>
          <Link to="/progress">View Progress →</Link>
        </footer>
      </main>
    </div>
  );
}

export default CameraGame;
