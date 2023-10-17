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

const app = express();
const port = 3000;

require("./config/passport-config.js")(passport);

connectDB();
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/passport-config");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

app.use("/", indexRoutes);
app.use("/", signupRoutes);
app.use("/", loginRoutes);

app.get("/test-flash", (req, res) => {
  req.flash("error_msg", "User NOT created successfully");
  res.redirect("/login");
});

app.use((err, req, res, next) => {
  console.error(`[Error] ${err.stack}`);
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
