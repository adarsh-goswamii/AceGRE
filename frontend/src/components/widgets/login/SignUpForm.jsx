import { useState } from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import InputField from "../../shared/inputField/InputField";
import Button from "../../shared/button/Button";

const SignUpForm = ({
  toggleForm
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <>
      <div className="heading">REGISTER</div>
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
      <InputField
        value={confirmPassword}
        className="input-field necessary"
        type="password"
        label="Confirm Password"
        onChange={setConfirmPassword} />

      <p className="helper-text-login">
        {"Already have an account ? "}
        <span
          onClick={() => toggleForm(prev => !prev)}
          className="link">Login</span>
      </p>
      <Button
        variant="outlined"
        className="btn"
        onClick={() => { }}>
        Register with google
      </Button>
      <Button
        variant="contained"
        className="btn"
        onClick={() => {}}>
        Register
      </Button>
    </>
  )
}

export default SignUpForm;