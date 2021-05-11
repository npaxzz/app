const express = require("express");
const ejs = require("ejs");
const cookie = require("cookie-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "signin-signout",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  if (req.session.login) {
    let login = req.session.login;
    res.render("signin", { login: login, isValid: true });
  } else if (!req.body.login) {
    let login = req.cookies.login || "";
    let password = req.cookies.password || "";
    let saveCookie = req.cookies.save || "";

    res.render("signin", {
      login: login,
      password: password,
      save: saveCookie,
      isValid: false,
    });
  }
});

app.all("/signin", (req, res) => {
  let login = req.cookies.login || "";
  let password = req.cookies.password || "";
  let saveCookie = req.cookies.save || "";
  let signIn = false;
  let valid = false;

  if (req.session.login) {
    let login = req.session.login;
    res.render("signin", { login: login, signedIn: true });
  } else if (!req.body.login) {
    res.render("signin", {
      login: login,
      password: password,
      save: saveCookie,
      isValid: false,
    });
  } else {
    login = req.body.login || "";
    password = req.body.password || "";
    saveCookie = req.body.save || "";

    if (login == "node" && password == "express") {
      if (req.body.save) {
        let age = 10 * 60 * 1000;
        res.cookie("login", login, { maxAge: age });
        res.cookie("password", password, { maxAge: age });
        res.cookie("save", saveCookie, { maxAge: age });
      } else {
        res.clearCookie("login");
        res.clearCookie("password");
        res.clearCookie("save");
      }
      req.session.login = login;
      signedIn = true;
      valid = true;
    } else {
      password = "";
    }
    res.render("signin", {
      login: login,
      password: password,
      save: saveCookie,
      signedIn: signedIn,
      valid: valid,
    });
  }
});

app.get("/signin", (req, res) => {
  if (req.session.login) {
    req.session.destroy((err) => {});
  }
  res.redirect("/signin");
});

app.listen(3000);
console.log("Server started on port : 3000");
