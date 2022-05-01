require("dotenv").config();
const Word = require('../models/wordSchema');
const UserData = require('../models/userDataSchema');
const HttpError = require('../models/http-error');
const jwt = require("jsonwebtoken")

// TODO: clean ur shit 
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

        let search = req.query.search, status = Number(req.query.status), size = Number(req.query.size), page_no = Number(req.query.page);
        page_no--;
        let wordList = await Word.find({}).lean().exec();
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

                wordList = applyFilter(wordList, search, status);
                [wordList, wordsCount] = applyPagination(wordList, size, page_no);

                res.status(200).json({
                    status: "success",
                    data: wordList,
                    pagination: {
                        size,
                        page_no: page_no + 1,
                        total_pages: Number(Math.ceil(wordsCount / size))
                    }, 
                    filter: {
                        search, 
                        status
                    }
                });
            });
        } else {
            wordList = applyFilter(wordList, search, status);
            [wordList, wordsCount] = applyPagination(wordList, size, page_no);

            res.status(200).json({
                status: "success",
                data: wordList,
                pagination: {
                    size,
                    page_no: page_no + 1,
                    total_pages: Number(Math.ceil(wordsCount / size))
                }, 
                filter: {
                    search, 
                    status,
                }
            });
        }
    } catch (error) {
        return next(new HttpError(error, 500));
    }
};

const updateWordStatus = async (req, res, next) => {
    try {
        const { status, id: word_id } = req.body;
        let access_token = req.headers["authorization"].split(" ")[1] || null;
        if (access_token) {
            jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, async (err, data) => {
                if (err) return res.status(403).json(err);

                const { word_status } = await UserData.findOne({ id: data.id }).lean().exec();
                word_status[word_id] = status;
                await UserData.updateOne({ id: data.id }, { word_status });

                return res.status(200).json({
                    status: "success",
                    data: {
                        id: word_id,
                        status
                    }
                });
            })
        } else res.status(401).json("Unauthorized Access");
    } catch (error) {
        next(new HttpError(500, error));
    }
}

module.exports = {
    addWord,
    getWords,
    updateWordStatus,
};


// helper functions

function applyFilter(words, search, status,) {
    if (search) {
        words = words.filter(word => {
            let ret= word.title.substring(0, search.length).toLowerCase() === search.toLowerCase()
            return ret;
        });
    }
    if (status) {
        words = words.filter(word => word.status === status);
    }
    return words;
}

function applyPagination(words, size, page_no) {
    console.log(words, size, page_no);
    return [words.slice(size*page_no, size*page_no + size), words.length];
}