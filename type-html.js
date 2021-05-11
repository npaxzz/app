const http = require("http");
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    let html = `
    <html>
    <head>
        <title></title>
    </head>
    <body>
        <h1> Content-Type : "text/html" </h1>
        <p>  res.writeHead(200, { "Content-Type": "text/html" }); </p>
    </body>
    </html>
    `;
    res.write(html);
    res.end();
  })
  .listen(8000);
