require('dotenv').config();
const HttpError = require('../models/http-error');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const Token = require("../models/tokenSchema");

/**
 * 1. Checks if a user exists with provided name
 * 2. Checks for a valid password.
 * 3. Creates an access token and refresh token.
 * 4. Delete old refresh token.
 * 5. Save new refresh token into the database.
 */
const login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;
    const userInfo = await User.findOne({email: email}).exec();
    if(userInfo) {
      const validPass = await bcrypt.compare(password, userInfo.password);
      if(validPass) {

        const access_token = jwt.sign({email, id: userInfo._id.toString()}, process.env.ACCESS_TOKEN_KEY, {expiresIn: "1h"});
        const refresh_token = jwt.sign({email, id: userInfo._id.toString()}, process.env.ACCESS_TOKEN_KEY, { expiresIn: `${rememberMe? "30d": '1d'}`});

        const newToken= new Token({id: userInfo._id.toString(), token: refresh_token});
        await Token.deleteOne({ email }).exec();
        newToken.save();

        res.status(200).json({
          status: "success", 
          data: {
            email: email, 
            token: access_token, 
            refresh_token: refresh_token,
            message: "User successfully logged in"
          }
        });
      } else {
        // user exists but password is wrong
        res.status(409).json({
          status: "failure", 
          data: {
            email: email, 
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
          message: "No user with given email exists"
        }
      })
    }
  } catch (error) {
    return next(new HttpError(error, 500));
  }
};

/**
 * 1. Checks if a user already exists with provided email
 * 2. Creates an access token and refresh token.
 * 3. Save new refresh token into the database.
 */
const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 16);
    
    let newUser = new User({ email, password: hashedPass, admin: false });
    newUser= await newUser.save();
    
    const generatedToken = jwt.sign({email, id: newUser._id.toString()}, process.env.ACCESS_TOKEN_KEY, { expiresIn: "1h" });
    const refresh_token = jwt.sign({email, id: newUser._id.toString()}, process.env.REFRESH_TOKEN_KEY, { expiresIn: "1d" });

    const newRefreshToken = new Token({ token:refresh_token, id: newUser._id.toString()});
    await newRefreshToken.save();

    res.status(200).json({
      status: "success",
      data: {
        token: generatedToken,
        refresh_token: refresh_token,
        email: email,
        admin: false,
      }
    });
  } catch (error) {
    return next(new HttpError(error, 500));
  }
};

const logout = async (req, res, next) => {
  // try {

  // }
};

/**
 * 1. Checks if we recieved a token.
 * 2. Checks for its validity.
 * 3. Creates a new access token.
 */
const refreshToken = async (req, res, next) => {
  try {
    console.log("refreshing");  
    const {refresh_token} = req.body;
    if(!refresh_token) return res.status(401).json("Unauthorized Access, no token found");

    jwt.verify(refresh_token, process.env.REFRESH_TOKEN_KEY, async (err, data) => {
      if(err) return res.status(403).json({ message: "Unauthorized Access", err});

      const {id, email} = data;
      const {token} = await Token.findOne({email: email}).exec();
      if(!token || token!== refresh_token) return res.status(403).json("Token expired, Unauthorized Access");

      const newToken = jwt.sign({email, id}, process.env.ACCESS_TOKEN_KEY);

      res.status(200).json({
        token: newToken, 
      });
    });
  } catch (error) {
    return next(new HttpError(500, error));
  }
};

module.exports = {
  login,
  register,
  refreshToken
};

