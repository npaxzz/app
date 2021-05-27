const models = require("./workshop-models");
const Question = models.Question;
const Answer = models.Answer;
const express = require("express");
const ejs = require("ejs");
const formidable = require("formidable");
// formidable แยกวิเคราะห์ข้อมูลฟอร์ม
const sharp = require("sharp");
// sharp ปรับขนาดไฟล์ภาพ
const svgCaptcha = require("svg-captcha");
const session = require("express-session");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "/bootstrap",
  express.static(__dirname + "/node_modules/bootstrap/dist")
);
app.use(
  session({
    secret: "workshop-webboard",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.render("workshop");
});

app.get("/captcha", (req, res) => {
  let captcha = svgCaptcha.create({ size: 5, noise: 3, background: "#fff" });
  req.session.captcha = captcha.text;
  res.type("svg");
  res.status(200);
  res.send(captcha.data);
});

app.all("/webboard/new-question", (req, res) => {
  if (req.method == "GET") {
    res.render("workshop-newquestion");
    return;
  }
  // ใช้ formidable เพราะมีการอัปโหลดไฟล์
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (fields.captcha != req.session.captcha) {
      res.render("workshop-newquestion", {
        msg: "You entered a character that does not match the picture",
        data: fields,
      });
      return;
    }
    // ถ้ามีไฟล์ภาพอัปโหลดขึ้นมา ต้องดำเนินกับภาพนั้นก่อน
    let upfile = files.upfile;
    let imgfile = upfile.name;
    if (imgfile != "") {
      const dir = "public/webboard-images/";
      let oldname = imgfile.split(".");
      oldname[0] = new Date().getTime();
      imgfile = oldname.join(".");
      let imgpath = dir + imgfile;

      // เปลี่ยนขนาดความกว้างของภาพ
      sharp(upfile.path)
        .resize({ width: 600, withoutEnlargement: true })
        // หากขนาดภาพเล็กกว่าอยู่แล้ว withoutEnlargement กำหนด เป็น true => ไม่ต้องเปลี่ยนขนาด
        .toFile(imgpath, (err) => {});
    }
    let data = {
      question: fields.question,
      detail: fields.detail,
      questioner: fields.questioner,
      data_posted: new Date(),
      num_answers: 0,
      img_file: imgfile,
    };
    Question.create(data, (err, doc) => {
      res.redirect("/webboard/show-all-questions");
    });
  });
});

app.get("/webboard/show-all-questions", (req, res) => {
  let q = Question.find().sort("-date_posted");
  // เอาคำถามล่าสุดขึ้นก่อน
  let options = {
    page: req.query.page || 1,
    limit: 3,
  };
  Question.paginate(q, options, (err, result) => {
    let links = [];
    if (result.page > 1) {
      // ถ้าไม่ได้อยู่หน้าแรก ให้มีลิ้งค์เลื่อนไปหน้าแรก
      links.push(`<a href = "${req.path}?page=1>Home</a>"`);
    }
    if (result.hasPrevPage) {
      links.push(
        `<a href = "${req.path}?page=${result.prevPage}">Previous page</a>`
      );
    }
    if (result.hasNextPage) {
      links.push(
        `<a href = "${req.path}?page=${result.nextPage}">Next page</a>`
      );
    }
    if (result.page < result.totalPages) {
      links.push(
        `<a href = "${req.path}?page=${result.totalPages}">Total page</a>`
      );
    }
    let pagelink = links.join(" - ");
    res.render("show-all-questions", { data: result.docs, pagelink: pagelink });
  });
});

app.listen(3000);
console.log("Server started on port : 3000");
