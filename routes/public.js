const {
  postRegisterUser,
  postLoginUser,
  getAllUsers,
  getUserById,
  getAllPostsByUserId,
} = require("../controllers/public-controllers");
const router = require("express").Router();

/*
@POST
destination /user/register
access public
*/
router.route("/register").post(postRegisterUser);
/*
@POST
destination /user/login
access public
*/
router.route("/login").post(postLoginUser);
/*
@POST
destination /user/getAllUsers
access public
*/
router.route("/all").post(getAllUsers);
/*
@POST
destination /user/getUserById
access public
*/
router.route("/profile/:id").post(getUserById);

//POSTS BY USER
router.route("/posts/all/:id").get(getAllPostsByUserId);

module.exports = router;
