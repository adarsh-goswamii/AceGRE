import "./WordModal.scss";
import { useState, useEffect } from "react";
import QuizQuestion from "../../../model/QuizQuestion";
import { ClickAwayListener } from "@material-ui/core";
import { plainToClass } from "class-transformer";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../store/action/common";
import Option from "../option/Option";
import { checkIfCorrect, getOptionState } from "../../../utility/utils";
import Button from "../../shared/button/Button";
import { updateWordStatus } from "../../../store/action/explore";
import { ReactComponent as CrossIcon } from "../../../assets/images/cross.svg";

const WordModal = ({ index, ...quizQues }) => {
  const dispatch = useDispatch();
  const [ques, setQues] = useState({});
  
  useEffect(() => {
    setQues(plainToClass(QuizQuestion, quizQues));
  }, [quizQues]);

  function handleModalClose() {
    dispatch(closeModal());
  }

  function handleStatusUpdate(status) {
    dispatch(
      updateWordStatus({
        id: quizQues.id,
        status,
      })
    );
    handleModalClose();
  }

  return (
    <>
      <ClickAwayListener onClickAway={handleModalClose}>
        <div className="word-modal-container">
          <CrossIcon className="word-modal-cross" onClick={handleModalClose} />
          <p className="question-word">{`${index}. ${ques?.word}`}</p>

          <div className="options">
            {ques?.options?.map((option) => (
              <Option
                text={option.meaning}
                setSelectedAns={() => {}}
                id={option.id}
                defaultState={getOptionState(
                  option?.id,
                  ques?.submittedAns,
                  ques?.correctAns
                )}
              />
            ))}
          </div>

          <div className="action-btns">
            <Button
              onClick={() => handleStatusUpdate(1)}
              variant={`${
                checkIfCorrect(ques.submittedAns, ques.correctAns)
                  ? "contained"
                  : "outlined"
              }`}
              className={"completed"}
            >
              Completed
            </Button>
            <Button
              onClick={() => handleStatusUpdate(2)}
              variant={`${
                !checkIfCorrect(ques.submittedAns, ques.correctAns)
                  ? "contained"
                  : "outlined"
              }`}
              className={"review"}
            >
              Review Later
            </Button>
          </div>
        </div>
      </ClickAwayListener>
    </>
  );
};

export default WordModal;
