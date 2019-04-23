const http = require('http');
const static = require('node-static');

const fileServer = new static.Server('.');
let subscribers = {};

http.createServer(function (req, res) {
    if(req.url === '/publish' && req.method === 'POST') {
        publish(req, res);
    } else if (req.url === '/subscribe') {
        subscribe(req, res);
    } else fileServer.serve(req, res);
}).listen(8080);

function subscribe(req, res) {
    const id = Math.random();
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.setHeader("Cache-Control", "no-cache, must-revalidate");
    subscribers[id] = res;
    console.log(`user ${id} logged in, user count: ${Object.keys(subscribers).length}`);

    req.on('close', function() {
        delete subscribers[id];
        console.log(`user ${id} just logged out, user count: ${Object.keys(subscribers).length}`);
    });
}

function publish(req, res) {
    let message = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        message += chunk;
    }).on('end', function() {
        res.end('OK');
        giveMessages(message);
        subscribers = {};
    });
}

function giveMessages(message) {
    for(let id in subscribers) {
        subscribers[id].end(message);
    }
}