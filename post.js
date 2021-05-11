const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// app.get("/product", (req, res) => {
//   res.render("product", {
//     name: "นมรสหวาน",
//     prices: [
//       { size: "S", price: 19 },
//       { size: "M", price: 29 },
//       { size: "L", price: 39 },
//       { size: "XL", price: 49 },
//     ],
//   });
// });

app.get("/", (req, res) => {
  res.render("add");
});

app.post("/add", (req, res) => {
  let data = {};
  if (req.body.num1) {
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    let r = parseFloat(num1) + parseFloat(num2);
    data = { n1: num1, n2: num2, r: r };
  }
  res.render("add", data);
});
app.listen(3000);
console.log("Server started on port : 3000");

//วิธีแบบ Post ไม่สามารถเข้าถึง url แบบพิมพ์ลงไปได้ ต้องส่ง req แบบ Post ไปเท่านั้น จึงจะขึ้นหน้า add
//อาจเปลี่ยนมาใช้ app.all แทน app.post จะสามารถเข้าถึง url แบบพิมพ์ /add ได้โดยไม่ต้องส่ง req
