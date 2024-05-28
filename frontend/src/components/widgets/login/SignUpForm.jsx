import { useState, useEffect } from "react";
import InputField from "../../shared/inputField/InputField";
import Button from "../../shared/button/Button";
import { PropTypes } from "prop-types";
import Error from "../error/Error";
import {
  emailValidate,
  fullNameValidate,
  passwordStrengthCheck,
} from "../../../utility/validations";
import { PASSWORD_DONT_MATCH } from "../../../constants/errorMessage.consts";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleRegisterUser } from "../../../store/action/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { getUserProfileFromGoogle } from "../../../apis/auth";
import { generateRandomPassword } from "../../../utility/utils";

const initInputField = {
  value: "",
  helperText: "",
  error: false,
  disabled: false,
};

const SignUpForm = ({ toggleForm }) => {
  const dispatch = useDispatch();
  const navigate = useHistory();
  const [fullname, setFullname] = useState(new Object(initInputField));
  const [username, setUsername] = useState(new Object(initInputField));
  const [password, setPassword] = useState(new Object(initInputField));
  const [confirmPassword, setConfirmPassword] = useState(
    new Object(initInputField)
  );
  const [error, setError] = useState({ show: false, message: "" });

  const loggedIn = Boolean(localStorage.getItem("token"));
  const failure = useSelector((state) => state.auth.registerUserFailure);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      const userData = await getUserProfileFromGoogle(response);
      registerClickHandler({
        email: userData?.email,
        password: generateRandomPassword(),
        fullname: userData?.name
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

  function handleFullnameChange(value) {
    const helperText = fullname.error
      ? fullname.value
        ? fullNameValidate(value)
        : ""
      : "";
    setFullname((prev) =>
      Object.assign({}, prev, {
        helperText,
        value,
        error: Boolean(helperText),
      })
    );
  }

  function handleEmailChange(value) {
    const helperText = username.error
      ? username.value
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

  function handleOnBlurFullname() {
    const temp = fullNameValidate(fullname?.value);
    setFullname((prev) =>
      Object.assign({}, prev, {
        helperText: temp,
        error: Boolean(temp),
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

  function registerClickHandler(payload = undefined) {
    payload = payload || {
      email: username.value,
      password: password.value,
      fullname: fullname.value
    };
    dispatch(handleRegisterUser(payload));
  }

  const registerDisabled =
    !username.value ||
    !password.value ||
    !fullname.value ||
    username.error ||
    password.error ||
    fullname.error ||
    confirmPassword.error ||
    !confirmPassword.value;

  return (
    <>
      <div className="heading">REGISTER</div>
      <InputField
        value={fullname.value}
        className="input-field necessary"
        type="text"
        error={fullname.error}
        helperText={fullname.helperText}
        label="Full Name"
        onBlur={handleOnBlurFullname}
        onChange={handleFullnameChange}
      />
      <InputField
        value={username.value}
        className="input-field necessary"
        type="text"
        error={username.error}
        helperText={username.helperText}
        label="Email Address"
        onBlur={handleOnBlurUsername}
        onChange={handleEmailChange}
        disabled={username.disabled}
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
      <Button variant="outlined" className="btn" onClick={login}>
        Register with google
      </Button>
      <Button
        variant="contained"
        className="btn"
        disabled={registerDisabled}
        onClick={() => registerClickHandler()}
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
