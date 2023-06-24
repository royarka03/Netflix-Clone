const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  firstName: String,
  lastName: String,
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  watchlist: []
});

userSchema.methods.generateAuthToken = async function () {
  try {
      let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
          expiresIn: "30d"
      });
      this.tokens = this.tokens.concat({ token: token });
      await this.save();
      return token;
  } catch (error) {
      res.status(422).json(error);
  }
}

module.exports =  mongoose.model("User", userSchema);