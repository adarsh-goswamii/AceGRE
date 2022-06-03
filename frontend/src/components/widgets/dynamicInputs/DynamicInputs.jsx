import { useState, useEffect } from "react";
import InputField from "../../shared/inputField/InputField";
import Button from "../../shared/button/Button";
import { ReactComponent as AddIcon } from "../../../assets/images/add.svg";
import styles from "./DynamicInputs.module.scss";
import Accordion from "../../shared/accordion/Accordion";

const DynamicInputs = ({ heading }) => {
  const [open, setOpen] = useState(true);
  const [inputs, setInputs] = useState([""]);

  function handleInputValueChange(value, index) {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  }

  function handleAddInputClick(event) {
    event.preventDefault();
    setInputs(prev => [...prev, ""]);
  }

  const AccordionHeader = (
    <div className={styles["inputs__header-container"]}>
      <p className={styles["inputs__heading"]}>{heading}</p>
      <Button
        className={styles["inputs__add-btn"]}
        variant="outlined"
        fullWidth={false}
        startAdornment={
          <AddIcon className={styles["inputs__add-icon"]} />
        }
        onClick={handleAddInputClick}
      >{`Add another ${heading?.toLowerCase()}`}</Button>
    </div>
  );

  const AccordionDetails = (
    <div className={styles["inputs__field-container"]}>
      {
        inputs?.map((input, index) => {
          return (
            <InputField value={input} onChange={(value) => handleInputValueChange(value, index)} key={index} placeholder={`Add ${heading.toLowerCase()}...`} className={styles["inputs__input-field"]} />
          )
        })
      }
    </div>
  );

  return (
    <Accordion 
      className={styles["inputs"]} 
      defaultExpanded={true} 
      Heading={AccordionHeader} 
      Content={AccordionDetails} />
  )
};

export default DynamicInputs;