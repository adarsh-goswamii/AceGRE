import "./QuestionCard.scss";
import { PropTypes } from "prop-types";


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

QuestionCard.protoTypes = { 
  // optional fields
  onClick: PropTypes.func,
  index:PropTypes.number,
  word:PropTypes.string,
  correct:PropTypes.bool

}
