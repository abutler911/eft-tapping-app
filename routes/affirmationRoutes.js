const express = require("express");
const router = express.Router();
const User = require("../models/User");

function camelCaseToSpaces(str) {
  return str.replace(/([A-Z])/g, " $1").toLowerCase();
}

router.get("/affirmation-setup", async (req, res) => {
  let user = req.user;

  if (!user || !user.affirmations) {
    const userId = req.session.passport.user;
    user = await User.findById(userId);
    user = user ? JSON.parse(JSON.stringify(user)) : null; // Deep clone to plain object
  }

  // Debugging Step 1: Check the Conversion
  console.log(
    "Is Plain Object?",
    user instanceof Object &&
      !(user instanceof Array) &&
      !(user instanceof Function)
  );

  const categoriesWithSpaces = {};
  if (user && user.affirmations) {
    for (const [key, value] of Object.entries(user.affirmations)) {
      categoriesWithSpaces[camelCaseToSpaces(key)] = value;
    }
  }

  // Debugging Step 2: Check the Data
  console.log("Categories with Spaces:", categoriesWithSpaces);

  res.render("affirmation-setup", { user, categoriesWithSpaces });
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
