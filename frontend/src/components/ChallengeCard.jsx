import { Link } from "react-router-dom";

function ChallengeCard({
  icon,
  title,
  description,
  type,
  path,
}) {
  return (
    <div className="challenge-card">
      <div className="challenge-icon">
        {icon}
      </div>

      <div className="challenge-content">
        <span className="challenge-type">
          {type}
        </span>

        <h3>{title}</h3>

        <p>{description}</p>

        <Link to={path} className="challenge-button">
          Start Challenge →
        </Link>
      </div>
    </div>
  );
}

export default ChallengeCard;