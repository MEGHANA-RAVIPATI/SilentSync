function FeedbackCard({
  rating,
  setRating,
  comment,
  setComment,
  onSubmit,
}) {
  return (
    <div className="feedback-card">
      <div className="feedback-header">
        <span className="feedback-label">
          YOUR FEEDBACK
        </span>

        <h2>How was your experience?</h2>

        <p>
          Your feedback helps us improve SilentSync.
        </p>
      </div>

      <div className="feedback-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={
              star <= rating
                ? "star active"
                : "star"
            }
            onClick={() => setRating(star)}
            aria-label={`Rate ${star} out of 5`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        className="feedback-textarea"
        value={comment}
        onChange={(event) =>
          setComment(event.target.value)
        }
        placeholder="Tell us what you think..."
        rows="5"
      />

      <button
        type="button"
        className="feedback-submit"
        onClick={onSubmit}
        disabled={!rating || !comment.trim()}
      >
        Submit Feedback →
      </button>
    </div>
  );
}

export default FeedbackCard;