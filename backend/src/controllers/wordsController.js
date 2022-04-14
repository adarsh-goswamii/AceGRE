const Word = require('../models/wordSchema');
const HttpError = require('../models/http-error');

const addWord = async (req, res, next) => {
    // add validations.
    console.log("adding word");

    const { title, part_of_speech, fun_fact, meanings, mneumonics, sentences } = req.body;

    const word = new Word({
        title,
        part_of_speech,
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
            err,
            500
        );
        return next(error);
    }

    res.status(201).json({ word: word });
};

const getWords = async (req, res, next) => {
    try {
        let { filter, pagination: { size, page_no } } = req.body;
        page_no--;
        const wordsCount = await Word.count();
        const data = await Word.find({}, null, { skip: size * page_no, limit: size });
        res.status(200).json({
            status: "success",
            data: data,
            pagination: {
                size,
                page_no: page_no + 1,
                total_pages: Number(Math.ceil(wordsCount / size))
            }
        })

    } catch (error) {
        return next(new HttpError(error, 500));
    }
};


module.exports = {
    addWord,
    getWords,
}; 