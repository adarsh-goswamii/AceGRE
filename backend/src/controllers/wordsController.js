require("dotenv").config();
const Word = require('../models/wordSchema');
const UserData = require('../models/userDataSchema');
const HttpError = require('../models/http-error');
const jwt = require("jsonwebtoken")

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
        let access_token = req.headers["authorization"];
        if (access_token) access_token = req.headers["authorization"].split(" ")[1];

        console.log(access_token);
        let { filter, pagination: { size, page_no } } = req.body;
        page_no--;
        const wordsCount = await Word.count();
        let wordList = await Word.find({}, null, { skip: size * page_no, limit: size }).lean().exec();
        if (access_token) {
            // user is logged in
            let userData;
            jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, async (err, data) => {
                if (err) return res.status(403).json("Unauthorized Access");

                const { id } = data;
                userData = await UserData.findOne({ id }).lean().exec();
                wordList = wordList.map(word => {
                    const status = userData.word_status[word._id.toString()] || null;
                    return Object.assign({}, word, { status });
                });
    
                res.status(200).json({
                    status: "success",
                    data: wordList,
                    pagination: {
                        size,
                        page_no: page_no + 1,
                        total_pages: Number(Math.ceil(wordsCount / size))
                    }
                });
            });
        } else {
            res.status(200).json({
                status: "success",
                data: wordList,
                pagination: {
                    size,
                    page_no: page_no + 1,
                    total_pages: Number(Math.ceil(wordsCount / size))
                }
            });
        }
    } catch (error) {
        return next(new HttpError(error, 500));
    }
};

module.exports = {
    addWord,
    getWords,
}; 