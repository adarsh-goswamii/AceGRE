require('dotenv').config();
const HttpError = require('../models/http-error');
const Word = require("../models/wordSchema");
const Quiz = require("../models/quizSchema");
const jwt = require("jsonwebtoken");


const postSolution = async (req, res, next) => {
  try {
    let access_token = req.headers['authorization'];
    if (access_token) access_token = access_token.split(" ")[1];

    jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, async (err, data) => {
      if (err) return res.status(403).json("Unauthorized Access");

      try {
        let id = req.query.id;
        if (!id) return res.status(401).json({
          status: "failure",
          message: "Quiz id is missing"
        });
        const { ques, selected_ans } = req.body;
        let quiz = await Quiz.findOne({ _id: id }).lean().exec();
        if (!quiz) {
          return res.status(401).json({
            status: "failure",
            message: "No quiz with given id exists"
          });
        }

        quiz.questions[Number(ques)].submitted_ans = selected_ans;

        let updatedValue = await Quiz.updateOne({ _id: id }, { questions: quiz.questions }).exec();
        console.log(updatedValue);
        return res.status(200).json({
          status: "success",
          message: "Answer recorded"
        });
      } catch (error) {
        console.log(error);
        return next(new HttpError("Something went wrong", 500));
      }
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Something went wrong", 500));
  }
};

const fetchQuestion = async (req, res, next) => {
  try {
    let access_token = req.headers['authorization'];
    if (access_token) access_token = access_token.split(" ")[1];

    jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, async (err, data) => {
      if (err) return res.status(403).json("Unauthorized Access");

      let id = req.query.id;
      if (!id) return res.status(401).json({
        status: "failure",
        message: "Quiz id is missing"
      });

      let quizQues = await Quiz.findOne({ _id: id }).lean().exec();
      if (!quizQues) {
        return res.status(404).json({
          status: "failure",
          message: "No quiz generated with particular id"
        });
      } else {
        quizQues = quizQues.questions.map(ques => ({
          options: ques.options,
          word: ques.word,
        }));
      }

      return res.status(200).json({
        status: "success",
        data: quizQues
      });
    });
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }
};


const fetchResults = async (req, res, next) => {
  try {
    let access_token = req.headers['authorization'];
    if (access_token) access_token = access_token.split(" ")[1];

    jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, async (err, data) => {
      if (err) return res.status(403).json("Unauthorized Access");

      try {
        let id = req.query.id;
        if (!id) {
          return res.status(401).json({
            status: "failure",
            message: "Quiz id missing"
          });
        }

        const quiz = await Quiz.findOne({ _id: id }).lean().exec();
        if (!quiz) {
          return res.status(404).json({
            status: "failure",
            message: "No Quiz with given id exists"
          });
        }
        
        if (quiz.status !== "score_calculated") {
          let correctAns = 0;
          quiz.questions.map(({ submitted_ans, correct_ans }) => {
            if (submitted_ans.length === correct_ans.length) {
              let bool = correct_ans.reduce((prev, id) => prev &&= submitted_ans.includes(id), true);

              if (bool) correctAns++;
            }
          });

          quiz.results = {
            no_of_correct: correctAns,
            total_ques: quiz.questions.length
          };

          quiz.status = "score_calculated";
          await Quiz.updateOne({ _id: id }, { ...quiz });
        }
        
        return res.status(200).json({
          status: "success",
          data: quiz,
        });

      } catch (error) {
        return next(new HttpError("Somrthing went wrong", 500));
      }
    });
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }
};

const endQuiz = async (req, res, next) => {
  try {
    // check for token 
    let access_token = req.headers['authorization'];
    if (access_token) access_token = access_token.split(" ")[1];

    jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, async (err, data) => {
      if (err) return res.status(403).json("Unauthorized Access");

      try {
        let id = req.query.id;
        if (!id) {
          return res.status(401).json({
            status: "failure",
            message: "Quiz id missing"
          });
        }

        const quiz = await Quiz.updateOne({ _id: id }, {status: "completed"}).exec();
        console.log(quiz);
        if (!quiz) {
          return res.status(404).json({
            status: "failure",
            message: "No Quiz with given id exists"
          });
        }

        return res.status(200).json({
          status: "success", 
          message: "Quiz ended successfully",
        });
      } catch (error) {
        return next(new HttpError("Something went wrong", 500));
      }
    });
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }
}

const generateQuiz = async (req, res, next) => {
  try {
    // check for token 
    let access_token = req.headers['authorization'];
    if (access_token) access_token = access_token.split(" ")[1];

    jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, async (err, data) => {
      if (err) return res.status(403).json("Unauthorized Access");

      // now when token is legit we need to generate a quiz for the user.
      const { id, email } = data;
      const words = await Word.find({}).lean().exec();

      const quizQues = pickQuestionsRandomly(words);
      let generatedQuiz = new Quiz({
        user_id: id,
        questions: quizQues,
        status: "in_progress",
        date: new Date(),
        results: {}
      });
      generatedQuiz = await generatedQuiz.save();

      // ! delete this console
      console.log(JSON.stringify(generatedQuiz));

      return res.status(200).json({
        status: "success",
        quiz_id: generatedQuiz._id,
        message: "quiz generated",
      });
    });

  } catch (error) {
    new next(HttpError(error, 500));
  }
};

module.exports = {
  postSolution,
  fetchQuestion,
  generateQuiz,
  fetchResults, 
  endQuiz
};


// helper functions 
function pickQuestionsRandomly(wordList) {
  // pick 20 questions 
  let map = {}, meanings = {};
  wordList.forEach(word => {
    word.meanings.map(meaning => meanings[meaning._id] = meaning);
    map[word._id] = word
  });

  let selectedWord = {};
  for (let i = 0; i < 20; i++) {
    let index = random(wordList.length);
    if (wordList[index]._id in selectedWord) i--;
    else {
      let noOfCorrectAns;
      if (wordList[index].meanings.length > 1) {
        noOfCorrectAns = 2;
      } else noOfCorrectAns = 1;

      let correct_ans = [], options = [];
      for (let j = 0; j < noOfCorrectAns; j++) {
        delete meanings[wordList[index].meanings[j]._id];
        correct_ans.push(wordList[index].meanings[j]._id);
        options.push({
          meaning: wordList[index].meanings[j].meaning,
          id: wordList[index].meanings[j]._id
        });
      }

      selectedWord[wordList[index]._id] = {
        word: wordList[index].title,
        correct_ans,
        options
      };
    };
  }

  // fill in the options with some wrong solutions 
  let meaningList = Object.keys(meanings).map(id => meanings[id]);
  Object.keys(selectedWord).map(id => {
    let options = selectedWord[id].options;
    while (options.length != 4) {
      let index = random(meaningList.length);
      options.push({
        id: meaningList[index]._id,
        meaning: meaningList[index].meaning
      });
    }
    shuffleArray(options);
    selectedWord[id].options = options;
  });

  return Object.keys(selectedWord).map(id => selectedWord[id]);
}

function random(maxLimit) {
  let rand = Math.random() * maxLimit;
  rand = Math.floor(rand);
  return rand;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
