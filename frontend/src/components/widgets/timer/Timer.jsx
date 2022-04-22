import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const Timer = ({ }) => {
  return (
    <div className="timer-container">
      <CountdownCircleTimer
        isPlaying
        duration={60}
        colors={['#219653', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[60, 30, 10, 0]}
      >
        {({ remainingTime }) => (<div style={{ textAlign: "center" }}>
          <p>Time Remaining <br /> <span className="timeLeft">{remainingTime}</span> <br /> Seconds</p>
        </div>)}
      </CountdownCircleTimer>
    </div>
  )
};

export default Timer;