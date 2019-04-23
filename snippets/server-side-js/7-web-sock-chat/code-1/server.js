const http = require('http');
const Static = require('node-static');
const WebSocketServer = new require('ws');

const clients = {};
const webSocketServer = new WebSocketServer.Server({
    port: 8081
});

webSocketServer.on('connection', function (ws) {
    const id = Math.random();
    clients[id] = ws;
    console.log("new connection detected " + id);

    ws.on('message', function (message) {
        console.log('received a message ' + message);

        for (let key in clients) {
            clients[key].send(message);
        }
    });

    ws.on('close', function () {
        console.log('connection closed ' + id);
        delete clients[id];
    });

});


// we are still going to need HTTP server to serve html
const fileServer = new Static.Server('.');
http.createServer(function (req, res) {
    fileServer.serve(req, res);
}).listen(8080);

console.log("servers running on ports: 8080, 8081");