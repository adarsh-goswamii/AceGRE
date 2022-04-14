const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDataSchema = new Schema({
  word_status: { type: Object },
});

module.exports = mongoose.exports('UserData', userDataSchema);