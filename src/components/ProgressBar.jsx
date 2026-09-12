function ProgressBar({
  value = 0,
  max = 100,
  label = "Progress",
  showPercentage = true,
}) {
  const percentage = Math.min(
    100,
    Math.max(0, (value / max) * 100)
  );

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-header">
        <span>{label}</span>

        {showPercentage && (
          <span>{Math.round(percentage)}%</span>
        )}
      </div>

      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;