import "./Paper.scss";
import { PropTypes } from "prop-types";

const Papers = ({ className, children }) => {
  return <div className={`paper ${className}`}>{children}</div>;
};

export default Papers;

Papers.propTypes={
    //optional fields
    children: PropTypes.node,
    className: PropTypes.object
};
