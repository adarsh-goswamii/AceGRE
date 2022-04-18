import "./Loader.scss";
import { ReactComponent as LoaderIcon } from "../../../assets/images/loader.svg";

const Loader = () => {
  return (
    <>
      <div className="loader-container">
        <LoaderIcon className="icon" />
      </div>
    </>
  )
};

export default Loader;