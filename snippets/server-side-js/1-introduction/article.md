# Introduction
In some of the following examples we are going to use our own Node.js server. As you know
in its basic form it is going to look like something like this:
```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
    const pathToHtmlFile = path.join(__dirname, 'index.html');
    fs.readFile(pathToHtmlFile, (err, file) => {
        if(err) {
            console.log(err);
            return;
        }
        response.end(file);
    });
});

server.listen(8080, () => console.log('listening on 8080'));
```
However in order to enable it to give different files for different `request.url`s
we need to write big else if statements.
If our HTML:
```html
<body>
    <h1>Hello Server 2</h1>
    <script src="./requests.js"></script>
</body>
```
requests only 1 file `requests.js` there are already many of them:
```javascript
=> {
    if(request.url === '/') {
        const pathToHtmlFile = path.join(__dirname, 'index.html');
        fs.readFile(pathToHtmlFile, (err, file) => {
            if(err) {
                console.log(err);
                return;
            }
            response.end(file);
        });
        return;
    }

    if(request.url === '/requests.js') {
        const pathToJS = path.join(__dirname, 'requests.js');
        fs.readFile(pathToJS, (err, file) => {
            if(err) {
                console.log(err);
                return;
            }
            response.end(file);
        });
        return;
    }
}
```
Thus instead we are going to be using an `npm` package called `static-node`. 
It looks something like this:
```javascript
const static = require('node-static');
const file = new static.Server('.');

http.createServer(function(req, res) {
  file.serve(req, res);
}).listen(8080);
```
`file.serve` will serve the necessary file if the `req.url` asks for it and if that file
exists on the server. And after that we should be able to handle specific requests like so:
```
|                                                |   http.createServer(function(req, res) {
|   xhr.open('GET', 'my-first-request', true);   |       if(request.url === '/my-first-request') {
|   ...                                         ---->        response.end('my first response');
|                                                |       } else file.serve(req, res);
|                                                |   }).listen(8080);
```
The entire code is [here](./code-1) ( P.S. You need to run npm install + npm start ).