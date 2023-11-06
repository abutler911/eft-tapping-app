const express = require("express");
const router = express.Router();
const User = require("../models/User");

function camelCaseToSpaces(str) {
  return str.replace(/([A-Z])/g, " $1").toLowerCase();
}

router.get("/affirmation-setup", async (req, res) => {
  // Fetch user data
  let user = req.user;
  if (!user || !user.affirmations) {
    const userId = req.session.passport.user;
    user = await User.findById(userId);
  }

  // Create a "display-friendly" version of the affirmation categories
  const categoriesWithSpaces = {};
  let hasAffirmations = false; // New flag to indicate if any affirmations exist

  for (const [key, value] of Object.entries(user.affirmations)) {
    const newKey = key.replace(/([A-Z])/g, " $1").toLowerCase(); // Converting camelCase to spaces
    const cleanedValue = {};

    // Only include known affirmation points
    const knownPoints = [
      "topOfHead",
      "eyebrow",
      "sideOfEye",
      "underEye",
      "underNose",
      "chin",
      "collarbone",
      "underArm",
    ];

    for (const point of knownPoints) {
      cleanedValue[point] = value[point];
      if (value[point]) {
        hasAffirmations = true;
      }
    }

    categoriesWithSpaces[newKey] = cleanedValue;
  }

  // Render the Pug template
  res.render("affirmation-setup", {
    user,
    categoriesWithSpaces,
    hasAffirmations,
  });
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

router.get("/start-tapping", (req, res) => {
  // Render the tapping page
  res.render("start-tapping", { user: req.user });
});

router.post("/begin-tapping", (req, res) => {
  // Start the tapping process here
  // You can add logic to start the process, like setting timers, etc.

  // Send back a response to the client to indicate the process has started
  res.json({ success: true, message: "Tapping process initiated." });
});

module.exports = router;
