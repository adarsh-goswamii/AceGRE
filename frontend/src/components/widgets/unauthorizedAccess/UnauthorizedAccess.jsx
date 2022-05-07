import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../store/action/common";
import Lottie from "lottie-react";
import secure from "../../../assets/lottie/secure.json";
import { LOGIN_FOR_THIS_FUTURE } from "../../../constants/generic.consts";
import Button from "../../shared/button/Button";
import { useHistory } from "react-router-dom";
import "./UnauthorizedAccess.scss";

const UnauthorizedAccess = ({

}) => {
  const dispatch = useDispatch();
  const navigate = useHistory();

  useEffect(() => {

    return () => dispatch(closeModal());
  }, []);

  return (
    <div className="secure-container">
      <Lottie animationData={secure} className="lottie" />
      <div className="content">{LOGIN_FOR_THIS_FUTURE}</div>
      <div className="call-for-actions">
        <Button variant="outlined" onClick={() => {
          navigate.push(-1);
          dispatch(closeModal());
        }}>Go Back</Button>
        <Button variant="contained" onClick={() => {
          navigate.push("/auth?user=login");
          dispatch(closeModal());
        }}>Login</Button>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;