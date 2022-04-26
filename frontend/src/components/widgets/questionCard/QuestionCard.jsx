import { useState } from "react";
import "./QuestionCard.scss";

const QuestionCard = ({word, correct, index}) => {
  return (
    <div className={`question-card-container ${correct? "correct": "wrong"}`}>
      <div className="content">
        {`${index}. ${word}`}
      </div>
    </div>
  )
}; 

export default QuestionCard;