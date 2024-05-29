import "./Login.scss";
import { useState, useRef } from "react";
import LoginForm from "../../widgets/login/LoginForm";
import SignUpForm from "../../widgets/login/SignUpForm";
import {
  WELCOME_BACK_MESSAGE,
} from "../../../constants/generic.consts";
import Logo from "../../shared/logo/Logo";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = ({}) => {
  const history = useHistory();
  const circleRef = useRef();
  const initForm =
    new URL(document.location).searchParams.get("form") === "login";
  const [showLoginForm, setShowLoginForm] = useState(initForm);
  localStorage.removeItem("quiz");

  function handleToggleForm (isLogin) {
    history.push({
      pathname: '/auth',
      search: `?form=${isLogin ? 'login': 'register'}`
    });
    setShowLoginForm(isLogin);
  }

  return (
    <>
      <div className="login-container">
        <div className="greeting-container">
        <Logo />
          <div className="greetings">
            <p className="header-greeting">
              {`Welcome ${showLoginForm ? "Back" : ""}`}
            </p>
            <span className="sub-greeting">
              {WELCOME_BACK_MESSAGE}
            </span>
          </div>
        </div>
        <div className="form">
          {showLoginForm ? (
            <LoginForm circleRef={circleRef} toggleForm={() => handleToggleForm(false)} />
          ) : (
            <SignUpForm circleRef={circleRef} toggleForm={() => handleToggleForm(true)} />
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
