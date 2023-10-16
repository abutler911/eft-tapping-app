const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();
    res.redirect("/");
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("An error occurred during signup");
  }
});

module.exports = router;
