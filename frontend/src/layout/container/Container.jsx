import "./Container.scss";

const Container = ({
  className, 
  children
}) => {
  return <div className={`page-container ${className}`}>{children}</div>;
};

export default Container;