const Product = require("./model18");
const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.all("/add-Product", (req, res) => {
  if (!req.body.name) {
    res.render("add-Product");
  } else {
    let form = req.body;
    let data = {
      name: form.name || "",
      price: form.price || 0,
      stock: form.stock || 0,
      date_added: new Date(Date.parse(form.date_added)) || new Date(),
      description: form.description || "",
    };
    Product.create(data, (err) => {
      let r = err ? false : true;
      res.render("add-Product", { result: r });
    });
  }
});