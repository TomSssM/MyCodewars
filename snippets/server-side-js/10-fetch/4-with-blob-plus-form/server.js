const http = require('http');
const static = require('node-static');

const file = new static.Server('.');

function accept(req, res) {
    if (req.url === '/post-this-message') {
        // DATABASE Stuff
        res.end('Successfully Posted Blob');
        return;
    }

    file.serve(req, res);
}

console.log('server listening on 8080');
http.createServer(accept).listen(8080);