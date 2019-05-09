// write a helper function which loads an array of urls one after another
// unlike Promise.all, which would start loading all of them, all at the same time

const urls = [
    './one.json',
    './two.json'
];

function load(urls) {
    function loadURL(i) {
        if(urls[i] === undefined) return;
        return fetch(urls[i])
            .then(res => res.json())
            .then(json => {
                alert(json.name);
                return loadURL(i + 1);
            })
            .catch(alert);
    }
    return loadURL(0);
}

load(urls);