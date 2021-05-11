const http = require("http");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    for (s in http.STATUS_CODES) {
      res.write(` ${s} : ${http.STATUS_CODES[s]} <br>`);
    }
    res.end();
  })
  .listen(8000);

//   node --print "http.STATUS_CODES"
