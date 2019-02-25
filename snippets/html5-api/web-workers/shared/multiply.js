const first = document.querySelector('#first');
const second = document.querySelector('#second');
const result = document.querySelector('#result');

// the previous workers we were using are
// called Dedicated Workers, their difference
// from Shared Workers is that two or more different
// HTML pages can use the same Shared Worker but not
// however I am not sure why the sme example works with a
// dedicated worker too so I guess the one major difference is
// that Shared Workers (when called from different files)
// share the same scope (cache variable is a good exampel of that)
// if you were to use a Dedicated Worker, then as soon as you go to
// the other page the variable 'cache' would be initizlized anew again

if(!!window.SharedWorker) {
  const myWorker = new SharedWorker('shared.js');

  second.onchange = first.onchange = function() {
    // with Shared Workers you need to explicitly open a port to
    // let it communicate with the main script; why explicitly?
    // because the same port is opened automatically (implictly)
    // in the cas of a Dedicated Worker

    myWorker.port.postMessage([first.value, second.value]);
    console.log('Message posted to a Shared Worker');
  };

  // the same port stuff on receiving the mesage from a worker
  // (message event needs to be handler through the port object)
  // also I am not sure about the exact implementation but we would
  // need to additioanlly call the start() method to open a port
  // if we were assigning the onmessage event listener via
  // addEventListener (one start() for each event 'message' listener assigned
  // via addEventListener)

  myWorker.port.onmessage = function(e) {
    result.textContent = e.data;
    console.log('Message received from a Shared Worker');
  };
}