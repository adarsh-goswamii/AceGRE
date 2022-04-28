import "./PercentageFill.scss";
import { PropTypes } from "prop-types";

const PercentageFill = ({ percentage }) => {
  return (
    <div className="pie-container">
      <div
        className="pie animate"
        style={{ "--p": `${percentage}`, "--c": "green" }}
      >{`${percentage}%`}</div>
    </div>
  );
};

export default PercentageFill;

PercentageFill.protoTypes = {
  // optional fields
  percentage: PropTypes.number,
};
