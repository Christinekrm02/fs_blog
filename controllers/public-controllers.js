const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postRegisterUser = async (req, res) => {
  try {
    //CHECK IF USER EXISTS ALREADY
    const user = await User.findOne({ username: req.body.username });
    if (user) res.json({ msg: "User with that info already exists" });
    else {
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      return res.json({
        msg: "User created",
        user: newUser,
      });
    }
  } catch (err) {
    // console.log(err);
    return res.json({
      msg: err.Message,
    });
  }
};

exports.postLoginUser = async (req, res) => {
  try {
    //show password to be able to compare to stored password
    const user = await User.findOne({ username: req.body.username }).select(
      "+password"
    );
    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        //AUTHENTICATE INFORMATION
        const token = jwt.sign(
          { id: user._id, email: user.email, username: user.username },
          "fs_blog"
        );
        return res.json({
          msg: "Login successful",
          token,
          user: {
            id: user._id,
            email: user.email,
            username: user.username,
          },
        });
      } else {
        return res.json({ msg: "Info does not match" });
      }
    }
  } catch (err) {
    return res.json({ msg: "Unable to login" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json({ msg: "Found users", users });
  } catch (err) {
    return res.json({
      msg: err.Message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.json({
      msg: "Found user",
      user,
    });
  } catch (err) {
    return res.json({
      msg: err.Message,
    });
  }
};
