const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/affirmation-setup", (req, res) => {
  res.render("affirmation-setup");
});

router.post("/update-affirmations", async (req, res) => {
  const { duration, affirmations } = req.body;

  // Assuming user id is stored in session after login
  const userId = req.session.passport.user;

  try {
    await User.findByIdAndUpdate(userId, {
      affirmationDuration: duration,
      affirmations: affirmations.split("\n"),
    });
    res.redirect("/some-other-page");
  } catch (error) {
    console.log("Error updating user settings:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
