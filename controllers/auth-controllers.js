const User = require("../models/User");

exports.putEditUser = async (req, res) => {
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
};

exports.putDeleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.id });
    return res.json({ msg: "User deleted" });
  } catch (err) {
    return res.json({ msg: "Cannot delete user" });
  }
};
