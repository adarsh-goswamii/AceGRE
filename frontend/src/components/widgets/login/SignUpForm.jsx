import { useState, useEffect } from "react";
import InputField from "../../shared/inputField/InputField";
import Button from "../../shared/button/Button";
import { PropTypes } from "prop-types";
import Error from "../error/Error";
import {
  emailValidate,
  passwordStrengthCheck,
} from "../../../utility/validations";
import { PASSWORD_DONT_MATCH } from "../../../constants/errorMessage.consts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleRegisterUser } from "../../../store/action/auth";

const initInputField = {
  value: "",
  helperText: "",
  error: false,
  disabled: false,
};

const SignUpForm = ({ toggleForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState(new Object(initInputField));
  const [password, setPassword] = useState(new Object(initInputField));
  const [confirmPassword, setConfirmPassword] = useState(
    new Object(initInputField)
  );
  const [error, setError] = useState({ show: false, message: "" });

  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const failure = useSelector((state) => state.auth.registerUserFailure);

  useEffect(() => {
    if (failure) {
      setError({
        show: true,
        message: failure?.message,
      });
    } else setError({ show: false, message: "" });
  }, [failure]);

  useEffect(() => {
    if (loggedIn) navigate("/");
  }, [loggedIn]);

  function handleEmailChange(value) {
    const helperText = username.error
      ? username.error
        ? emailValidate(value)
        : ""
      : "";
    setUsername((prev) =>
      Object.assign({}, prev, {
        helperText,
        value,
        error: Boolean(helperText),
      })
    );
  }

  function handlePasswordChange(value) {
    const helperText = password.error
      ? password.value
        ? passwordStrengthCheck(value)
        : ""
      : "";
    setPassword((prev) =>
      Object.assign({}, prev, {
        helperText,
        value,
        error: Boolean(helperText),
      })
    );

    if (confirmPassword.value) {
      const helperText =
        value === confirmPassword.value ? "" : PASSWORD_DONT_MATCH;
      setConfirmPassword((prev) =>
        Object.assign({}, prev, {
          helperText,
          error: Boolean(helperText),
        })
      );
    }
  }

  function handleConfirmPasswordChange(value) {
    const helperText = confirmPassword.error
      ? password.value === value
        ? ""
        : PASSWORD_DONT_MATCH
      : "";
    setConfirmPassword((prev) =>
      Object.assign({}, prev, {
        helperText,
        value,
        error: Boolean(helperText),
      })
    );
  }

  function handleOnBlurUsername() {
    const temp = emailValidate(username.value);
    setUsername((prev) => {
      return Object.assign({}, prev, {
        helperText: temp,
        error: Boolean(temp),
      });
    });
  }

  function handleOnBlurPassword() {
    const temp = passwordStrengthCheck(password.value);
    console.log(temp);
    setPassword((prev) =>
      Object.assign({}, prev, {
        helperText: temp,
        error: Boolean(temp),
      })
    );
  }

  function handleOnBlurConfirmPassword() {
    const temp =
      password.value === confirmPassword.value ? "" : PASSWORD_DONT_MATCH;
    setConfirmPassword((prev) =>
      Object.assign({}, prev, {
        helperText: temp,
        error: Boolean(temp),
      })
    );
  }

  function registerClickHandler() {
    const payload = {
      email: username.value,
      password: password.value,
    };
    dispatch(handleRegisterUser(payload));
  }

  const registerDisabled =
    !username.value ||
    !password.value ||
    username.error ||
    password.error ||
    confirmPassword.error ||
    !confirmPassword.value;

  return (
    <>
      <div className="heading">REGISTER</div>
      <InputField
        value={username.value}
        className="input-field necessary"
        type="text"
        error={username.error}
        helperText={username.helperText}
        label="Email Address"
        onBlur={handleOnBlurUsername}
        onChange={handleEmailChange}
      />
      <InputField
        value={password.value}
        className="input-field necessary"
        error={password.error}
        helperText={password.helperText}
        type="password"
        label="Password"
        onBlur={handleOnBlurPassword}
        onChange={handlePasswordChange}
      />
      <InputField
        value={confirmPassword.value}
        className="input-field necessary"
        error={confirmPassword.error}
        onBlur={handleOnBlurConfirmPassword}
        helperText={confirmPassword.helperText}
        type="password"
        label="Confirm Password"
        onChange={handleConfirmPasswordChange}
      />

      <p className="helper-text-login">
        {"Already have an account ? "}
        <span onClick={() => toggleForm((prev) => !prev)} className="link">
          Login
        </span>
      </p>
      <Button variant="outlined" className="btn" onClick={() => {}}>
        Register with google
      </Button>
      <Button
        variant="contained"
        className="btn"
        disabled={registerDisabled}
        onClick={registerClickHandler}
      >
        Register
      </Button>

      {error.show && <Error message={error.message} />}
    </>
  );
};

export default SignUpForm;
SignUpForm.propTypes = {
  // necessary fields
  toggleForm: PropTypes.func.isRequired,
};
