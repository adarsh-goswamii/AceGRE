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
import { useNavigate, useBlocker, usePrompt } from "react-router-dom";
import UnauthorizedAccess from "../../widgets/unauthorizedAccess/UnauthorizedAccess";

const Quiz = ({ }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState(undefined);
  const [currQues, setCurrQues] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAns, setSelectedAns] = useState([]);
  const [timeLeft, setTimeLeft] = useState(59);
  const [quizStarted, setQuizStarted] = useState(false);

  const quizId = useSelector((state) => state.quiz.quizGeneratedId);
  const quizQuestions = useSelector((state) => state.quiz.quizQuestions);
  const solnSubmitted = useSelector(
    (state) => state.quiz.patchQuizSolutionSuccess
  );
  const quizEnd = useSelector((state) => state.quiz.endQuizSuccess);
  const url = window.location.pathname.split('/').pop();

  // will handle refresh.
  useEffect(() => {
    if (localStorage.getItem("quiz")) {
      console.log("Found an existing quiz");
      let data = JSON.parse(localStorage.getItem("quiz"));
      console.log(data);
      dispatch(fetchQuestions(data.id));
      setCurrQues(data.currQues);
      setTimeLeft(data.timeLeft);
      setId(data.id);
      setQuizStarted(true);
    }

    if (localStorage.getItem("token") && !localStorage.getItem("quiz")) dispatch(openModal({
      children: <QuizStepper />,
      hideBackdrop: true
    }));

    return () => {
      localStorage.removeItem("quiz");
      dispatch(closeModal());
      dispatch(resetQuiz());
      console.log("cleanup ran");
    };
  }, []);

  useEffect(() => {
    return () => {
      localStorage.removeItem("quiz");
      dispatch(closeModal());
      dispatch(resetQuiz());
      console.log("cleanup ran");
    };
  }, [url]);

  // handle navigating away
  usePrompt(
    "Are you sure you want to leave? It will result in quiz to end", quizStarted
  );

  useEffect(() => {
    if (quizId) {
      dispatch(fetchQuestions(quizId));
      setId(quizId);
      setQuizStarted(true);
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
      navigate(`results?id=${id}`);
    }
  }, [currQues, id]);

  if (id) {
    localStorage.setItem("quiz", JSON.stringify({
      id: id,
      currQues: currQues,
      timeLeft: timeLeft,
    }));
  }

  function nextQues() {
    setCurrQues((prev) => prev + 1);
    setSelectedAns([]);
  }

  function submitSolution() {
    let payload = {
      quiz_id: id,
      ques: currQues,
      selected_ans: selectedAns,
    };

    const test = questions?.[currQues]?.options.filter(({ id, meaning }) =>
      selectedAns.includes(id)
    );
    dispatch(patchSolution(payload));
  }

  function handleEndQuiz() {
    dispatch(endQuiz(id));
    navigate(`results?id=${id}`);
  }

  if (!localStorage.getItem("token")) {
    dispatch(openModal({
      children: <UnauthorizedAccess />,
      hideBackdrop: true
    }));

    return (
      <div className="background-modal" />
    );
  } else {
    return (
      <>
        {questions.length > currQues ? (
          <div className="container">
            <div className="left">
              <Timer
                onComplete={submitSolution}
                duration={timeLeft}
                currQues={currQues}
                setTimeLeft={setTimeLeft}
              />

              <div className="ques-container">
                {
                  [...Array(questions?.length).keys()].map(val => (
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
