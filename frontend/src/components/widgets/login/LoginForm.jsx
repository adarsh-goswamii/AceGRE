import { useState } from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import InputField from "../../shared/inputField/InputField";
import Button from "../../shared/button/Button";

const LoginForm = ({
  toggleForm,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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
          onClick={() => toggleForm(prev=> !prev)}>Register</span>
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
        onClick={() => { }}>
        Login
      </Button>
    </>
  )
}

export default LoginForm;