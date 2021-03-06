require("dotenv").config();
const express = require("express"),
  app = express();
connectDB = require("./config/connectDB");
User = require("./models/User");
PORT = process.env.PORT || 3001;

//USER MODEL
//const mongoose = require("mongoose");
connectDB();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//EXPRESS MIDDLEWARE ALLOWS YOU TO ACCEPT USER INPUT
app.use(express.json());
app.use(express.urlencoded({ encoded: true }));

app.post("/user/register", async (req, res) => {
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
});

app.get("/user/all", async (req, res) => {
  try {
    const users = await User.find();
    return res.json({ msg: "Found users", users });
  } catch (err) {
    return res.json({
      msg: err.Message,
    });
  }
});

app.post("/user/login", async (req, res) => {
  try {
    //show password to be able to compare to stored password
    const user = await User.findOne({ username: username }).select("+password");
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
});

//For USER TO CHANGE INFO
app.get("/user/profile/:id", async (req, res) => {
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
});

app.put("/user/edit/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log(user);
    if (user) {
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.eusername = req.body.eusername || user.eusername;
      user.save();
      return res.json({ mes: "Updated User", user });
    }
  } catch (err) {
    console.log(err);
  }
});

app.delete("/user/delete/:_id", async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.id });
    return res.json({ msg: "User deleted" });
  } catch (err) {
    return res.json({ msg: "Cannot delete user" });
  }
});

app.get("/test", (req, res) => {
  res.send("server is working");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
