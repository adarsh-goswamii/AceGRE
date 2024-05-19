const express = require('express');
const router = express.Router();
const wordsController = require('../controllers/wordsController');

router.post('/', wordsController.addWord);

router.post('/bulk-upload', wordsController.addMultipleWords);

router.get('/', wordsController.getWords);

router.post('/status', wordsController.updateWordStatus);

module.exports = router;
