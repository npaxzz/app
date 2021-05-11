const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/axios", express.static(__dirname + "/node_modules/axios/dist"));

app.get("/", (req, res) => {
  res.redirect("login");
});

app.all("/login", (req, res) => {
  if (!req.body.login) {
    // ! => Not
    res.render("login");
  } else {
    let loginExist = false;
    let users = ["admin", "node", "express"];
    if (users.includes(req.body.login)) {
      loginExist = true;
    }
    res.send({ exist: loginExist });
  }
});

app.listen(3000);
console.log("Server started on port : 3000");
