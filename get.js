const app = require("express")();
const path = require("path");

function render(res, File) {
  res.status(200);
  res.type("text/html");
  res.sendFile(path.join(__dirname, File));
}

app.get("/", (req, res) => {
  render(res, "Mountain/mountain.html");
});

app.get("/Japanese", (req, res) => {
  render(res, "Mountain/Japanese.html");
});

app.get("/Paris", (req, res) => {
  render(res, "Mountain/Paris.html");
});

app.get("/Switzerland", (req, res) => {
  render(res, "Mountain/Switzerland.html");
});

app.use((req, res) => {
  res.status(200);
  res.type("text/html");
  res.send("404 Not Found");
});

app.listen(3000, () => console.log("Server started on port : 3000"));
