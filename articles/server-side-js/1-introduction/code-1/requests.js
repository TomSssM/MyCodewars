const xhr = new XMLHttpRequest();
xhr.open('GET', 'my-first-request', true);
xhr.onreadystatechange = function() {
    if(this.readyState !== 4) return;
    if(this.status !== 200) {
        console.log(`error - ${this.status}: ${this.statusText}`);
        return;
    }
    alert(this.responseText);
};
xhr.send(null);