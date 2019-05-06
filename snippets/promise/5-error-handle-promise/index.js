class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

function loadJson(url) {
    return fetch(url)
        .then(response => {
            if(response.status === 200) {
                return response.json();
            } else {
                throw new HttpError(response);
            }
        });
}

function demoGithubUser() {

    const name = prompt('Enter your github id:', 'TomSssM');
    document.body.style.opacity = 0.3; // (1) start the indication

    return loadJson(`https://api.github.com/users/${name}`)
        .finally(() => { // (2) stop the indication
            document.body.style.opacity = '';
            return new Promise(resolve => setTimeout(resolve, 0)); // (*)
        })
        .then(githunJSON => {
            alert(`GitHub login: ${githunJSON.login}.`);
            return githunJSON;
        })
        .catch(err => {
            if (err instanceof HttpError && err.response.status == 404) {
                // if indeed the name was inappropriate, notify the user
                // and reprompt them to enter a valid login
                alert("No such user, please reenter.");
                return demoGithubUser();
            } else {
                // otherwise rethrow
                throw err;
            }
        });
}

document.querySelector('#js-button').addEventListener('click', () => demoGithubUser());

// There’s a little browser trick (*) with returning a zero-timeout promise from finally.
// That’s because some browsers (like Chrome) need “a bit time” outside promise handlers
// to paint document changes. So it ensures that the indication is visually stopped before going
// further on the chain.

// also we can listen (and do something with) rethronw errors from promises
// via an'unhandledrejection' event:
window.addEventListener('unhandledrejection', event => {
    // the event object has two special properties:
    alert(event.promise); // [object Promise] - the promise that generated the error
    alert(event.reason); // Error: Whoops! - the unhandled error object
});

new Promise(() => {
    throw new Error("Whoops!");
}); // no catch to handle the error