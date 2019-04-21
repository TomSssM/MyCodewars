const http = require('http');
const static = require('node-static');
const file = new static.Server('.');

http.createServer(function(req, res) {
    if(req.url === '/my-first-request') {
        res.end('my-first-response');
    } else file.serve(req, res);
}).listen(8080);