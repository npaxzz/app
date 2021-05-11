const express = require("express");
const ejs = require("ejs");
const svgCaptcha = require("svg-captcha");
const session = require("express-session");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "captcha",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.render("captcha");
});

app.get("/captcha-img", (req, res) => {
  let captcha = svgCaptcha.create({ size: 5, noise: 5, background: "#def" });
  req.session.captcha = captcha.text;
  res.type("svg");
  res.status(200);
  res.send(captcha.data);
});

app.all("/captcha", (req, res) => {
  if (!req.body.captcha) {
    res.render("captcha");
  } else {
    let sessCaptcha = req.session.captcha;
    let postCaptcha = req.body.captcha;
    // let r = "";
    let r = "You entered a character that does not match the picture";
    if (sessCaptcha == postCaptcha) {
      r = "You enter the characters that match the picture.";
    }
    // else {
    //   r = "You entered a character that does not match the picture";
    // }
    res.render("captcha", { result: r });
  }
});

app.listen(3000);
console.log("Server started on port : 3000");
