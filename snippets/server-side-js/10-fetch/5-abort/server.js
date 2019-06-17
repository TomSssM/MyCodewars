const http = require('http');
const static = require('node-static');

const file = new static.Server('.');

function accept(req, res) {
    if (/.*\.json()$/.test(req.url)) {
        setTimeout(() => {
            file.serve(req, res);
        }, 3000);
    } else file.serve(req, res);
}

console.log('server listening on 8080');
http.createServer(accept).listen(8080);