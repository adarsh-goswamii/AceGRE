import "./PercentageFill.scss";

const PercentageFill = ({ percentage }) => {
  return (
    <div className="pie-container">
      <div className="pie animate" style={{ "--p": `${percentage}`, "--c": "green" }}>{`${percentage}%`}</div>
    </div>
  )
}

export default PercentageFill;