import Lottie from 'lottie-react';
import loading from "../../../assets/lottie/loading.json";
import "./Loader.scss";


const Loader = () => {
  return (
    <>
      <div className="loader-container">
        <Lottie animationData={loading} className="icon" />
      </div>
    </>
  );
};

export default Loader;
