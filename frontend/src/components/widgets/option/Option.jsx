
import "./Option.scss";

const Option = ({ text }) => {
  
  function handleOptionClick(event) {
    event.target.classList.toggle("selected");
  }

  return (
    <>
      <div className="option-container" onClick={handleOptionClick}>
        <div className="info">
          {text}
        </div>
      </div>
    </>
  );
};

export default Option;