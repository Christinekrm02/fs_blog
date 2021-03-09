const User = require("../models/User");
const Post = require("../models/Post");

//USER FUNCTIONALITY
exports.putEditUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    //TEST
    // if (String(user._id) === String(req.user)) {
    //   console.log("this is my account");
    // } else {
    //   console.log("this is not my account");
    // }
    if (user && String(user._id) === String(req.user)) {
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

//POSTS
exports.postCreatePost = async (req, res) => {
  try {
    if (req.user) {
      const post = await Post.create({
        post: req.body.post,
        user: req.user,
      });
      res.json({ msg: "Post created", post });
    }
  } catch (err) {
    res.json({ msg: "Must be logged in" });
  }
};

exports.putEditPost = async (req, res) => {
  try {
    //
    const post = await Post.findOne({
      _id: req.params.postid,
      user: req.user,
    });
    if (post) {
      post.post = req.body.post || post.post;
      post.save();
      //TO SHOW THAT A POST HAS BEEN EDITED
      //COMPARE POST.CREQATED AT AND POST.UPDATED AT AND IF THEY ARE DIFFERENT, SHOW "EDITED" BUTTON
      return res.json({
        msg: "Post updated",
        post,
      });
    }
  } catch (error) {}
};
