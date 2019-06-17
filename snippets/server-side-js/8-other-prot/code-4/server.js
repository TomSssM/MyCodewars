const http = require('http');

const fileServer = new(require('node-static')).Server('.');

const users = [];

function accept(req, res) {
    if (req.url === '/connect') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream; charset=utf-8',
            'Cache-Control': 'no-cache'
        });
        users.push(res);
    } else if (req.url === '/message') {
        let message = '';
        req.on('data', chunk => {
            message += chunk;
        }).on('end', () => {
            res.end('OK');
            postMessage(message);
        });
    } else fileServer.serve(req, res);
}

function postMessage(message) {
    users.forEach(res => {
        res.write(`data: ${message}\n\n`);
    });
}

console.log('server running on 8080');

http.createServer(accept).listen(8080);