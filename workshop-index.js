const models = require("./models");
const Question = models.Question;
const Answer = models.Answer;
const express = require("express");
const ejs = require("ejs");
const formidable = require("formidable");
const sharp = require("sharp");
const svgCaptcha = require("svg-captcha");
const session = require("express-session");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "/bootstrap",
  express.static(__dirname + "/node_modules/bootstrap/dist")
);
app.use(
  session({
    secret: "workshop-webboard",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.render("workshop");
});

app.get("/captcha", (req, res) => {
  let captcha = svgCaptcha.create({ size: 5, noise: 3, background: "#fff" });
  req.session.captcha = captcha.text;
  res.type("svg");
  res.status(200);
  res.send(captcha.data);
});

app.listen(3000);
console.log("Server started on port : 3000");
