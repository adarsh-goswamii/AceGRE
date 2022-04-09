import "./Login.scss";
import { ReactComponent as LoginWatermark } from "../../../assets/images/Mesh.svg";
import InputField from "../../shared/inputField/InputField";
import { useState } from "react";

const Login = ({

}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="login-container">
        <div className="circle"></div>
        <LoginWatermark className="watermark" />
        <div className="form">
          <div className="heading">LOGIN</div>
          <InputField
            value={username}
            className="input-field"
            type="text"
            label="Username / Email"
            onChange={setUsername} />
          <InputField
            value={password}
            className="input-field"
            type="password"
            label="Password"
            onChange={setUsername} />
        </div>
      </div>
    </>
  )
}

export default Login;

