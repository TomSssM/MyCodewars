// A server-sent event is when a web page automatically gets updates from a server.
// This was also possible before, but the web page would have to ask if any updates
// were available. With server-sent events, the updates come automatically.
// Examples: Facebook/Twitter updates, stock price updates, news feeds, sport results, etc.
// the differentce between EventSource and WebSoccet is with SSE data messages are delievred
// from server to client only and not from client to server
// That makes them an excellent choice when there's no need to send data from the client to
// the server in message form. For example, EventSource is a useful approach for handling things like 
// social media status updates, news feeds, etc.

// specify the server file that would send updates to client sometimes:
const sour = new EventSource('./server-app.php');

// thr state of connection: CONNECTIONG(0) -> OPEN(1) -> CLOSED(2)
console.log(sour.readyState);

// url of the source
console.log(sour.url);

// cross origin or not
console.log(sour.withCredentials);

sour.onopen = () => console.log('connection established');

// each time the server gets un update and sends it
// onmessage event is triggered on the EventSource object
sour.onmessage = function(e) {
  document.body.innerHTML += `<br> ${e.data}`;
};

const sourTwo = new EventSource('./server-app-bug.php');
sourTwo.onerror = (e) => console.log(`EventSource failed this time; readyState: ${e.currentTarget.readyState}`);

document.addEventListener('mousedown', function(e) {
  if(e.which === 3) {
    console.log('closing connection');
    sour.close();
  }
});

document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// if you want to assign the 'onmessage' event listener
// via addEventLsitener use the code below:

// sour.addEventListener("ping", function(e) {
//   var newElement = document.createElement("li");

//   var obj = JSON.parse(e.data);
//   newElement.innerHTML = "ping at " + obj.time;
//   eventList.appendChild(newElement);
// }, false);