const http = require('http');
const static = require('node-static');
const file = new static.Server('.', {
  cache: 0
});


function accept(req, res) {
  if (req.url == '/phones.json') {
    // artificial delay
    setTimeout(() => {
      file.serve(req, res);
    }, 2000);
  } else {
    file.serve(req, res);
  }

}

http.createServer(accept).listen(8080);