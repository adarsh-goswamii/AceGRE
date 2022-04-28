import "./Error.scss";
import { PropTypes } from "prop-types";
import { ReactComponent as ErrorIcon } from "../../../assets/images/error.svg";

const Error = ({ message }) => {
  return (
    <div className="error-container">
      <ErrorIcon className="icon" />
      <p className="error-message">{message}</p>
    </div>
  );
};

export default Error;

Error.protoTypes = {
  // necessary fields
  message: PropTypes.string.isRequired,
  // optional fields
  //className: PropTypes.string
}
