// rewrite the following code using async / await
// function loadJson(url) {
//     return fetch(url)
//       .then(response => {
//         if (response.status == 200) {
//           return response.json();
//         } else {
//           throw new Error(response.status);
//         }
//       })
//   }

//   loadJson('no-such-user.json') // (3)
//     .catch(alert); // Error: 404

async function loadJson(url) {
    const res = await fetch(url);
    if(res.status !== 200) throw new Error(res.status);
    // instead of doing this:
    // const json = await res.json();
    // return json;
    // we can simply return a Promise:
    return res.json();
}
const loremIpsim = loadJson('https://baconipsum.com/api/?type=meat-and-filler')
    .then(json => alert(json[0]))
    .catch(alert);
const weird = loadJson('no-such-url')
    .then(() => { /* ignored here :) */ })
    .catch(alert);