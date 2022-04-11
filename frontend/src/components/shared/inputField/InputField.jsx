import { PropTypes } from "prop-types";
import { TextField } from "@material-ui/core";

const InputField = ({
  value,
  onChange,
  className,
  placeholder,
  type = "text",
  defaultValue,
  helperText,
  error = false,
  label,
  variant = "outlined",
  ...rest
}) => {
  return (
    <TextField
      fullWidth
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      label={label}
      className={`textfield ${className}`}
      size="small"
      variant={variant}
      placeholder={placeholder}
      type={type}
      defaultValue={defaultValue}
      helperText={helperText}
      error={error}
      {...rest}
    />
  );
};

export default InputField;

InputField.propTypes = {
  // necessary props
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,

  // optional fields
  className: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helperText: PropTypes.string,
  error: PropTypes.bool,
  label: PropTypes.string,
  variant: PropTypes.string,
};
