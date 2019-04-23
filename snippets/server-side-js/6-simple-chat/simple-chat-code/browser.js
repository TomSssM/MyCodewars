class PublishForm {
    constructor(form, url) {
        this.form = form;
        this.url = url;
        form.onsubmit = () => {
            this.send();
            return false;
        };
    }

    send() {
        if(this.form.message.value === '') return;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', this.url, true);
        xhr.onerror = () => {
            console.log(
                `Error occurred during send: ${xhr.status}: ${xhr.statusText}`
            );
        }
        // we don't encode the sent data but send it as is because
        // the data is likely to be small, otherwise we would use JSON or
        // encode it in some other way
        xhr.send(this.form.message.value);
        this.form.message.value = '';
    }
}

// getting messages (COMET):
class SubscribePane {
    constructor(container, url) {
        this.container = container;
        this.url = url;
        this.subscribe(this.container, this.url);
    }

    subscribe() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.url, true);
        xhr.onload = () => {
            // server might close connection on page refresh
            // without providing responseText: 
            if(!xhr.responseText) return;

            this.appendMessage(xhr.responseText);
            this.subscribe();
        };
        xhr.onerror = () => {
            console.log(`Error occured - ${xhr.status} : ${xhr.statusText}`);
            setTimeout(() => this.subscribe(), 1000);
        };
        xhr.send(null);
    }

    appendMessage(message) {
        const div = document.createElement('div');
        div.innerHTML = message;
        this.container.appendChild(div);
    }
}