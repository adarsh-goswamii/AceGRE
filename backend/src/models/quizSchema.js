const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  id: { type: String, required: true },
  meaning: { type: String, required: true },
});

const quizQuestionSchema = new Schema({
  id: { type: String, required: true},
  word: { type: String, required: true },
  options: { type: [optionSchema], required: true },
  correct_ans: { type: Array, required: true },
  submitted_ans: {type: Array},
}, { minimize: false });

const quizSchema = new Schema({
  user_id: { type: String, required: true },
  questions: [quizQuestionSchema],
  status: { type: String, required: true },
  date: { type: Date, required: true },
  results: {
    no_of_correct: Number, 
    total_ques: Number,
  },
}, { minimize: false });

module.exports = mongoose.model('Quiz', quizSchema);

/**
 * status can have three values: ["in_progress", "completed", "score_calculated"].
 */