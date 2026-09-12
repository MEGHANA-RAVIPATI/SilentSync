function QuestionCard({
  question,
  image,
  options = [],
  selectedAnswer,
  correctAnswer,
  onAnswer,
}) {
  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-label">
          QUESTION
        </span>

        <h2>{question}</h2>
      </div>

      {image && (
        <div className="question-image">
          <img src={image} alt="Sign" />
        </div>
      )}

      <div className="question-options">
        {options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrect =
            selectedAnswer && option === correctAnswer;

          return (
            <button
              key={option}
              type="button"
              className={`question-option ${
                isSelected ? "selected" : ""
              } ${isCorrect ? "correct" : ""}`}
              onClick={() => onAnswer(option)}
              disabled={Boolean(selectedAnswer)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionCard;