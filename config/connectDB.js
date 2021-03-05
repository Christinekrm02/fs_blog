const mongoose = require("mongoose");
async function connectDB() {
  const connection = await mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/fs_blog",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    }
  );
  if (connection) console.log("Connected to db");
  else console.log("Not connected to db");
}

module.exports = connectDB;
