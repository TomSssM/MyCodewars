const http = require('http');
const static = require('node-static');
const file = new static.Server('.');

http.createServer(function(req, res) {
    if(req.url === '/file.json') {
        console.log(
            req.headers
        );
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500');
        const json = JSON.stringify(require('./file.json'));
        res.end(json);
        
    } else file.serve(req, res);
}).listen(5500);