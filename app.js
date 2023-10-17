require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const connectDB = require("./config/db");
const indexRoutes = require("./routes/indexRoutes");
const signupRoutes = require("./routes/signupRoutes");
const loginRoutes = require("./routes/loginRoutes");

const app = express();
const port = 3000;

connectDB();
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

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

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
