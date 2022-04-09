const HttpError = require('../models/http-error');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const TOKEN_CREATION_KEY = "AGH78@NVS&98$ASLDM";
const login = async (req, res, next) => {
  // TODO: handle token creation and renew.
  try {
    const { email, password, rememberMe } = req.body;
    const userInfo = await User.findOne({email: email}).exec();
    if(userInfo) {
      const validPass = await bcrypt.compare(password, userInfo.password);
      if(validPass) {
        // user logged in generate a token for him.
        res.status(200).json({
          status: "success", 
          data: {
            email: email, 
            token: "", 
            message: "User successfully logged in"
          }
        });
      } else {
        // user exists but password is wrong
        res.status(409).json({
          status: "failure", 
          data: {
            email: email, 
            token: "", 
            message: "Email or password is wrong"
          }
        });
      }
    } else {
      // no user with given email exists
      res.status(404).json({
        status: "failure", 
        data: {
          email: email, 
          token: "", 
          message: "No user with given email exists"
        }
      })
    }
  } catch (error) {
    // internal error 
    return next(new HttpError(error, 500));
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 16);
    const generatedToken = jwt.sign({
      password: hashedPass,
      email: email,
    }, TOKEN_CREATION_KEY, { expiresIn: "1h" });

    const newUser = new User({ email, password: hashedPass, admin: false });
    await newUser.save();

    res.status(200).json({
      status: "success",
      data: {
        token: generatedToken,
        email: email,
        admin: false,
      }
    });
  } catch (error) {
    return next(new HttpError(error, 500));
  }
}

module.exports = {
  login,
  register
};

