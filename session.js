const express = require("express");
const session = require("express-session");
const app = express();

app.use(
  session({
    secret: "hi",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.type("html");
  res.send(`
 <a href="/add_session">Add Session</a> <br>
 <a href="/read_session">Read Session</a> <br>
 <a href="/delete_session">Delete Session</a> <br>
 `);
});

app.get("/add_session", (req, res) => {
  let session = req.session;
  session.host = session.host || req.hostname;
  session.cart = session.cart || [];
  let r = Math.floor(Math.random() * 100);
  session.cart.push(r);
  session.cookie.maxAge = 3 * 60 * 1000;
  res.type("html");
  res.send(`
    <h4>Session Added</h4>
    <a href="/">Back</a>
    `);
});

app.get("/read_session", (req, res) => {
  let session = req.session;
  session.cart = session.cart || [];
  res.send(`
    session id : ${req.sessionID} <br>
    host name : ${session.host || ""} <br>
    number in cart : ${session.cart.join(",")} 
    <br><br>
    <a href="/">Back</a>
    `);
});

app.get("/delete_session", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.type("html");
  res.send(`
    <h4>Session destroyed<h4>
    <a href="/">Back</a>
    `);
});

app.listen(3000);
console.log("Server started on port : 3000");
