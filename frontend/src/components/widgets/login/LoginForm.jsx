import { useEffect, useState } from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import InputField from "../../shared/inputField/InputField";
import Button from "../../shared/button/Button";
import { login } from "../../../apis/auth";
import { useNavigate } from "react-router-dom";
import Error from "../error/Error";

const LoginForm = ({
  toggleForm,
}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });

  async function handleLogin() {
    // TODO: add password and email constraints 
    try {
      const response = await login({
        email: username,
        password: password,
        rememberMe: rememberMe,
      });

      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("email", response?.data?.email);
      localStorage.setItem("userId", response?.data?.id);
      localStorage.setItem("role", response?.data?.role);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError({ show: true, message: error?.response?.data?.data?.message });
    }
    setPassword("");
  };

  return (
    <>
      <div className="heading">LOGIN</div>
      <InputField
        value={username}
        className="input-field necessary"
        type="text"
        label="Username / Email"
        onChange={setUsername} />
      <InputField
        value={password}
        className="input-field necessary"
        type="password"
        label="Password"
        onChange={setPassword} />
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
        onClick={handleLogin}>
        Login
      </Button>

      {error.show && <Error message={error.message} />}
    </>
  )
}

export default LoginForm;