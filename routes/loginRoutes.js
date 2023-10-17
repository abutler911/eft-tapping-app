const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login", { message: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/affirmation-setup",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;
