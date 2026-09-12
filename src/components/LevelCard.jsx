import { Link } from "react-router-dom";

function LevelCard({
  level,
  title,
  description,
  completed = false,
  unlocked = true,
  path = "#",
}) {
  return (
    <div
      className={`level-card ${
        completed ? "completed" : ""
      } ${!unlocked ? "locked" : ""}`}
    >
      <div className="level-card-number">
        {completed ? "✓" : unlocked ? level : "🔒"}
      </div>

      <div className="level-card-content">
        <span className="level-card-label">
          LEVEL {level}
        </span>

        <h3>{title}</h3>

        <p>{description}</p>

        <div className="level-card-status">
          {completed
            ? "✓ Completed"
            : unlocked
            ? "Ready to play"
            : "Complete previous level"}
        </div>
      </div>

      {unlocked && (
        <Link to={path} className="level-card-button">
          {completed ? "Replay →" : "Start →"}
        </Link>
      )}
    </div>
  );
}

export default LevelCard;