const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("form");
});

app.all("/form", (req, res) => {
  let data = {};
  let form = req.body;

  if (Object.keys(form).length > 0) {
    let fruit = "";
    if (form.fruit) {
      //checbox
      if (Array.isArray(form.fruit)) {
        fruit = form.fruit.join(" , ");
      } else {
        fruit = form.fruit;
      }
    }

    let flower = form.flower || " "; //radio
    let color = form.color; //single-select
    let animal = ""; //multipe-select

    if (form.animal) {
      if (Array.isArray(form.animal)) {
        animal = form.animal.join(" , ");
      }
    } else {
      animal = form.animal;
    }

    data = {
      data: true, //ใช้ตรวจสอบสถานะ
      fruit: fruit, //แทนค่า fruit ใน form.ejs
      flower: flower, //แทนค่า flower ใน form.ejs
      color: color, //แทนค่า color ใน form.ejs
      animal: animal, //แทนค่า animal ใน form.ejs
    };
  }
  res.render("form", data);
});

app.listen(3000);
console.log("Server started on port : 3000");
