export function initSpeechRecognition() {
  let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

  let recognition = new SpeechRecognition();
  let recognitionList = new SpeechGrammarList();
  recognition.grammars = recognitionList;

  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  return recognition;
};



