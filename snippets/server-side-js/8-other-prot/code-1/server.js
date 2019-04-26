const http = require('http');
const url = require('url');
const static = require('node-static');

const file = new static.Server('.', {
  cache: 0
});

function accept(req, res) {
  const urlParsed = url.parse(req.url, true);

  if (urlParsed.pathname == '/user') {
    const id = urlParsed.query.id;
    const callback = urlParsed.query.callback;

    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');

    const user = {
      name: "Tom",
      age: 18,
      id,
    };

    res.end('console.log("log from the script itself");' + callback + '(' + JSON.stringify(user) + ');');

  } else {
    file.serve(req, res);
  }
}

http.createServer(accept).listen(8080);