const express = require("express");
const ejs = require("ejs");
const formidable = require("formidable");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/upload-multiple");
});

app.all("/upload-multiple", (req, res) => {
  if (req.method == "GET") {
    res.render("ul-multiple");
    return;
  }
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    let upfiles = files.upfiles;
    if (!Array.isArray(files.upfiles)) {
      if (files.upfiles.name == "") {
        res.render("ul-multiple");
        return;
      } else {
        upfiles = [files.upfiles];
      }
    }
    const dir = "public";
    let fileInfo = [];
    let fileNames = [];

    for (f of upfiles) {
      let newfile = dir + f.name;
      let newName = f.name;
      if (fs.existsSync(newfile)) {
        let oldName = f.name.split(".");
        let r = Math.floor(Math.random() * 9999999);
        oldName[0] += "_" + r;
        newName = oldName.join(".");
        newfile = dir + newfile;
      }

      fileInfo.push(f);
      fileNames.push(newName);
      fs.copyFileSync(f.path, "public/" + newfile, fs.constants.COPYFILE_EXCL);
    }
    res.render("ul-multiple", {
      fileInfo: fileInfo,
      fileNames: fileNames,
    });
  });
});

app.listen(3000);
console.log("Server started on port : 3000");
