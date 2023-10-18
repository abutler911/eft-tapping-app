require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const connectDB = require("./config/db");
const passport = require("passport");

const indexRoutes = require("./routes/indexRoutes");
const signupRoutes = require("./routes/signupRoutes");
const loginRoutes = require("./routes/loginRoutes");
const affirmationRoutes = require("./routes/affirmationRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Initialize Passport config
require("./config/passport-config")(passport);

// Connect to Database
connectDB();

// Setup Express and Plugins
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Initialize Passport and Passport session
app.use(passport.initialize());
app.use(passport.session());

// Flash Messages
app.use(flash());

// Set up flash messages and other locals for templates
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Define Routes
app.use("/", indexRoutes);
app.use("/", signupRoutes);
app.use("/", loginRoutes);
app.use("/", affirmationRoutes);

// Test flash message
app.get("/test-flash", (req, res) => {
  req.flash("error_msg", "User NOT created successfully");
  res.redirect("/login");
});

// Error handling
app.use((err, req, res, next) => {
  console.error(`[Error] ${err.stack}`);
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

// Start the app
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
