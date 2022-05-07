import Lottie from "lottie-react";
import construction from "../../../assets/lottie/construction.json";
import { LEADERBOARD_LIVE } from "../../../constants/generic.consts";
import "./Leaderboard.scss";

const Leaderboard = ({}) => {
  localStorage.removeItem("quiz");
  return (
    <div className="content-container">
      <p className="content">{LEADERBOARD_LIVE}</p>
      <Lottie animationData={construction} className="lottie" />
    </div>
  );
};

export default Leaderboard;
