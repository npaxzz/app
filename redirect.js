const app = require("express")();

app.get("/", (req, res) => {
  let r = Math.random();
  if (r >= 0.5) {
    res.redirect("/Show-value/" + r);
  } else {
    res.redirect("/error");
  }
});

app.get("/Show-value/:v", (req, res) => {
  res.send(`Value: ${req.params.v}`);
});

app.get("/error", (req, res) => {
  res.send(`Error value < 0.5`);
});

app.listen(3000);
console.log("Server started on port : 3000");
