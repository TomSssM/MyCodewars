const http = require('http');
const static = require('node-static');
const file = new static.Server('.');

http.createServer(function(req, res) {
    if(req.url === '/upload-file') {
        let length = 0;
        req.on('data', chunk => {
            // don't do anything with the incoming data:
            length += chunk.length;

            // if (length > 50 * 1024 * 1024) {
            //     res.statusCode = 413;
            //     res.end("File too big");
            // }
        }).on('end', () => {
            res.end('Ok');
        });        
    } else if (req.url === '/download-file') {
        // simulating a very long file:
        const respText = 'a'.repeat(99999999);

        // simulating as though the server is processing
        // the file for a long time:
        setTimeout(() => {
            res.end(respText);
        }, 3000);
    } else file.serve(req, res);
}).listen(5500);