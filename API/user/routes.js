//library imports
const express = require("express");
const passport = require("passport");
//components
const { signup, signin } = require("./controllers");
//************************************************************************* */

const router = express.Router();

//signup
router.post("/signup", signup);

//signin
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
