import { useState, useEffect } from "react";
import { Modal, Stepper, Step, StepLabel, lighten } from "@material-ui/core";
import Button from "../../shared/button/Button";
import "./Quiz.scss";
import Option from "../../widgets/option/Option";
import Timer from "../../widgets/timer/Timer";
import { quiz } from "../../../data/words";

const Quiz = ({ }) => {
  const [openModal, setOpenModal] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [currQues, setCurrQues] = useState(0);
  const steps = ["Select Category", "General Instructions", "All set to go"];
  const Instructions = [
    "The quizzes consists of questions carefully designed to help you self-assess your comprehension of the information presented on the topics covered in the module.",
    "Each question in the quiz is of multiple-choice. Read each question carefully, and click on the button next to your response that is based on the information covered on the topic in the module. Each correct or incorrect response will result in appropriate feedback immediately at the left of the screen.",
    'After responding to a question, click on the "Next Question" button at the bottom to go to the next question. After responding to the all question, click on "Close" on the top of the window to exit the quiz.',
    'Each question has a timer running on the left side of your screen try to answere before the time runs out'
  ];
  const ques = "Audacious";

  function isStepCompleted(index) {
    return activeStep > index;
  }

  useEffect(() => {
    if (activeStep === steps.length) {
      setOpenModal(false);
    }
  }, [activeStep]);

  function nextQues() {
    setCurrQues(prev => prev+1);
  }

  return (
    <>
      { activeStep === steps.length ? <div className="container">
        <div className="left">
          <Timer />
        </div>
        <div className="right">
          <div className="ques-container">
            <p className="heading">Choose correct meaning for the given word <br/> Note: There can be more than one correct answer </p>
            <p className="question">{`Word : ${quiz[currQues].word}`}</p>
          </div>
          <div className="options-container">
            {quiz?.[currQues]?.meanings.map(data => <Option text={data} />)}
          </div>
          <div className="btn-container">
            <Button variant="outlined" className="red">
              End Quiz
            </Button>
            <Button variant="contained" className="green" onClick={nextQues}>
              Submit
            </Button>
          </div>
        </div>
      </div> : 
      <></>}
      <Modal
        open={openModal}
        onClose={() => { }}
      >
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
                <p >
                  All steps completed - you&apos;re finished
                </p>
                <Button >
                  Reset
                </Button>
              </div>
            ) : (
              <div>
                <div className="content">
                  {activeStep === 0 && "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi non aperiam minima, aliquam, reiciendis modi saepe sed numquam omnis nobis culpa facilis tempore aliquid possimus consequatur corrupti. Ratione, eius cupiditate"}

                  {activeStep === 1 && (
                    Instructions.map((ins, index) => (<li key={index} className="points">{ins}</li>))
                  )}
                </div>
                <div className="btn-container">
                  <Button
                    variant="outlined"
                    disabled={activeStep === 0} onClick={() => setActiveStep(prev => prev - 1)} >
                    Back
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setActiveStep(prev => prev + 1)}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
};

export default Quiz;