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
        function readTheBook() {
            readFile(path.join(__dirname, 'book.json'), 'utf-8', (err, file) => {
                if(err) {
                    console.log(err);
                    return;
                }
                times++;
                curr += file;
                if(times === 70) {
                    res.end(curr);
                } else readTheBook();
            });
        }
        readTheBook();
    } else file.serve(req, res);
}

http.createServer(accept).listen(8080);
