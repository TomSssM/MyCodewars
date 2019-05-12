const http = require('http');
const {readFile} = require('fs');
const path = require('path');
const static = require('node-static');
const file = new static.Server('.');

function accept(req, res) {
    if (req.url === '/getJSON') {
        // simulating a very long file:
        let curr ='';
        let times = 0;
        function readTheGoldBug() {
            readFile(path.join(__dirname, 'theGoldBug.json'), 'utf-8', (err, file) => {
                if(err) {
                    console.log(err);
                    return;
                }
                times++;
                curr += file;
                if(times === 70) {
                    res.end(curr);
                } else readTheGoldBug();
            });
        }
        readTheGoldBug();
    } else file.serve(req, res);
}

http.createServer(accept).listen(8080);