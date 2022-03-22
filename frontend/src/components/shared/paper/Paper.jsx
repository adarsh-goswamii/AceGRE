import "./Paper.scss";

const Papers = ({ className, children }) => {
    return (
        <div className={`paper ${className}`}>
            {children}
        </div>
    );
};

export default Papers;