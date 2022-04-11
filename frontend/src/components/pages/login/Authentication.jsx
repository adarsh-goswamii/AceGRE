import "./Login.scss";
import { ReactComponent as LoginWatermark } from "../../../assets/images/Mesh.svg";
import { useState, useRef } from "react";
import LoginForm from "../../widgets/login/LoginForm";
import SignUpForm from "../../widgets/login/SignUpForm";

const Login = ({

}) => {
  const circleRef = useRef();
  const initForm= new URL(document.location).searchParams.get("user") === "login";
  const [showLoginForm, setShowLoginForm] = useState(initForm);

  return (
    <>
      <div className="login-container">
        <div className="greeting-container">
          <p className="greetings">Welcome<br />Back</p>
          <LoginWatermark className="watermark" />
        </div>
        <div className="form">
          <div
            className="circle"
            ref={circleRef}
            onAnimationEnd={(e) => e.target.classList.remove("spin-animate")}
          />
          {
            showLoginForm ? <LoginForm circleRef={circleRef} toggleForm={setShowLoginForm} /> :
              <SignUpForm circleRef={circleRef} toggleForm={setShowLoginForm} />
          }
        </div>
      </div>
    </>
  )
}

export default Login;

