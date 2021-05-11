const fs = require("fs");
const http = require("http");

http
  .createServer(function (req, res) {
    fs.readFile("Mountain/mountain.html", (error, content) => {
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
