const express = require('express');
const router = express.Router();
const wordsController = require('../controllers/wordsController');

router.post('/', wordsController.login);

module.exports = router;
