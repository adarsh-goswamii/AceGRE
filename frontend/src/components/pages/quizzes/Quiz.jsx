import { useState, useEffect } from "react";
import Button from "../../shared/button/Button";
import Modal from "../../../layout/modal/Modal";
import "./Quiz.scss";
import Option from "../../widgets/option/Option";
import Timer from "../../widgets/timer/Timer";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import secureFeature from "../../../assets/lottie/secure.json";
import QuizStepper from "../../widgets/quizStepper/QuizStepper";

import {
  endQuiz,
  fetchQuestions,
  generateQuiz,
  patchSolution,
  resetQuiz,
} from "../../../store/action/quiz";
import { openModal, closeModal } from "../../../store/action/common";
import { useNavigate } from "react-router-dom";
import UnauthorizedAccess from "../../widgets/unauthorizedAccess/UnauthorizedAccess";

const Quiz = ({ }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currQues, setCurrQues] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAns, setSelectedAns] = useState([]);

  const quizId = useSelector((state) => state.quiz.quizGeneratedId);
  const quizQuestions = useSelector((state) => state.quiz.quizQuestions);
  const solnSubmitted = useSelector(
    (state) => state.quiz.patchQuizSolutionSuccess
  );
  const quizEnd = useSelector((state) => state.quiz.endQuizSuccess);
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  useEffect(() => {
    return () => dispatch(resetQuiz());
  }, []);

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
  }, [currQues, quizEnd]);

  useEffect(() => {
    if(loggedIn) dispatch(openModal({
      children: <QuizStepper />,
      hideBackdrop: true
    }));
  }, [loggedIn]);

  function nextQues() {
    setCurrQues((prev) => prev + 1);
    setSelectedAns([]);
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

  console.log(loggedIn);
  if (!loggedIn) {
    console.log("henlo");
    dispatch(openModal({
      children: <UnauthorizedAccess />,
      hideBackdrop: true
    }));

    return (
      <div className="background-modal" />
    );
  } else {
    console.log("henlo 2");
    return (
      <>
        {questions.length > currQues ? (
          <div className="container">
            <div className="left">
              <Timer
                onComplete={submitSolution}
                duration={60}
                currQues={currQues}
              />

              <div className="ques-container">
                {
                  [...Array(quizQuestions?.length).keys()].map(val => (
                    <div className={`ques-box ${currQues > val ? "completed" : ""}`}>{val + 1}</div>
                  ))
                }
              </div>
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
          <div className="background-modal"></div>
        )}
      </>
    );
  };
};

export default Quiz;
