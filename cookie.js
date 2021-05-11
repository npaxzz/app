const express = require("express");
const cookie = require("cookie-parser");
const app = express();

app.use(cookie());

app.get("/", (req, res) => {
  res.type("html"); //'text/html'  //using the express.serveStatic.mime.lookup() method.
  res.send(`
    <a href= "/setcookie" >Set Cookie </a> <br>
    <a href= "/getcookie" >Get Cookie </a> <br>
    <a href= "/clearcookie" >Clear Cookie </a> <br>
    `);
});

app.get("/setcookie", (req, res) => {
  res.type("html");
  let time = 5 * 60 * 1000;
  res.cookie("name", "Paint N.", { maxAge: time }); //res.cookie(ชื่อคุกกี้,ค่าของคุกกี้)
  res.cookie("email", "np@axz.com", { maxAge: time });
  res.cookie("year_born", "2004", { maxAge: time });
  res.send(`
  <h4>Cookie Set</h4>
  <a href="/">Back</a>
  `);
});

app.get("/getcookie", (req, res) => {
  res.type("html");
  let y = new Date().getFullYear();
  let yb = parseInt(req.cookies.year_born || y);
  res.send(`
    name - ${req.cookies.name || ""} <br>
    email - ${req.cookies.email || ""} <br>
    age - ${y - yb} <br><br>
    <a href="/">Back</a>
    `);
});

app.get("/clearcookie", (req, res) => {
  res.type("html");
  res.clearCookie("name");
  res.clearCookie("email");
  res.clearCookie("year_born");
  res.send(`
    <h4>Cookie Cleared<h4>
    <a href="/">Back</a>
    `);
});

app.listen(3000);
console.log("Server started on port : 3000");
