import { useState, useEffect } from "react";
import { Modal, Stepper, Step, StepLabel, lighten } from "@material-ui/core";
import Button from "../../shared/button/Button";
import "./Quiz.scss";
import Option from "../../widgets/option/Option";
import Timer from "../../widgets/timer/Timer";
import { useDispatch, useSelector } from "react-redux";
import {
  endQuiz,
  fetchQuestions,
  generateQuiz,
  patchSolution,
  resetQuiz,
} from "../../../store/action/quiz";
import {
  STEPS as steps,
  INSTRUCTIONS as Instructions,
} from "../../../constants/generic.consts";
import { useNavigate } from "react-router-dom";

const Quiz = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [currQues, setCurrQues] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAns, setSelectedAns] = useState([]);

  const quizId = useSelector((state) => state.quiz.quizGeneratedId);
  const quizQuestions = useSelector((state) => state.quiz.quizQuestions);
  const solnSubmitted = useSelector(
    (state) => state.quiz.patchQuizSolutionSuccess
  );
  const quizEnd = useSelector((state) => state.quiz.endQuizSuccess);
  useEffect(() => {
    if (activeStep === steps.length) {
      setOpenModal(false);
      dispatch(generateQuiz());
    }
  }, [activeStep]);

  useEffect(() => {
    if (quizId) {
      dispatch(fetchQuestions(quizId));
    }
  }, [quizId]);

  useEffect(() => {
    if (quizQuestions) {
      setQuestions(quizQuestions);
    }
  }, [quizQuestions]);

  useEffect(() => {
    if (Object.keys(solnSubmitted).length) {
      nextQues();
    }
  }, [solnSubmitted]);

  useEffect(() => {
    if ((currQues !== 0 && currQues === questions.length) || quizEnd) {
      navigate(`results?id=${quizId}`);
    }

    return () => dispatch(resetQuiz());
  }, [currQues, quizEnd]);

  function nextQues() {
    setCurrQues((prev) => prev + 1);
    setSelectedAns([]);
  }

  function isStepCompleted(index) {
    return activeStep > index;
  }

  function submitSolution() {
    let payload = {
      quiz_id: quizId,
      ques: currQues,
      selected_ans: selectedAns,
    };

    const test = questions?.[currQues]?.options.filter(({ id, meaning }) =>
      selectedAns.includes(id)
    );
    dispatch(patchSolution(payload));
  }

  function handleEndQuiz() {
    dispatch(endQuiz(quizId));
  }

  return (
    <>
      {activeStep === steps.length && questions.length > currQues ? (
        <div className="container">
          <div className="left">
            {
              <Timer
                onComplete={submitSolution}
                duration={60}
                currQues={currQues}
              />
            }
          </div>
          <div className="right">
            <div className="ques-container">
              <p className="heading">
                Choose correct meaning for the given word <br /> Note: There can
                be more than one correct answer{" "}
              </p>
              <p className="question">{`Question : ${questions[currQues].word}`}</p>
            </div>
            <div className="options-container">
              {questions?.[currQues]?.options.map((data) => (
                <Option
                  setSelectedAns={setSelectedAns}
                  text={data.meaning}
                  key={data.id}
                  id={data.id}
                />
              ))}
            </div>
            <div className="btn-container">
              <Button
                variant="outlined"
                className="red"
                onClick={handleEndQuiz}
              >
                End Quiz
              </Button>
              <Button
                variant="contained"
                className="green"
                onClick={submitSolution}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <Modal open={openModal} onClose={() => {}}>
        <div className="stepper-container">
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              stepProps.completed = isStepCompleted(index);

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <p>All steps completed - you&apos;re finished</p>
                <Button>Reset</Button>
              </div>
            ) : (
              <div>
                <div className="content">
                  {activeStep === 0 &&
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi non aperiam minima, aliquam, reiciendis modi saepe sed numquam omnis nobis culpa facilis tempore aliquid possimus consequatur corrupti. Ratione, eius cupiditate"}

                  {activeStep === 1 &&
                    Instructions.map((ins, index) => (
                      <li key={index} className="points">
                        {ins}
                      </li>
                    ))}
                </div>
                <div className="btn-container">
                  <Button
                    variant="outlined"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => prev - 1)}
                  >
                    Back
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setActiveStep((prev) => prev + 1)}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Quiz;
