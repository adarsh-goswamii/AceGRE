const express = require('express');
const router = express.Router();
const wordsController = require('../controllers/wordsController');

router.post('/', wordsController.addWord);

router.get('/', (req, res, next)=> res.send({"data": "nothing yet"}));

module.exports = router;
