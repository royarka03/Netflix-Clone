const jwt = require("jsonwebtoken");
const User = require("./user");
require('dotenv').config();

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id: verifyToken._id});
        let response = null;
        if(!user) {
            response = {status:401, message:"No user authenticated"};
        }
        else {
            req.user = user;
            req.token = token;
            response = {status:201, message:"User authenticated"};
        }
        return response;
    }
    catch(err) {
        console.log(err);
        return {status:401,message:"Unauthorized no token provide"};
    }
}

module.exports = authenticate;