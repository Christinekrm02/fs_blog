require("dotenv").config();
const express = require("express"),
  app = express();
connectDB = require("./config/connectDB");
PORT = process.env.PORT || 3001;

//USER MODEL
const mongoose = require("mongoose");
connectDB();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    select: false,
    required: "Password is required",
  },
});

mongoose.model("User", userSchema);

app.get("/test", (req, res) => {
  res.send("server is working");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
