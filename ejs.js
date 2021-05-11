const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/person", (req, res) => {
  res.render("person"); //res.render => res.sendFile
});

app.listen(3000);
console.log("Server started on port : 3000");
