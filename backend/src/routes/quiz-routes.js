const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/', quizController.postSolution);

router.get('/', quizController.fetchQuestion);

router.get('/generate', quizController.generateQuiz);

router.get('/results', quizController.fetchResults);

module.exports = router;