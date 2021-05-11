const express = require("express");
const ejs = require("ejs");
const formidable = require("formidable");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");

//ตรงนี้ เซ็ทไว้ว่า โฟลเดอร์ public เป็นโฟลเดอร์สำหรับ static file
//static file หมายถึง ไฟล์ทั่วไป ที่เมื่อเรียกมา ก็แค่ ส่งไฟล์ออกไปเฉยๆ ไม่ต้องรันโค้ดใดๆ
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/upload");
});

app.all("/upload", (req, res) => {
  if (req.method == "GET") {
    res.render("upload");
    return;
  }

  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log("Error");
      res.end();
      return;
    }

    if (files.upfile.name == "") {
      res.render("upload");
      return;
    }
    let upfile = files.upfile;
    let dir = "public";
    let newfile = dir + upfile.name;
    let newName = upfile.name;

    if (!fields.overwrite && fs.existsSync(newfile)) {
      let oldName = upfile.name.split(".");
      let r = Math.floor(Math.random() * 9999999);
      oldName[0] += "_" + r;
      newName = oldName.join(".");
      newfile = dir + newfile;
    }

    // fs.renameSync(upfile.path, newfile, (err) => {
    //   let data = {};

    //   if (upfile.type.match("image/*")) {
    //     data = { file: "upload/" + newfile, fileInfo: upfile };
    //   }
    //   res.render("upload", data);
    // });

    //ต้อง copy file ไปไว้ใน public ถึงจะเปิดได้
    //เพราะโค้ดด้านบน ได้เซ็ท static assetes ไว้ที่ public
    fs.copyFileSync(
      upfile.path,
      "public/" + newfile,
      fs.constants.COPYFILE_EXCL
    );
    if (upfile.type.match("image/*")) {
      //Path ที่แสดงภาพ ไม่ต้องนำหน้าด้วย upload
      //เพราะเราต้องการ ชี้ไปที่ assets ใน public
      data = { file: newfile, fileInfo: upfile };
    }
    res.render("upload", data);
  });
});

app.listen(3000);
console.log("Server started on port : 3000");
