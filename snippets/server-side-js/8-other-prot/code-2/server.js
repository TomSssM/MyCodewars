const http = require('http');
const fileServer = new(require('node-static')).Server('.');

function onDigits(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache'
    });

    let i = 0;

    let timer = setInterval(write, 1000);
    write();

    function write() {
        i++;

        if (i === 4) {
            res.write('event: bye\ndata: See ya!!!\n\n');
            clearInterval(timer);
            res.end();
            return;
        }

        res.write('data: ' + i + '\n\n');

    }
}

function accept(req, res) {
    if (req.url == '/digits') {
        onDigits(req, res);
        return;
    }
    fileServer.serve(req, res);
}

http.createServer(accept).listen(8080);