import "./QuestionCard.scss";

const QuestionCard = ({ word, correct, index, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`question-card-container ${correct ? "correct" : "wrong"}`}
    >
      <div className="content">{`${index}. ${word}`}</div>
    </div>
  );
};

export default QuestionCard;
