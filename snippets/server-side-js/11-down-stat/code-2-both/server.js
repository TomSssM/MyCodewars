const http = require('http');
const static = require('node-static');
const file = new static.Server('.');

http.createServer(function(req, res) {
    if(req.url === '/upload') {
        let length = 0;
        req.on('data', (chunk) => {
            // don't do anything with the incoming data:
            length += chunk.length;
            console.log('data triggered');

            if (length > 50 * 1024 * 1024) {
                res.statusCode = 413;
                res.end("File too big");
            }
        }).on('end', () => {
            console.log('start end');
            // do note that for 1 second the data will be
            // received but the onload event won't be fired
            // cause server is doing stuff, that is why it is said
            // that onprogress event isn't reliable :)
            const future = Date.now() + 1000;
            while(Date.now() < future) {}
            console.log('finish end');
            res.end('ok');
        });        
    } else file.serve(req, res);
}).listen(5500);