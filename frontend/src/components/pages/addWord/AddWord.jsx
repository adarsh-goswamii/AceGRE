import { useState, useEffect } from "react";
import DynamicInputs from "../../widgets/dynamicInputs/DynamicInputs";
import InputField from "../../shared/inputField/InputField";
import Button from "../../shared/button/Button";
import { addWord } from "../../../store/action/addWord";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../shared/select/Select";
import { MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styles from "./addWord.module.scss";

const AddWord = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [word, setWord] = useState("");
  const [funFact, setFunFact] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [meanings, setMeanings] = useState([""]);
  const [sentences, setSentences] = useState([""]);
  const [mneumonics, setMneumonics] = useState([""]);

  const wordAdded = useSelector((state) => state.addWord.wordAddedSuccessfully);

  useEffect(() => {
    if (localStorage.getItem("role") !== "admin") {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    if (wordAdded) {
      handleResetClick();
    }
  }, [wordAdded]);

  function handleAddWordClick() {
    const payload = {
      title: word,
      part_of_speech: partOfSpeech,
      fun_fact: funFact,
      meanings: meanings
        .filter((data) => Boolean(data.trim()))
        .map((data) => ({ meaning: data })),
      sentences: sentences
        .filter((data) => Boolean(data.trim()))
        .map((data) => ({ sentence: data })),
      mneumonics: mneumonics
        .filter((data) => Boolean(data.trim()))
        .map((data) => ({ mneumonic: data })),
    };
    dispatch(addWord(payload));
  }

  function handleResetClick() {
    setWord("");
    setFunFact("");
    setPartOfSpeech("");
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
          className={`${styles["word-form__word"]} necessary`}
        />
        <Select
          label={"Part of speech"}
          id="part-of-speech"
          required={true}
          value={partOfSpeech}
          onChange={(e) => setPartOfSpeech(e.target.value)}
        >
          <MenuItem>None</MenuItem>
          <MenuItem value={"verb"}>Verb</MenuItem>
          <MenuItem value={"noun"}>Noun</MenuItem>
          <MenuItem value={"adjective"}>Adjective</MenuItem>
        </Select>
      </div>

      <DynamicInputs
        heading="Meanings"
        inputs={meanings}
        setInputs={setMeanings}
        className={styles["word-form__inputs"]}
      />
      <DynamicInputs
        heading="Sentences"
        inputs={sentences}
        setInputs={setSentences}
        className={styles["word-form__inputs"]}
      />
      <DynamicInputs
        heading="Mneumonics"
        inputs={mneumonics}
        setInputs={setMneumonics}
        className={styles["word-form__inputs"]}
      />

      <InputField
        label={"Fun Facts"}
        placeholder={"Enter fun facts...."}
        multiline={true}
        minRows={4}
        value={funFact}
        onChange={setFunFact}
        className={styles["word-form__fun-facts"]}
      />

      <div className={styles["word-form__action-btns"]}>
        <Button variant="outlined" onClick={handleResetClick}>
          Reset
        </Button>
        <Button
          variant="contained"
          onClick={handleAddWordClick}
          disabled={!word.length || !partOfSpeech.length}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddWord;
