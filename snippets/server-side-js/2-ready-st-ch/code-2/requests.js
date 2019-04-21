const xhr = new XMLHttpRequest();
xhr.timeout = 2000;
xhr.open('GET', 'time-me-out', true);
xhr.onreadystatechange = function() {
    if(this.state === 4 && this.status === 200) {
        alert('request arrived');
    }
};
xhr.ontimeout = () => alert('we timed out :)');
xhr.send(null);