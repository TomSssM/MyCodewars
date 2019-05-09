const http = require('http');
const static = require('node-static');

const fileServer = new static.Server('.');

function accept(req, res) {
    // artificial delay for all .JSON files:
    if(/.+.json$/.test(req.url)) {
        setTimeout(() => {
            fileServer.serve(req, res);
        }, 1000);
    } else fileServer.serve(req, res);
}

http.createServer(accept).listen(8080);