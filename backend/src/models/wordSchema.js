const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meaningSchema= new Schema({ meaning: String});
const mneumonicSchema= new Schema({ mneumonic: String});
const sentenceSchema= new Schema({ sentence: String});

const wordSchema = new Schema({
    title: { type: String, required: true },
    part_of_speech: { type: String, required: true },
    fun_fact: { type: String },
    meanings: [meaningSchema],
    mneumonics: [mneumonicSchema],
    sentences: [sentenceSchema],
    date_added: { type: Date, required: true },
    word_status: { type: Object }
});

module.exports = mongoose.model('Word', wordSchema);