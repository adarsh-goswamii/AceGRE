import propTypes, { PropTypes } from "prop-types";
import { Button } from "@material-ui/core";

const FilledButton = ({
    color = "primary",
    fullWidth = true,
    variant = "contained",
    disableElevation = true,
    disabled = false,
    endIcon,
    startIcon,
    size = "small",
    children,
}) => {
    return (
        <Button
            color={color}
            disabled={disabled}
            disableElevation={disableElevation}
            endIcon={endIcon}
            fullWidth={fullWidth}
            size={size}
            startIcon={startIcon}
            variant={variant}
        >
            {children}
        </Button>
    );
};

export default FilledButton;

FilledButton.propTypes = {
    // necessary fields
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.string,
    ]).isRequired,

    // optional fields
    color: PropTypes.string,
    disabled: PropTypes.bool,
    disableElevation: PropTypes.bool,
    endIcon: PropTypes.node,
    startIcon: PropTypes.node,
    fullWidth: PropTypes.bool,
    size: PropTypes.string,
    variant: PropTypes.string
}