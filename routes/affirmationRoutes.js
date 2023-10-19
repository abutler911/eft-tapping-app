const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/affirmation-setup", async (req, res) => {
  // If req.user doesn't exist or is incomplete, fetch it from MongoDB
  let user = req.user;
  if (!user || !user.affirmations) {
    const userId = req.session.passport.user; // Assuming you store user ID in session
    user = await User.findById(userId);
  }

  // Render the EJS template and pass the user object
  res.render("affirmation-setup", { user });
});

module.exports = router;
