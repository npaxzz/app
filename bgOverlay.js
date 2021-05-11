const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/axios", express.static(__dirname + "/node_modules/axios/dist"));

app.get("/", (req, res) => {
  res.redirect("bgoverlay");
});

app.all("/bgoverlay", async (req, res) => {
  if (!req.body.test) {
    res.render("bgoverlay");
  } else {
    let delay = (time) => {
      return new Promise((resolve, rejact) => {
        setTimeout(() => resolve(), time);
      });
    };
    await delay(2000);
    res.send({});
  }
});

app.listen(3000);
console.log("Server started on port : 3000");
