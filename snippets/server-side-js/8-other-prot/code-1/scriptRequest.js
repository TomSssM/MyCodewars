const CallbackRegistry = {};

function scriptRequest(url, onSuccess, onError) {

  let scriptOk = false;

  const callbackName = 'cb' + String(Math.random()).slice(-5);

  // make the callback name part of url so that the server knows which callback
  // the future script should call
  url += ~url.indexOf('?') ? '&' : '?';
  url += 'callback=CallbackRegistry.' + callbackName;

  // and let's create the function itself in the registry
  CallbackRegistry[callbackName] = function(data) {
    scriptOk = true; // if this function executes then everything was ok
    delete CallbackRegistry[callbackName]; // thus we can clear the registry
    onSuccess(data);
  };

  // this function is called to check whether the callback was ever executed
  // yet make sure that it be called after the response script is executed
  function checkCallback() {
    if (scriptOk) return;
    delete CallbackRegistry[callbackName];
    onError(url);
  }

  const script = document.createElement('script');

  // unlike readyStateChange, the onload, onerror events are triggered after the
  // response script has been executed

  // DO NOTE that script.onreadystatechange will fire only in old browsers:
  //   script.onreadystatechange = function() {
  //     console.log(`log from onReadyStateChange - scriptOk: ${scriptOk}`);
  //     if(this.readyState === 'complete' || this.readyState === 'loaded') {
  //       checkCallback();
  //     }
  //   };

  script.onload = script.onerror = function() {
    console.log(`log from onload/onerror - scriptOk: ${scriptOk}`);
    checkCallback();
  };
  script.src = url;

  // and here we make a request:
  document.body.appendChild(script);
}