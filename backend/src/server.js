require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors= require('cors');

const wordsRoutes = require('./routes/words-route');
const authRoutes = require('./routes/auth-routes');
const quizRoutes = require('./routes/quiz-routes');
const HttpError = require('./models/http-error');

const app = express();

// By the time site will be live credentials will be removed so don't bother.

app.use(cors());

app.use(bodyParser.json());

// all routes
app.use('/words', wordsRoutes);

app.use('/auth', authRoutes);

app.use('/quiz', quizRoutes);

app.use((req, res, next) => {
    throw new HttpError('Could Not locate the route', 404);
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

async function connect() {
    try {
        let db = await mongoose.connect(process.env.MONGO_URL);
        app.listen(process.env.SERVER_PORT);
        console.log('CONNECTION SUCCESSFULL'); 
    } catch(error) {
        console.log('Could not connect to the database try again later', error);
    }
};

connect();