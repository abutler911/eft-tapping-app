require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const indexRoutes = require("./routes/indexRoutes");

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Setting EJS as the view engine
app.set("view engine", "ejs");

// Setting up the public folder to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Use routes
app.use("/", indexRoutes);

app.listen(port, () => {
  console.log(`Emotional Journey App listening on http://localhost:${port}`);
});
