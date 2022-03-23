import { Popover } from "@material-ui/core";
import { PropTypes } from "prop-types";

const PopOver = ({ id, anchorEl, setAnchorEl, children }) => {
    return (
        <Popover
            id={id}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            {children}
        </Popover>
    );
};

export default PopOver;

PopOver.protoTypes = {
    anchorE1: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]).isRequired,
    children: PropTypes.node.isRequired,
    setAnchorE1: PropTypes.func.isRequired,
    id:PropTypes.number

};