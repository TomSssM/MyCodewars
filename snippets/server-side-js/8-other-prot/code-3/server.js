const http = require('http');
const fileServer = new(require('node-static')).Server('.');

function accept(req, res) {
    if(req.url === '/please-post') {
        onPostReq(res);
    } else fileServer.serve(req, res);
}

let i = 0;

function onPostReq(res) {
    // here we would read the data sent by the form but let's for
    // simplicity just answer the request
    if(i > 0) {
        const data = `Hi num ${i} from the Server to the iFrame :)`;
        i++;
        res.end(data);
    }

    // we could also run scripts:
    if(i === 0) {
        i++;
        const someOtherData = "'Tom'"; // note the dbl quotes
        const script = 
        `<script>
            alert(${someOtherData});
        </script>`;
        res.end(script);
    }
}

http.createServer(accept).listen(8080);