function SignCard({
  letter,
  image,
  name,
  description = "American Sign Language",
  onClick,
}) {
  return (
    <div
      className="sign-card"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="sign-card-image">
        {image ? (
          <img src={image} alt={`ASL sign for ${letter}`} />
        ) : (
          <span className="sign-card-placeholder">🤟</span>
        )}
      </div>

      <div className="sign-card-content">
        <span className="sign-card-letter">
          {letter}
        </span>

        {name && (
          <h3>{name}</h3>
        )}

        <p>{description}</p>
      </div>
    </div>
  );
}

export default SignCard;