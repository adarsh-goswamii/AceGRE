import { useEffect, useState } from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import InputField from "../../shared/inputField/InputField";
import Button from "../../shared/button/Button";
import { PropTypes } from "prop-types";
import { useHistory } from "react-router-dom";
import Error from "../error/Error";
import { emailValidate } from "../../../utility/validations";
import { handleLogin } from "../../../store/action/auth";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { getUserProfileFromGoogle } from "../../../apis/auth";

export const initInputField = {
  value: "",
  helperText: "",
  error: false,
  disabled: false,
};

const LoginForm = ({ toggleForm }) => {
  const navigate = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState(new Object(initInputField));
  const [password, setPassword] = useState(new Object(initInputField));
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });

  const loggedIn = Boolean(localStorage.getItem("token"));
  const failure = useSelector((state) => state.auth.loginUserFailure);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      loginClickHandler({
        token: response?.access_token
      });
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (failure) {
      setError({
        show: true,
        message: failure?.message,
      });
    } else setError({ show: false, message: "" });
  }, [failure]);

  useEffect(() => {
    if (loggedIn) navigate.push("/");
  }, [loggedIn]);

  function handleUsernameOnBlur() {
    const temp = emailValidate(username.value);
    setUsername((prev) => {
      return Object.assign({}, prev, {
        helperText: temp,
        error: Boolean(temp),
      });
    });
  }

  function handleUsernameChange(value) {
    const helperText = username.error ? emailValidate(value) : "";
    setUsername((prev) =>
      Object.assign({}, prev, {
        helperText,
        value: value,
        error: Boolean(helperText),
      })
    );
  }

  function handlePasswordOnChange(value) {
    setPassword((prev) => Object.assign({}, prev, { value: value }));
  }

  function loginClickHandler(payload) {
    payload = payload || {
      email: username.value,
      password: password.value,
      rememberMe: rememberMe,
    };
    dispatch(handleLogin(payload));
  }

  return (
    <>
      <div className="heading">LOGIN</div>
      <InputField
        value={username.value}
        className="input-field necessary"
        type="text"
        helperText={username.helperText}
        error={username.error}
        label="Email"
        onBlur={handleUsernameOnBlur}
        onChange={handleUsernameChange}
      />
      <InputField
        value={password.value}
        className="input-field necessary"
        type="password"
        label="Password"
        onChange={handlePasswordOnChange}
      />
      <FormControlLabel
        className="remember-me"
        control={
          <Checkbox
            checked={rememberMe}
            onChange={() => setRememberMe((prev) => !prev)}
          />
        }
        label="Remember me for a month"
      />

      <p className="helper-text">
        {"Don't have an account ? "}
        <span className="link" onClick={() => toggleForm((prev) => !prev)}>
          Register
        </span>
      </p>
      <Button variant="outlined" className="btn" onClick={login}>
        Login in with google
      </Button>
      <Button
        variant="contained"
        className="btn"
        disabled={!username.value || username.error || !password.value}
        onClick={() => loginClickHandler()}
      >
        Login
      </Button>

      {error.show && <Error message={error.message} />}
    </>
  );
};

export default LoginForm;
LoginForm.propTypes = {
  // necessary fields
  toggleForm: PropTypes.func.isRequired,
};
