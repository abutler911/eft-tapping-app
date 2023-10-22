const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/affirmation-setup", async (req, res) => {
  let user = req.user;
  if (!user || !user.affirmations) {
    const userId = req.session.passport.user;
    user = await User.findById(userId);
  }

  res.render("affirmation-setup", { user: user.toObject() });
});

router.get("/enter-affirmations", (req, res) => {
  res.render("enter-affirmations");
});

router.post("/submit-affirmations", async (req, res) => {
  const userId = req.session.passport.user;
  console.log("Request body:", req.body);

  try {
    const user = await User.findById(userId);
    console.log("User before update:", JSON.stringify(user, null, 2));

    if (user) {
      user.affirmations = {
        addressingInsecurities: req.body.addressinginsecurities,
        shiftingToDesires: req.body.shiftingtodesires,
        givingPermission: req.body.givingpermission,
        affirmationsAndGratitude: req.body.affirmationsandgratitude,
      };

      console.log("User after update:", JSON.stringify(user, null, 2));

      const result = await user.save();
      console.log("Save result:", result);

      res.redirect("/affirmation-setup");
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
