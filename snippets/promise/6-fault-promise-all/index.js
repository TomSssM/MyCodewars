// We’d like to fetch multiple URLs in parallel.

// Here’s the code to do that:

// const urls = [
//   'https://api.github.com/users/iliakan',
//   'https://api.github.com/users/remy',
//   'https://api.github.com/users/jeresig'
// ];

// Promise.all(urls.map(url => fetch(url)))
//   for each response show its status
//   .then(responses => { // (*)
//     for(let response of responses) {
//       alert(`${response.url}: ${response.status}`);
//     }
//   });

// The problem is that if any of requests fails, then Promise.all rejects with the error, and we lose
// the results of all the other requests.

// That’s not good.
// Modify the code so that the array responses in the line (*) would include the response
// objects for successful fetches and error objects for failed ones.

// For instance, if one of the URLs is bad, then it should be like:

// const urls = [
//   'https://api.github.com/users/iliakan',
//   'https://api.github.com/users/remy',
//   'http://no-such-url'
// ];

// Promise.all(...) // your code to fetch URLs...
//   ...and pass fetch errors as members of the resulting array...
//   .then(responses => {
//   3 urls => 3 array members
//     alert(responses[0].status); // 200
//     alert(responses[1].status); // 200
//     alert(responses[2]); // TypeError: failed to fetch (text may vary)
//   });

// P.S. In this task you don’t have to load the full response using response.text()
// or response.json(). Just handle fetch errors the right way.

// if any of URLs fails, other results are ignored
// change that:
// make errors appear as members of the responses array, together with normal results

// The solution is actually pretty simple.

// Take a look at this:

// Promise.all(
//   fetch('https://api.github.com/users/iliakan'),
//   fetch('https://api.github.com/users/remy'),
//   fetch('http://no-such-url')
// )

// Here we have an array of fetch(...) promises that goes to Promise.all.

// We can’t change the way Promise.all works: if any promise rejects with an error,
// then Promise.all as a whole rejects with it. So we need to prevent any error from
// occurring. Instead, if a fetch error happens, we need to treat it as a “normal” result.

// Here’s how:

// Promise.all(
//   fetch('https://api.github.com/users/iliakan').catch(err => err),
//   fetch('https://api.github.com/users/remy').catch(err => err),
//   fetch('http://no-such-url').catch(err => err)
// )

// In other words, the .catch takes an error for all of the promises and returns it
// normally. By the rules of how promises work, if a .then/catch handler returns a value
// (doesn’t matter if it’s an error object or something else), then the execution continues
// the “normal” flow.

const urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'http://no-such-url'
];

Promise.all(
    urls.map(
        url => fetch(url).catch(err => err)
    )
).then(responses => {
    alert(responses[0].status); // 200
    alert(responses[1].status); // 200
    alert(responses[2]); // TypeError: failed to fetch (text may vary)
});