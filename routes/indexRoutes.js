const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("landing-page", { title: "Emotional Freedom Journey" });
});

module.exports = router;
