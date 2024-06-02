import { useTimer } from "react-timer-hook";
import { PropTypes } from "prop-types";
import { LinearProgress } from "@material-ui/core";
import { useEffect, useState } from "react";

const Timer = ({ onComplete, duration, currQues }) => {
  const {
    seconds,
    start,
    restart,
  } = useTimer({
    expiryTimestamp: duration,
    onExpire: () => onComplete(),
  });
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (seconds) {
      setProgress(getProgressInPercentage(seconds));
    } else setProgress(0);
  }, [seconds]);

  useEffect(() => {
    const currDat = new Date();
    duration.setSeconds(currDat.getSeconds() + 30);
    if (currQues === 0) start(duration);
    else restart(duration);
  }, [currQues]);

  const getProgressInPercentage = (seconds) => {
    return (seconds / 30) * 100;
  };

  return (
    <div className="timer-container">
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};

export default Timer;

Timer.protoTypes = {
  // optional fields
  onComplete: PropTypes.func,
  duration: PropTypes.number,
  currQues: PropTypes.number,
};
