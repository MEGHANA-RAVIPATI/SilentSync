import { Link } from "react-router-dom";

function ResultCard({
  score = 0,
  total = 0,
  title = "Challenge Complete!",
  message = "Great job! Keep practicing.",
  onRetry,
}) {
  const percentage =
    total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="result-card">
      <div className="result-icon">🏆</div>

      <span className="result-label">
        COMPLETED
      </span>

      <h2>{title}</h2>

      <p>{message}</p>

      <div className="result-score">
        <strong>{score}</strong>
        <span>/ {total}</span>
      </div>

      <div className="result-percentage">
        {percentage}% Score
      </div>

      <div className="result-actions">
        {onRetry && (
          <button
            type="button"
            className="result-button secondary"
            onClick={onRetry}
          >
            ↻ Try Again
          </button>
        )}

        <Link
          to="/learning"
          className="result-button primary"
        >
          Continue Learning →
        </Link>
      </div>
    </div>
  );
}

export default ResultCard;