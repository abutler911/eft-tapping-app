const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

router.get("/signup", (req, res) => {
  res.render("signup", { message: req.flash("error") });
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", "User already exists");
      return res.redirect("/signup");
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save user to DB
    await newUser.save();

    // Log the user in after sign up
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "User created successfully");
      res.redirect("/login");
    });
  } catch (error) {
    console.error("Error signing up user", error);
    req.flash("error", "Internal Server Error");
    res.redirect("/signup");
  }
});

module.exports = router;
