import React, { useState, useEffect } from "react";
import { ReactComponent as MicIcon } from '../../../assets/images/mic.svg';
import { initSpeechRecognition } from "./utils";
import styles from "./speechToText.module.scss";

const SpeechToText = ({setValue}) => {
  const [active, setActive] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    setRecognition(initSpeechRecognition());
  }, []);

  function handleMicClick() {
    setActive(prev => !prev);
    recognition.start();
    recognition.onresult = (event) => {
      const result = event?.results;
      if(result.length) {
        const word = result[0][0]?.transcript;
        setValue(word);
        console.log('word: ', word);
        recognition.stop();
      } 
    };
    recognition.onend = () => {
      setActive(false);
    }
  };

  return (
    <div className={styles["mic-container"]} onClick={handleMicClick}>
      <MicIcon className={styles["mic-container__mic-icon"]}/>
      <button id="speech" className={styles["mic-container__btn"]} />
      <div className={styles[`${active ? "mic-container__pulse-ring" : ""}`]}></div>
    </div>
  );
};

export default SpeechToText;