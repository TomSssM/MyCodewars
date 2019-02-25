let cache = 0;
onconnect = function(e) {
  // the connect event fires whenever either
  // onmessage event is set up or we call the start() method
  const port = e.ports[0];
  
  // start() not needed cause of the
  // onmessage property being used instead of
  // addEventListener('message', ...)
  // which automatically opens a port
  port.onmessage = function(e) {
    cache++;
    const res = e.data[0] * e.data[1];
    port.postMessage(`${res} Cache ${cache}`);
  };
};