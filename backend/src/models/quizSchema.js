const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  id: {type: String, required: true},
  meaning: { type: String, required: true},
});

const quizQuestionSchema = new Schema({
  word: { type: String, required: true },
  options: { type: [optionSchema], required: true },
  correct_ans: { type: Array, required: true },
});

const quizSchema = new Schema({
  id: {type: String, required: true},
  questions: [quizQuestionSchema]
});

module.exports = mongoose.model('Quiz', quizSchema);