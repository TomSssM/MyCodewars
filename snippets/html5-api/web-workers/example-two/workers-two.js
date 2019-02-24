// inside the worker the worker itself
// is the global object
onmessage = function(e) {
  // in here only console is accessbile but not window
  console.log('message received from main script');

  console.log('posting message back to script');
  postMessage(`I received ${e.data[0]}, ${e.data[1]} and ${e.data[2]}`);
};