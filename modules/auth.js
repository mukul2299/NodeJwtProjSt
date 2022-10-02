const userModel = require("./user/user.model");
const jwt = require("jsonwebtoken");
const secretKey = require('../config/env-files/development.json').secretKey

const auth = {
    userAuth: async (req, res, next) => {
        try {
            const theToken = req.header("auth-token");
            if (!theToken) return res.send( {
                success: false,
                message: "Please login!",
            });
            const tokenUser = await userModel.findOne({ token: theToken });
            const idFromToken = jwt.decode(theToken, { complete: true }).payload._id;
            console.log(idFromToken);
            if (idFromToken != tokenUser._id) return res.send( {
                success: false,
                message: "Header token user and user id mismatch"
            })
            else {
                next();
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = auth;