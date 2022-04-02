import "./Container.scss";
import { PropTypes } from "prop-types";

const Container = ({
  className, 
  children
}) => {
  return <div className={`page-container ${className}`}>{children}</div>;
};

export default Container;
Container.propTypes = {
  // necessary fields
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  // optional fields
  className: PropTypes.string
};