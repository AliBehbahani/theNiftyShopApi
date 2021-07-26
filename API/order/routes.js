//library imports
const express = require("express");
const passport = require("passport");
//components
const { checkout } = require("./controllers");
//************************************************************************* */

const router = express.Router();

//checkout
router.post(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  checkout
);

module.exports = router;
