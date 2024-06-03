import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import QuestionCard from "../../widgets/questionCard/QuestionCard";
import { fetchResults } from "../../../store/action/quiz";
import "./Result.scss";
import { checkIfCorrect } from "../../../utility/utils";
import PercentageFill from "../../widgets/percentageFill/PercentageFill";
import Button from "../../shared/button/Button";
import WordModal from "../../widgets/wordModal/WordModal";
import { openModal } from "../../../store/action/common";
import useFullScreen from "../../../hooks/useFullScreen";

const Result = ({}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useHistory();
  const containerId = "quiz-container-modal";
  const { exitFullScreen } = useFullScreen(containerId);
  const id = new URLSearchParams(location.search).get("id");

  const results = useSelector((state) => state.quiz.quizResults);

  useEffect(() => {
    if (id) {
      exitFullScreen();
      dispatch(fetchResults(id));
    }
  }, [id]);

  function handleCardClick(question, index) {
    dispatch(
      openModal({
        children: <WordModal {...question} index={index} />,
      })
    );
  }

  return (
    <div className="container">
      <div className="left">
        {/* list of words on click modal open */}
        <p className="heading">Results</p>
        {results?.questions?.map((ques, index) => {
          return (
            <QuestionCard
              word={ques.word}
              correct={checkIfCorrect(ques?.submitted_ans, ques?.correct_ans)}
              index={index + 1}
              onClick={() => handleCardClick(ques, index + 1)}
            />
          );
        })}
      </div>

      <div className="right">
        <PercentageFill
          percentage={Math.floor(
            (results?.results?.no_of_correct * 100) /
              results?.results?.total_ques
          )}
        />
        <p className="text">
          Congratulations on completing the quiz! Below you can see your results
          and review the correct answers.
        </p>
        <p className="text">
          You can click on the question cards on the left to check out the
          expanded version of the problem. Thank you for participating! Feel
          free to take the quiz again to improve your score or try another quiz
          to test your knowledge further.
        </p>
        <Button
          variant="outlined"
          onClick={() => navigate.push("/explore")}
          className="btn"
        >
          Continue Learning
        </Button>
      </div>
    </div>
  );
};

export default Result;
