const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDataSchema = new Schema({
  id: { type: String, required: true },
  word_status: { type: Object, required: true },
},
  { minimize: false });

module.exports = mongoose.model('UserData', userDataSchema);