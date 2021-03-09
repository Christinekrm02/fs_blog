const user = require("../models/User");
const jwt_decode = require("jwt-decode");
const User = require("../models/User");

exports.returnUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const user = await User.findOne({ _id: jwt_decode(token).id });
    req.user = user._id;

    next();
  } catch (err) {
    console.log(err);
  }
};
