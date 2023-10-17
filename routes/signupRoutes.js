const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save user to DB
    await newUser.save();

    // Redirect or send a response
    req.flash("success", "User created successfully");
    res.redirect("/login");
  } catch (error) {
    console.error("Error signing up user", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
