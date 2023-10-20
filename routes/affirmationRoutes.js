const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/affirmation-setup", async (req, res) => {
  let user = req.user;
  if (!user || !user.affirmations) {
    const userId = req.session.passport.user;
    user = await User.findById(userId);
  }

  res.render("affirmation-setup", { user });
});

router.get("/enter-affirmations", (req, res) => {
  res.render("enter-affirmations");
});

router.post("/submit-affirmations", async (req, res) => {
  const userId = req.session.passport.user; // Make sure the user is authenticated

  try {
    const user = await User.findById(userId);

    if (user) {
      user.affirmations = {
        addressingInsecurities: req.body.addressingInsecurities,
        shiftingToDesires: req.body.shiftingToDesires,
        givingPermission: req.body.givingPermission,
        affirmationsAndGratitude: req.body.affirmationsAndGratitude,
      };

      await user.save();
      res.redirect("/affirmations"); // Redirect to a page to display affirmations
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
