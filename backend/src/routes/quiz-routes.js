const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.patch('/', quizController.postSolution);

router.get('/', quizController.fetchQuestion);

router.post('/', quizController.endQuiz);

router.get('/generate', quizController.generateQuiz);

router.get('/results', quizController.fetchResults);

module.exports = router;