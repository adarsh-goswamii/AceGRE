const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    title: { type: String, required: true },
    fun_fact: { type: String, required: true },
    meaning: { type: String, required: true },
    mneumonics: { type: String, required: true },
    sentences: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    date_added: { type: String, required: true }
});

module.exports = mongoose.model('Word', wordSchema);