import { useState, useEffect, useRef } from "react";
import InputField from "../../shared/inputField/InputField";
import Button from "../../shared/button/Button";
import { ReactComponent as AddIcon } from "../../../assets/images/add.svg";
import styles from "./DynamicInputs.module.scss";
import Accordion from "../../shared/accordion/Accordion";

const DynamicInputs = ({ heading, className, inputs, setInputs }) => {
  
  function handleInputValueChange(value, index, event) {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  }

  function handleAddInputClick(event) {
    event.stopPropagation();
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
      >{`Add ${heading?.toLowerCase()}`}</Button>
    </div>
  );

  const AccordionDetails = (
    <div className={styles["inputs__field-container"]} >
      {
        inputs?.map((input, index) => {
          return (
            <InputField value={input} onChange={(value, event) => handleInputValueChange(value, index, event)} key={index} placeholder={`Add ${heading.toLowerCase()}...`} className={styles["inputs__input-field"]} />
          )
        })
      }
    </div>
  );

  return (
    <Accordion
      className={`${styles["inputs"]} ${className}`}
      defaultExpanded={true}
      Heading={AccordionHeader}
      Content={AccordionDetails} />
  )
};

export default DynamicInputs;