document.querySelector('#butt').addEventListener('click', async () => {
    const res = await fetch("./getJSON");
    const reader = res.body.getReader();

    const allBytes = +res.headers.get('Content-Length');
    let bytesReceived = 0;
    const chunks = [];
    let value;
    let done;

    while (true) {
        ({done, value} = await reader.read());
        if(done) break;
        bytesReceived += value.length;
        chunks.push(value);
        log(bytesReceived);
    }

    function log(val) {
        document.querySelector('#log').innerHTML = `${val} bytes of ${allBytes}`;
        let percent = Math.floor(val / allBytes * 100);
        document.querySelector('#log-percent').innerHTML = `${percent}%`;
    }
});
document.querySelector('#butt-small').addEventListener('click', async () => {
//    we can also use reader like so:
    const res = await fetch('./lil.json');
    const reader = res.body.getReader();
    const allChunks = [];
    let bytesCount = 0;
    while (true) {
        const {done, value: chunkVal} = await reader.read();
        if(done) break;
        bytesCount += chunkVal.length;
        allChunks.push(chunkVal);
    }
    // we need to concatenate chunks into single Uint8Array
    const data = new Uint8Array(bytesCount);
    let position = 0;
    // there is no way to just join all bytes so
    // we have to do it manually
    for(let chunk of allChunks) {
        data.set(chunk, position);
        position += chunk.length;
    }
    // then we can interpret all those bytes with a TextDecoder instance method:
    const result = new TextDecoder('utf-8').decode(data);
    document.querySelector('#log-small').innerHTML = result;
});