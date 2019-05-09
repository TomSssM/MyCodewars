// here is an alternative approach to the previous task:

const urls = [
    './one.json',
    './two.json'
];

function load(urls) {
    const results = [];
    let chain = Promise.resolve();
    urls.forEach(url => {
        chain = chain.then(
            () => fetch(url)
        ).then(
            res => res.json()
        ).then(
            json => {
                console.log(`pushing to results: ${json.name}`);
                results.push(json);
            }
        );
    });
    chain.then(() => {
        console.log(results);
    });
    return chain.catch(alert);
}

load(urls);