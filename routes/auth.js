const router = require("express").Router();
const {
  putEditUser,
  putDeleteUser,
} = require("../controllers/auth-controllers");

router.route("edit/id").put(putEditUser);
router.route("delete/id").put(putDeleteUser);
