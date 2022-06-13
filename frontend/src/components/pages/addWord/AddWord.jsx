import {useState, useEffect} from "react";
import DynamicInputs from "../../widgets/dynamicInputs/DynamicInputs";
import InputField from "../../shared/inputField/InputField";
import Button from "../../shared/button/Button";
import {addWord} from "../../../store/action/addWord";
import {useDispatch, useSelector} from "react-redux";
import styles from "./addWord.module.scss";

const AddWord = ({ }) => {
  const dispatch = useDispatch();
  const [word, setWord] = useState("");
  const [funFact, setFunFact] = useState("");
  const [meanings, setMeanings] = useState([""]);
  const [sentences, setSentences] = useState([""]);
  const [mneumonics, setMneumonics] = useState([""]);

  const wordAdded = useSelector(state => state.addWord.wordAddedSuccessfully);

  useEffect(() => {
    if(wordAdded) {
      handleResetClick();
    }
  }, [wordAdded])

  function handleAddWordClick () {
    const payload = {
      title: word, 
      part_of_speech: "verb", 
      fun_fact: funFact, 
      meanings: meanings.filter(data => Boolean(data.trim())).map(data => ({meaning: data})), 
      sentences: sentences.filter(data => Boolean(data.trim())).map(data => ({sentence: data})),
      mneumonics: mneumonics.filter(data => Boolean(data.trim())).map(data => ({mneumonic: data})),
    };
    dispatch(addWord(payload));
  };

  function handleResetClick() {
    setWord("");
    setFunFact("");
    setMeanings([""]);
    setSentences([""]);
    setMneumonics([""]);
  }

  return (
    <div className={styles["word-form"]}>
      <p className={styles["word-form__heading"]}>
        Fill the form to add a word
      </p>
      <div className={styles["word-form__details"]}>
        <InputField 
          label={"Word"}
          placeholder={"Enter Word..."}
          value={word}
          onChange={setWord}
          className={styles["word-form__word"]} />
        {/** ! Add a drop down */}
      </div>

      <DynamicInputs 
        heading="Meanings" 
        inputs={meanings}
        setInputs={setMeanings}
        className={styles["word-form__inputs"]} />
      <DynamicInputs 
        heading="Sentences"
        inputs={sentences}
        setInputs={setSentences} 
        className={styles["word-form__inputs"]} />
      <DynamicInputs 
        heading="Mneumonics" 
        inputs={mneumonics}
        setInputs={setMneumonics}
        className={styles["word-form__inputs"]} />

      <InputField 
        label={"Fun Facts"}
        placeholder={"Enter fun facts...."}
        multiline={true} 
        minRows={4} 
        value={funFact}
        onChange={setFunFact}
        className={styles["word-form__fun-facts"]} />

      <div className={styles["word-form__action-btns"]}>
        <Button variant="outlined">Reset</Button>
        <Button variant="contained" onClick={handleAddWordClick}>Submit</Button>
      </div>
    </div>
  )
};

export default AddWord;