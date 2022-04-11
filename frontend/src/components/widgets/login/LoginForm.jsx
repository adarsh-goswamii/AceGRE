import { useEffect, useState } from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import InputField from "../../shared/inputField/InputField";
import Button from "../../shared/button/Button";
import { login } from "../../../apis/auth";
import { useNavigate } from "react-router-dom";
import Error from "../error/Error";
import { emailValidate } from "../../../utility/validations";
import { SOMETHING_WENT_WRONG } from "../../../constants/errorMessage.consts";

const initInputField = {
  value: "",
  helperText: "",
  error: false,
  disabled: false
};

const LoginForm = ({
  toggleForm,
}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(new Object(initInputField));
  const [password, setPassword] = useState(new Object(initInputField));
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });

  async function handleLogin() {
    try {
      const response = await login({
        email: username.value,
        password: password.value,
        rememberMe: rememberMe,
      });

      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("email", response?.data?.email);
      localStorage.setItem("userId", response?.data?.id);
      localStorage.setItem("role", response?.data?.role);
      navigate("/");
    } catch (error) {
      let errorMessage = error?.response?.data?.data?.message;
      errorMessage= errorMessage ? errorMessage : SOMETHING_WENT_WRONG;
      setError({ show: true, message: errorMessage });
    }
    setPassword(initInputField);
  };

  function handleUsernameOnBlur() {
    const temp = emailValidate(username.value);
    setUsername(prev => {
      return Object.assign({}, prev, {
        helperText: temp,
        error: Boolean(temp),
      });
    });
  };

  function handleUsernameChange(value) {
    const helperText = username.error ? emailValidate(value): "";
    setUsername(prev => Object.assign({}, prev, {
      helperText, 
      value: value, 
      error: Boolean(helperText)
    }))
  };

  function handlePasswordOnChange(value) {
    setPassword(prev => Object.assign({}, prev, { "value": value }));
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
        label="Username / Email"
        onBlur={handleUsernameOnBlur}
        onChange={handleUsernameChange} />
      <InputField
        value={password.value}
        className="input-field necessary"
        type="password"
        label="Password"
        onChange={handlePasswordOnChange} />
      <FormControlLabel
        className="remember-me"
        control={<Checkbox
          checked={rememberMe}
          onChange={() => setRememberMe(prev => !prev)}
        />}
        label="Remember me for a month"
      />

      <p className="helper-text">
        {"Don't have an account ? "}
        <span
          className="link"
          onClick={() => toggleForm(prev => !prev)}>Register</span>
      </p>
      <Button
        variant="outlined"
        className="btn"
        onClick={() => { }}>
        Login in with google
      </Button>
      <Button
        variant="contained"
        className="btn"
        disabled={!username.value || username.error || !password.value}
        onClick={handleLogin}>
        Login
      </Button>

      {error.show && <Error message={error.message} />}
    </>
  )
}

export default LoginForm;