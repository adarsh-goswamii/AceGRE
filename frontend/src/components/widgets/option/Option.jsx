
import "./Option.scss";

const Option = ({ text, id, setSelectedAns }) => {
  
  function handleOptionClick(event) {
    event.target.classList.toggle("selected");
    setSelectedAns(prev => {
      if(prev.includes(id)) return prev.filter(data => data!== id);
      else return [...prev, id]
    });
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