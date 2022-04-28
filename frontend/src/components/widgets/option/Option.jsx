import "./Option.scss";
import { PropTypes } from "prop-types";

const Option = ({ text, id, setSelectedAns, defaultState = "" }) => {
  function handleOptionClick(event) {
    event.target.classList.toggle("selected");
    setSelectedAns((prev) => {
      if (prev.includes(id)) return prev.filter((data) => data !== id);
      else return [...prev, id];
    });
  }

  return (
    <>
      <div
        className={`option-container ${defaultState}`}
        onClick={handleOptionClick}
      >
        <div className="info">{text}</div>
      </div>
    </>
  );
};

export default Option;

Option.propTypes = {
  text: PropTypes.string,
  id: PropTypes.number,
  setSelectedAns: PropTypes.func,
  defaultState: PropTypes.string,
};
