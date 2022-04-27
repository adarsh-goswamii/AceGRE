import "./WordModal.scss";
import { useState, useEffect } from "react";
import QuizQuestion from "../../../model/QuizQuestion";
import { ClickAwayListener } from "@material-ui/core";
import { plainToClass } from "class-transformer";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../store/action/common";
import Option from "../option/Option";
import { checkIfCorrect } from "../../../utility/utils";
import Button from "../../shared/button/Button";

const WordModal = ({index, ...quizQues}) => {
  const dispatch = useDispatch();
  const [ques, setQues] = useState({});
  useEffect(() => {
    setQues(plainToClass(QuizQuestion, quizQues));
  }, [quizQues]);

  function handleModalClose() {
    dispatch(closeModal());
  }

  return (
    <>
      <ClickAwayListener onClickAway={handleModalClose}>
        <div className="word-modal-container">
          <p className="question-word">{`${index}. ${ques?.word}`}</p>

          <div className="options">
            {
              ques?.options?.map(option => <Option 
                  text={option.meaning} 
                  setSelectedAns={()=>{}}
                  id={option.id} 
                  defaultState={`${ques.correctAns.includes(option.id)? "selected": ""}`} />)
            }
          </div>

          <div className="action-btns">
            <Button variant={`${checkIfCorrect(ques.submittedAns, ques.correctAns)? "contained": "outlined"}`} className={"completed"}>Completed</Button>
            <Button variant={`${!checkIfCorrect(ques.submittedAns, ques.correctAns)? "contained": "outlined"}`} className={"review"}>Review Later</Button>
          </div>
        </div>
      </ClickAwayListener>
    </>
  );
};

export default WordModal;