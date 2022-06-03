import DynamicInputs from "../../widgets/dynamicInputs/DynamicInputs";
import styles from "./addWord.module.scss";

const AddWord = ({}) => {
  return (
    <div className={styles["word-form"]}>
      <div className={styles["word-form__container"]}>
        <DynamicInputs heading="Mneumonics" />
      </div>
    </div>
  )
};

export default AddWord;