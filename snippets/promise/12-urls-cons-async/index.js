// here is an async / await approach to the previous task:

const urls = [
    './one.json',
    './two.json',
    './three.json',
    './four.json',
];

async function load(urls) {
    const results = [];
    let res;
    let json;
    try {
        for(let url of urls) {
            res = await fetch(url);
            json = await res.json();
            console.log(`pushing to results: ${json.name}`);
            results.push(json);
        }
    } catch(err) {
        alert(err);
        return -1;
    }

    return results;
}

load(urls).then(results => {
    console.log(results)
});