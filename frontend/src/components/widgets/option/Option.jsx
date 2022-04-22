
import "./Option.scss";

const Option = ({ text }) => {
  
  function handleOptionClick(event) {
    event.target.classList.toggle("selected");
  }

  return (
    <>
      <div className="option-container" onClick={handleOptionClick}>
        <div className="info">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus laboriosam earum blanditiis modi repellat ipsam distinctio, fuga sed aspernatur deserunt voluptatum quasi architecto nesciunt harum amet quos iste beatae natus!
        </div>
      </div>
    </>
  );
};

export default Option;