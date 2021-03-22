const router = require("express").Router();
const { returnUser } = require("../middleware/return-user");
const {
  putEditUser,
  putDeleteUser,
  postCreatePost,
  putEditPost,
  putPostLikes,
} = require("../controllers/auth-controllers");

router.route("/edit/:id").put(returnUser, putEditUser);
router.route("/delete/:id").put(returnUser, putDeleteUser);
//NEEDS ID SO USE MIDDLEWARE TO VALIDATE
router.route("/post/create").post(returnUser, postCreatePost);
router.route("/post/edit/:postid").put(returnUser, putEditPost);
router.route("/post/like/:postid").put(returnUser, putUpdatePostLikes);
module.exports = router;
