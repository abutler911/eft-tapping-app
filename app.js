const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Setting EJS as the view engine
app.set("view engine", "ejs");

// Setting up the public folder to serve static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // Render an EJS view file
  res.render("index", { message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Emotional Journey App listening on http://localhost:${port}`);
});
