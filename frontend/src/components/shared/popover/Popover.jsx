import { Popover } from "@material-ui/core";

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

// TODO : necessary {anchorEl, setAnchorEl, children}
PopOver.protoTypes = {

};