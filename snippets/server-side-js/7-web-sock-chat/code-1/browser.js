if (!window.WebSocket) {
	document.body.innerHTML = 'WebSocket isn\'t supported in this browser';
}

// making a connection
const socket = new WebSocket("ws://localhost:8081");

document.forms.publish.onsubmit = function() {
    const outgoingMessage = this.message.value;

    socket.send(outgoingMessage);
    return false;
};

socket.onmessage = function(event) {
    const incomingMessage = event.data;
    showMessage(incomingMessage); 
};

function showMessage(message) {
    const messageElem = document.createElement('div');
    messageElem.appendChild(document.createTextNode(message));
    document.getElementById('subscribe').appendChild(messageElem);
}
