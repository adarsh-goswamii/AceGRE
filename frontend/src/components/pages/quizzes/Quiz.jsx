import { useState, useEffect } from "react";
import Button from "../../shared/button/Button";
import "./Quiz.scss";
import Option from "../../widgets/option/Option";
import Timer from "../../widgets/timer/Timer";
import { useDispatch, useSelector } from "react-redux";
import QuizStepper from "../../widgets/quizStepper/QuizStepper";

import {
  endQuiz,
  fetchQuestions,
  patchSolution,
  resetQuiz,
} from "../../../store/action/quiz";
import { openModal, closeModal } from "../../../store/action/common";
import { useHistory } from "react-router-dom";
import UnauthorizedAccess from "../../widgets/unauthorizedAccess/UnauthorizedAccess";

const Quiz = ({}) => {
  const dispatch = useDispatch();
  const navigate = useHistory();
  const time = new Date();
  const [id, setId] = useState(undefined);
  const [currQues, setCurrQues] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAns, setSelectedAns] = useState([]);

  const quizId = useSelector((state) => state.quiz.quizGeneratedId);
  const quizQuestions = useSelector((state) => state.quiz.quizQuestions);
  const solnSubmitted = useSelector(
    (state) => state.quiz.patchQuizSolutionSuccess
  );
  const quizEnd = useSelector((state) => state.quiz.endQuizSuccess);
  const url = window.location.pathname.split("/").pop();

  const quizState = useSelector((state) => state.quiz);
  
  useEffect(() => {
    if (localStorage.getItem("token") && !localStorage.getItem("quiz"))
      dispatch(
        openModal({
          children: <QuizStepper />,
          hideBackdrop: true,
        })
      );

    return () => {
      dispatch(closeModal());
      dispatch(resetQuiz());
    };
  }, []);

  useEffect(() => {
    return () => {
      dispatch(closeModal());
      dispatch(resetQuiz());
    };
  }, [url]);

  useEffect(() => {
    if (quizId) {
      dispatch(fetchQuestions(quizId));
      setId(quizId);
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

    dispatch(patchSolution(payload));
  }

  function handleEndQuiz(id) {
    dispatch(endQuiz(id));
    const route = {
      pathname: "/results",
      search: `?id=${id}`,
    };
    navigate.push(route);
  }

  if (!localStorage.getItem("token")) {
    dispatch(
      openModal({
        children: <UnauthorizedAccess />,
        hideBackdrop: true,
      })
    );
  }
  return (
    <div className="background-modal">
      {quizQuestions?.length > currQues && (
        <Timer
          onComplete={submitSolution}
          duration={time}
          currQues={currQues}
        />
      )}
      {quizQuestions?.length > currQues && (
        <div className="quiz-questions">
          <p className="question-count">{`${currQues + 1} of 20`}</p>
          <p className="question">{`Question : ${questions[currQues]?.word}`}</p>
          <div className="options-container">
            {questions?.[currQues]?.options.map((data) => (
              <Option
                setSelectedAns={setSelectedAns}
                text={data.meaning}
                key={`${currQues}-${data.id}`}
                id={data.id}
              />
            ))}
          </div>
          <div className="btn-container">
            <Button
              variant="outlined"
              className="red"
              onClick={(e) => {
                handleEndQuiz(id);
              }}
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
      )}
    </div>
  );
};

export default Quiz;
