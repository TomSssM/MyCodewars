var http = require('http');
var static = require('node-static');
var file = new static.Server('.');

function accept(req, res) {
  if (req.url == '/time-me-out') {
    setTimeout(() => {
        res.end('I\'m a little late :)');
    }, 10000);
  } else {
    file.serve(req, res);
  }
}

http.createServer(accept).listen(8080);