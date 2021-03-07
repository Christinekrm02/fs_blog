require("dotenv").config();
const express = require("express"),
  app = express();
connectDB = require("./config/connectDB");
User = require("./models/User");
PORT = process.env.PORT || 3001;

//USER MODEL
//const mongoose = require("mongoose");
connectDB();

//EXPRESS MIDDLEWARE ALLOWS YOU TO ACCEPT USER INPUT
app.use(express.json());
app.use(express.urlencoded({ encoded: true }));

const publicRoutes = require("./routes/public");
app.use("/user", publicRoutes);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
