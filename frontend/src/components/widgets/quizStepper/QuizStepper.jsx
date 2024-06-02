
import { useDispatch } from "react-redux";
import Button from "../../shared/button/Button";
import { closeModal } from "../../../store/action/common";
import { generateQuiz } from "../../../store/action/quiz";
import Lottie from "lottie-react";
import allSet from "../../../assets/lottie/allSet.json";
import "./QuizStepper.scss";

const QuizStepper = ({}) => {
  const dispatch = useDispatch();

  function handleStartQuiz() {
    dispatch(closeModal());
    dispatch(generateQuiz());
  }

  return (
    <div className="stepper-container">
      <div className="stepper-left">
        <div className="all-set">
          <Lottie animationData={allSet} className="lottie" />
        </div>
      </div>
      <div className="stepper-right">
        <p className="labelHeading">Quiz Instructions</p>
        <p className="bodyRegular">
          Welcome to the AceGRE quiz! Please read the following instructions
          carefully before you begin.
        </p>
        <ol className="labelSemiBold quiz-instructions">
          <li className="bodyRegular">
            <span className="bodySemibold">Purpose of the Quiz: </span>This quiz
            is designed to help you actively recall and reinforce your knowledge
            of the 800+ most frequently asked GRE words available on AceGRE.
          </li>
          <li className="bodyRegular">
            <span className="bodySemibold">Question Format:</span>
            <ul>
              <li className="bodyRegular">
                The quiz consists of 20 multiple-choice questions.
              </li>
              <li className="bodyRegular">
                Each question may have more than one correct answer.
              </li>
              <li className="bodyRegular">Read each question carefully.</li>
            </ul>
          </li>
          <li className="bodyRegular">
            <span className="bodySemibold">Answering Questions:</span>
            <ul>
              <li className="bodyRegular">
                Click next to your chosen responses. Your responses should be
                based on the GRE words you have studied.
              </li>
              <li className="bodyRegular">
                Feedback on your answers will be provided at the end of the
                quiz, indicating whether your answers are correct or incorrect.
              </li>
            </ul>
          </li>
          <li className="bodyRegular">
            <span className="bodySemibold">Navigating the Quiz:</span>
            <ul>
              <li className="bodyRegular">
                After responding to a question, click the "Next Question" button
                at the bottom of the screen to proceed to the next question.
              </li>
              <li className="bodyRegular">
                Once you have answered all the questions, click "Close" at the
                top of the window to exit the quiz.
              </li>
            </ul>
          </li>
          <li className="bodyRegular">
            <span className="bodySemibold">Timer:</span>
            <ul>
              <li className="bodyRegular">
                Each question has a timer displayed on the left side of the
                screen.
              </li>
              <li className="bodyRegular">
                Try to answer each question before the time runs out.
              </li>
            </ul>
          </li>
        </ol>
        <p className="bodySemibold good-luck-text">
          Good luck, and do your best to apply what you have learned from the
          AceGRE!
        </p>

        <Button
          variant="contained"
          color="primary"
          className="quiz-start-btn"
          onClick={handleStartQuiz}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default QuizStepper;
