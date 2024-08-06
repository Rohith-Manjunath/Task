const express = require("express");
const {
  Home,
  Register,
  Login,
  Logout,
} = require("../Controller/UserController");
const router = express.Router();

router.route("/").get(Home);
router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").post(Logout);

module.exports = router;
