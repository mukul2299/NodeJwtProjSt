const joi = require("@hapi/joi");
const User = require("./user.model");
const UserToken = require("../../models/userTokens");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = require("../../config/env-files/development.json").secretKey;

const userValidators = {
  // -----------------------------------------------------------------------------------------
  //Register Validation

  registerValidator: async (req, res, next) => {
    // Searching for user with provided email
    const existingUser = await User.findOne({ email: req.body.email });
    console.log(existingUser);
    // Input fields validations
    const { error } = joi.validate(req.body, {
      name: joi.string().min(4).required(),
      email: joi.string().min(6).required().email(),
      password: joi.string().min(6).required(),
      city: joi.string().min(3).required(),
    });
    if (error) {
      res.send(error.details[0].message);
    }
    // If user already registered then send error
    else if (existingUser) {
      res.status(400).send("Existing User!!");
    }
    // If user is new
    else next();
  },

  // -----------------------------------------------------------------------------------------------------
  loginValidator: async (req, res, cb) => {
    // Searching for user with provided email
    const existingUser = await User.findOne({ email: req.body.email });

    // If not existing user then send invalid email
    if (!existingUser) res.send("Invalid Email");

    //If user alreay logged in
    // const tokenObject=await UserToken.find({_id:existingUser._id})
    // if(tokenObject) next();

    // Later Validations
    const { error } =await joi.validate(req.body, {
      email: joi.string().min(6).required().email(),
      password: joi.string().min(6).required(),
    });
    if (error) {
      res.send(error.details[0].message);
    }

    // If user is existing and password comprision gives true then validPass = true
    let validPass =
      existingUser &&
      (await bcrypt.compare(req.body.password, existingUser.password));
    // console.log("2 valid pass:", validPass);
    if (!validPass) {
      // If validPass is false
      res.send("Invalid Password");
    }

    // Token created: 1664625557711
    const token = await jwt.sign({ _id: existingUser._id }, secretKey);
    existingUser.token = token;
    res.setHeader('auth-token', token);
    // console.log("3", token, req.body.token, res.header("auth-token"));
    return await cb(existingUser,res);

    // // UserId and token saved inside userToken collection
    // console.log(await UserToken.create({
    //     userId:existingUser._id,
    //     token:token
    // }));
    // // Setting token in header
    // console.log(token);
  },

  // ------------------------------------------------------------------------------

  logout: (req, res, next) => {
    console.log("authToken", req.header("auth-token"));
    // UserToken.remove(req)
    next();
  },

  // ----------------------------------------------------------------------------

  tokenVerifier: (req, res, next) => {
    const token = req.header("auth-token");
    console.log("Inside token verifier: ", token);
    if (token) {
      try {
        let verified = jwt.verify(token, secretKey);
        req.user = verified;

        next();
      } catch (err) {
        res.end(err);
      }
    } else {
      res.status(400).send("Token not found");
    }
  },
};

module.exports = userValidators;
