// addScript ought to load a script located at src
// and once it loaded invoke the function callback
const addScript = function(src, callback) {
  const script = document.createElement('script');
  // since there may be no head in the document we
  // should append the script to the parent of the
  // one element we know for sure exists
  document.querySelector('script').parentElement.append(script);
  script.src = src;
  script.onload = function() {
    callback();
  };
};

addScript("./external-scripts/go.js", function() {
  go();
});

// the same here except with multiple scripts
const addScripts = function(scriptsArr, callback) {
  let scriptsLoaded = 0;
  const length = scriptsArr.length;
  const appender = document.querySelector('script').parentElement;
  scriptsArr.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    appender.append(script);
    script.onload = function() {
      scriptsLoaded++;
      if(scriptsLoaded === length) callback();
    };
  });
};

addScripts(["./external-scripts/a.js", "./external-scripts/b.js", "./external-scripts/c.js"], function() {
  a()
});

// here is a polyfill to handle IE8- as there is no onload event
// also you should probably comment out this lil explanation for
// the examples above to work proeprly :)

let loaded = false;
const onload = function() {
  if(!loaded) {
    loaded = true;
    // do something
  }
};

someElement.onload = onload;

// naturally the someElement.onload function
// isn't going to be triggered so we should invoke
// it already simply as a method of the someElement object
// in the readystatechange event (which exists only in IE8- it would seem)

someElement.onreadystatechange = function() {
  if(this.readyState === 'complete' || this.readyState === 'loaded') {
    // since this way there may be multiple invokations
    // cause if we are loading a script that hasn't been cached
    // its readyState is going to be loading -> loaded -> complete
    // the onload function uses the laoded variable 
    // to be triggered only once and that is it

    setTimeout(this.onload, 0);
  }
};