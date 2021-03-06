const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
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

//HASH PASSWORD

//Do not use arrow function on a pre/post use an anonymous function
userSchema.pre("save", function (next) {
  const user = this;
  //IF PASSWORD IS NOT MODIFIED, MOVE FORWARD
  if (!user.isModified("password")) return next;
  bcrypt.genSalt(10, function (error, salt) {
    //GO TO NEXT FUNCTIONALITY AND RETURN ERROR
    if (error) throw next(error);
    //HASH SALT
    bcrypt.hash(user.password, salt, function (error, hash) {
      if (error) throw next(error);
      user.password = hash;
      next();
    });
  });
});
//COMPARE ENTERED PASSWORD TO HASHED PASSWORD
userSchema.methods.comparePassword = function (userPassword, cb) {
  bcrypt.compare(userPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
