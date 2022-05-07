import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import Button from "../../shared/button/Button";
import {
  STEPS as steps,
  INSTRUCTIONS as Instructions,
} from "../../../constants/generic.consts";
import { closeModal } from "../../../store/action/common";
import { generateQuiz } from "../../../store/action/quiz";
import Lottie from "lottie-react";
import allSet from "../../../assets/lottie/allSet.json";
import "./QuizStepper.scss";

const QuizStepper = ({}) => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep === steps.length) {
      dispatch(closeModal());
      dispatch(generateQuiz());
    }
  }, [activeStep]);

  function isStepCompleted(index) {
    return activeStep > index;
  }

  return (
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
                Instructions.map((ins, index) => (
                  <li key={index} className="points">
                    {ins}
                  </li>
                ))}
              {activeStep === 1 && (
                <div className="all-set">
                  <Lottie animationData={allSet} className="lottie" />
                  <p>
                    "You are all set to go, click on the finish button below to
                    start your quiz. Good Luck!!"
                  </p>
                </div>
              )}
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
  );
};

export default QuizStepper;
