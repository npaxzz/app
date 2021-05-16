const Product = require("./model18");
const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("MongoDB");
});

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

app.get("/show-Product-all", (req, res) => {
  Product.find().exec((err, docs) => {
    res.render("show-Product-all", { data: docs });
  });
});

app.get("/show-Product-search", (req, res) => {
  let q = req.query.q || "";
  Product.find({ name: { $regex: q, $options: "i" } }).exec((err, docs) => {
    res.render("show-Product-search", { data: docs, q: q });
  });
});

app.get("/show-Product-edit", (req, res) => {
  Product.find().exec((err, docs) => {
    res.render("show-Product-edit", { data: docs });
  });
});

app.all("/edit-product/:id", (req, res) => {
  if (req.method == "GET") {
    if (req.params.id) {
      let id = req.params.id;
      Product.findById(req.params.id).exec((err, doc) => {
        res.render("edit-product", { data: doc });
      });
    } else {
      res.render("show-Product-edit");
    }
  } else if (req.method == "POST") {
    let form = req.body;
    let data = {
      name: form.name || "",
      price: form.price || 0,
      stock: form.stock || 0,
      date_added: new Date(Date.parse(form.date_added)) || new Date(),
      description: form.description || "",
    };
    Product.findByIdAndUpdate(req.params.id, data, {
      useFindAndModify: false,
    }).exec((err) => {
      res.redirect("/show-Product-edit");
    });
  }
});

app.get("/delete-product/:id", (req, res) => {
  if (req.params.id) {
    Product.findByIdAndDelete(req.params.id, {
      useFindAndModify: false,
    }).exec((err) => {
      res.redirect("/show-Product-edit");
    });
  }
});

app.listen(3000);
console.log("Server started on port : 3000");
