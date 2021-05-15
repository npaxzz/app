const Product = require("./model18");
const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.all("/", (req, res) => {
  res.render("MongoDB");
});

app.listen(3001);
console.log("Server started on port : 3001");
