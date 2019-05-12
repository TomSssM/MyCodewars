const form = document.querySelector('#ourForm');
document.querySelector('#js-submit').addEventListener('click', async e => {
    e.preventDefault();
    const res = await fetch('./post-this-message', {
        method: 'POST',
        body: new FormData(form)
    });
    alert(`response message: ${await res.text()}`);
});