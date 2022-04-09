const HttpError = require('../models/http-error');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const TOKEN_CREATION_KEY = "AGH78@NVS&98$ASLDM";
const login = async (req, res, next) => {
  console.log("Logging user in");


};

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 16);
    const generatedToken = jwt.sign({
      password: hashedPass,
      email: email,
    }, TOKEN_CREATION_KEY, { expiresIn: "1h" });
    res.status(200).json({
      status: "success",
      token: generatedToken,
    });
  } catch (error) {
    return next(new HttpError(error, 500));
  }
}

module.exports = {
  login,
  register
};

