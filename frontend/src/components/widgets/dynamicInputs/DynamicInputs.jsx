import InputField from "../../shared/inputField/InputField";
import Button from "../../shared/button/Button";
import { ReactComponent as AddIcon } from "../../../assets/images/add.svg";
import styles from "./DynamicInputs.module.scss";


const DynamicInputs = ({ heading }) => {
  const [open, setOpen] = useState(true);
  const [inputs, setInputs] = useState([""]);

  function handleInputValueChange(event, index) {
    let newValue = event.target.value;
    const newInputs = [...inputs];
    newInputs[index] = newValue;
    setInputs(newInputs);
  }

  return (
    <div className={styles["inputs"]}>
      <div className={styles["inputs__header-container"]}>
        <p className={styles["inputs__heading"]}>{heading}</p>
        <Button
          className={styles["inputs__add-btn"]}
          variant="outlined"
          fullWidth={false}
          startAdornment={
            <AddIcon className={styles["inputs__add-icon"]} />
          }
          onClick={() => { }}
        >{`Add another ${heading?.toLowerCase()}`}</Button>
      </div>

      <div className={styles["inputs__field-container"]}>
        {
          inputs?.map(input => {
            return (
              <InputField value={input} onChange={(event) => handleInputValueChange(event, index)} key={index} placeholder="Add meaning ..." />
            )
          })
        }
      </div>

    </div>
  )
};

export default DynamicInputs;
  // <InputField />