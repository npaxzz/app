const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("Mountain")); //ตั้งค่าโฟลเดอร์สำหรับเก็บ static File (public)

app.use((req, res) => {
  res.status(200);
  res.type("text/html");

  let File1 = path.join(__dirname, "Mountain/mountain.html");
  let File2 = path.resolve(__dirname, "Mountain/Paris.html");

  res.sendFile(File1);
  //   res.sendFile(File2);
  //   res.sendFile(path.join(__dirname, "Mountain/Japanese.html"));
  //   res.sendFile(path.resolve(__dirname, "Mountain/Switzerland.html"));
});

app.listen(3000);
console.log("Server started on port : 3000");
