const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  image: { type: String, required: false },
  admin: { type: Boolean, required: true },
});

module.exports = mongoose.model('User', userSchema);