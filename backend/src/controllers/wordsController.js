const Word = require('../models/wordSchema');
const HttpError = require('../models/http-error');

const addWord = async (req, res, next) => {
    // add validations.
    console.log("adding word");
    
    const { title, fun_fact, meanings, mneumonics, sentences } = req.body;

    const word = new Word({
        title,
        fun_fact,
        meanings,
        mneumonics,
        sentences,
        "date_added": new Date()
    });

    try {
        console.log(word);
        await word.save();
    } catch (err) {
        const error = new HttpError(
            'Could not create word, please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({ word: word });
};


exports.addWord = addWord; 