// As a rule of thumb, an asynchronous action should always
// return a promise

document.querySelector('#js-button').addEventListener('click', e => {
    function loadJson(url) {
        return fetch(url)
            .then(response => response.json());
    }

    function loadGithubUser(json) {
        return fetch(`https://api.github.com/users/${json.name}`)
            .then(response => response.json());
    }

    function showImage(githubJSON) {
        return new Promise(res => {
            const img = document.createElement('img');
            img.classList.add('github-pic');
            img.src = githubJSON.avatar_url;
            img.onload = () => {
                setTimeout(() => {
                    res(img);
                }, 0);
            };
            document.body.append(img);
        });
    }

    function animateImg(img) {
        return new Promise(res => {
            img.classList.add('fade');
            img.addEventListener('transitionend', () => {
                res(img);
            });
        });
    }

    function removeImg(img) {
        return new Promise(res => {
            img.remove();
        });
    }

    loadJson('./user.json')
        .then(json => loadGithubUser(json))
        .then(githubJSON => showImage(githubJSON))
        .then(img => animateImg(img))
        .then(img => removeImg(img));
});