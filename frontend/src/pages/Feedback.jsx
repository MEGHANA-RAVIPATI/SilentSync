import { useState } from "react";
import { Link } from "react-router-dom";

function Feedback() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [category, setCategory] = useState("General");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (!rating || !feedback.trim()) {
      return;
    }

    const existingFeedback = JSON.parse(
      localStorage.getItem("silentSyncFeedback") || "[]"
    );

    existingFeedback.push({
      rating,
      category,
      feedback: feedback.trim(),
      date: new Date().toISOString(),
    });

    localStorage.setItem(
      "silentSyncFeedback",
      JSON.stringify(existingFeedback)
    );

    setSubmitted(true);
    setFeedback("");
    setRating(0);
    setCategory("General");
  }

  return (
    <div className="feedback-page">

      {/* HEADER */}
      <header className="feedback-header">

        <Link to="/" className="feedback-back">
          ← Home
        </Link>

        <div className="feedback-title">
  <Link to="/" className="feedback-brand">
    <span className="feedback-brand-mark">S</span>
    <span className="feedback-brand-text">
      Silent<span>Sync</span>
    </span>
  </Link>

  <h1>Feedback</h1>
</div>

<div className="feedback-header-badge">
  <span>✦</span>
</div>

      </header>


      {/* INTRO */}
      <section className="feedback-hero">

        <p className="section-label">
          YOUR VOICE MATTERS
        </p>

        <h2>
          Help Us Make Silent<span>Sync Better</span>
        </h2>

        <p>
          Tell us what you think about your
          learning experience. Your feedback helps
          us improve the platform.
        </p>

      </section>


      <main className="feedback-main">

        {/* SUCCESS */}
        {submitted ? (
          <section className="feedback-success">

            <div className="feedback-success-icon">
              ✓
            </div>

            <p className="section-label">
              FEEDBACK RECEIVED
            </p>

            <h2>
              Thank You!
            </h2>

            <p>
              Your feedback has been saved
              successfully.
            </p>

            <button
              className="feedback-again-button"
              onClick={() => setSubmitted(false)}
            >
              Give More Feedback
            </button>

          </section>
        ) : (

          /* FORM */
          <form
            className="feedback-form-card"
            onSubmit={handleSubmit}
          >

            {/* RATING */}
            <div className="feedback-field">

              <label>
                How would you rate SilentSync?
              </label>

              <div className="rating-container">

                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <button
                      type="button"
                      key={star}
                      className={`rating-star ${
                        star <= rating
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setRating(star)
                      }
                      aria-label={`Rate ${star} out of 5`}
                    >
                      ★
                    </button>
                  )
                )}

              </div>

              <small>
                {rating === 0
                  ? "Select a rating"
                  : `${rating} out of 5`}
              </small>

            </div>


            {/* CATEGORY */}
            <div className="feedback-field">

              <label htmlFor="feedback-category">
                What would you like to tell us about?
              </label>

              <select
                id="feedback-category"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
              >

                <option value="General">
                  General Experience
                </option>

                <option value="Learning">
                  Learning Modules
                </option>

                <option value="Game">
                  Game & Challenges
                </option>

                <option value="UI">
                  Website Design
                </option>

                <option value="Bug">
                  Report a Problem
                </option>

                <option value="Suggestion">
                  Suggestion
                </option>

              </select>

            </div>


            {/* MESSAGE */}
            <div className="feedback-field">

              <label htmlFor="feedback-message">
                Your Feedback
              </label>

              <textarea
                id="feedback-message"
                value={feedback}
                onChange={(event) =>
                  setFeedback(event.target.value)
                }
                placeholder="Tell us about your experience..."
                rows="7"
              />

              <small>
                {feedback.length} characters
              </small>

            </div>


            {/* SUBMIT */}
            <button
              type="submit"
              className="feedback-submit-button"
              disabled={
                !rating || !feedback.trim()
              }
            >
              Submit Feedback →
            </button>

          </form>
        )}


        {/* FEEDBACK FEATURES */}
        <section className="feedback-benefits">

          <div className="feedback-benefit">

            <div className="feedback-benefit-icon">
              ❤️
            </div>

            <div>
              <h3>
                Your Opinion Matters
              </h3>

              <p>
                Your experience helps us understand
                what learners need.
              </p>
            </div>

          </div>


          <div className="feedback-benefit">

            <div className="feedback-benefit-icon">
              🚀
            </div>

            <div>
              <h3>
                Help Us Improve
              </h3>

              <p>
                Suggestions help us make SilentSync
                more useful and accessible.
              </p>
            </div>

          </div>


          <div className="feedback-benefit">

            <div className="feedback-benefit-icon">
              🤟
            </div>

            <div>
              <h3>
                Build Better Learning
              </h3>

              <p>
                Together we can make sign language
                learning more interactive.
              </p>
            </div>

          </div>

        </section>


        {/* QUICK LINKS */}
        <section className="feedback-links">

          <h3>
            Explore SilentSync
          </h3>

          <div>

            <Link to="/learning">
              📚 Learning
            </Link>

            <Link to="/game">
              🎮 Game
            </Link>

            <Link to="/progress">
              📊 Progress
            </Link>

            <Link to="/profile">
              👤 Profile
            </Link>

          </div>

        </section>

      </main>


      {/* FOOTER */}
      <footer className="feedback-footer">

        <Link to="/">
          ← Back to SilentSync
        </Link>

        <span>
          Keep learning. Keep signing. 🤟
        </span>

      </footer>

    </div>
  );
}

export default Feedback;