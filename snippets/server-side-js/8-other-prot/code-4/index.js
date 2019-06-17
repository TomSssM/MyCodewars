const messages = document.querySelector('.messages');
const submitBtn = document.querySelector('#submit-btn');
const msgForm = document.querySelector('#message-form');

submitBtn.addEventListener('click', e => {
    e.preventDefault();
    const messageContent = msgForm.message.value;
    if (messageContent === '') return;
    fetch('./message', {
        method: 'POST',
        body: messageContent,
    }).then(
        res => {
            if (res.status !== 200) throw new Error('HTTP Error');
        }
    ).catch(err => {
        if (err.message === 'HTTP Error') {
            alert('Server Error');
        } else {
            alert('Check Connection');
        }
    });
});

const eventSource = new EventSource('./connect');
eventSource.onmessage = e => {
    const message = document.createElement('div');
    message.textContent = e.data;
    message.classList.add('message');
    messages.append(message);
};