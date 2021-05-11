const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.use("/axios", express.static(__dirname + "/node_modules/axios/dist"));

app.get("/", (req, res) => {
  res.redirect("random");
});

app.get("/random", (req, res) => {
  if (Object.keys(req.query).length == 0) {
    res.render("random");
  } else {
    if (req.xhr || req.headers.accept.indexOf("json") > -1) {
      //สามารถตัด if ออกไปได้ เพราะในทางปฏิบัติ ไม่ต้องตรวจสอบ
      let min = parseInt(req.query.min);
      let max = parseInt(req.query.max);
      let rand = min + Math.floor(Math.random() * (max - min + 1));

      res.send({ result: rand });
    }
  }
});

app.listen(3000);
console.log("Server started on port : 3000");
