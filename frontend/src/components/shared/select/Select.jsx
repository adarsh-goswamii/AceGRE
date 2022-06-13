import { Select as MuiSelect, InputLabel, FormControl } from "@material-ui/core";
import styles from "./select.module.scss";

const Select = ({
  classNameForm,
  classNameSelect,
  id,
  label,
  children,
  onChange = () => { },
  value,
  variant = "outlined",
}) => {
  return (
    <>
      <FormControl className={`${styles[classNameForm]} ${styles["select-form"]}`} size="small">
        <InputLabel id={id} classes={{
          shrink: styles["select-form__label--shrink"],
          root: styles["select-form__label"]
        }}>
          {label}
        </InputLabel>
        <MuiSelect
          labelId={id}
          label={label}
          size="small"
          value={value}
          onChange={onChange}
          variant={variant}
          className={classNameSelect}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left"
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left"
            },
            getContentAnchorEl: null
          }}
        >
          {children}
        </MuiSelect>
      </FormControl>
    </>
  )
}

export default Select;