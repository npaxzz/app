const fs = require("fs");
const http = require("http");

http
  .createServer(function (req, res) {
    let url = req.url;
    url = url.endsWith("/") ? url : url + "/";
    let filename = "Mountain/";
    switch (url) {
      case "/":
        filename += "mountain.html";
        break;
      case "/Japanese/":
        filename += "Japanese.html";
        break;
      case "/Paris/":
        filename += "Paris.html";
        break;
      case "/Switzerland/":
        filename += "Switzerland.html";
        break;
    }

    fs.readFile(filename, (error, content) => {
      if (!error) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(content);
      } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(error.message);
      }
      return res.end();
    });
  })
  .listen(8000);
