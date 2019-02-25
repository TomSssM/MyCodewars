const val = document.querySelector('#val');
const res = document.querySelector('#res');

if(!!window.SharedWorker) {
  const myWorker = new SharedWorker('shared.js');

  val.onchange = function() {
    myWorker.port.postMessage([this.value, this.value]);
    console.log('Message posted to a Shared Worker');
  };

  myWorker.port.onmessage = function(e) {
    res.textContent = e.data;
    console.log('Message received from a Shared Worker');
    console.log(e.lastEventId);
  };
}