// Improve the solution of the previous task Fault-tolerant Promise.all.
// Now we need not just to call fetch, but to load the JSON objects from the given URLs.

// Here’s the example code to do that:

// const urls = [
//   'https://api.github.com/users/iliakan',
//   'https://api.github.com/users/remy',
//   'https://api.github.com/users/jeresig'
// ];

// make fetch requests
// Promise.all(urls.map(url => fetch(url)))
  // map each response to response.json()
//   .then(responses => Promise.all(
//     responses.map(r => r.json())
//   ))
  // show name of each user
//   .then(users => {  // (*)
//     for(let user of users) {
//       alert(user.name);
//     }
//   });

// The problem is that if any of requests fails, then Promise.all rejects with
// the error, and we lose results of all the other requests. So the code above
// is not fault-tolerant, just like the one in the previous task.

// Modify the code so that the array in the line (*) would include parsed JSON for
// successful requests and error for errored ones.

// Please note that the error may occur both in fetch (if the network request fails) and
// in response.json() (if the response is invalid JSON). In both cases the error should
// become a member of the results object.

const urls = [
    'https://api.github.com/users/TomSssM',

    // this URL is HTML page, it's invalid JSON, so response.json() fails
    '/',

    // this URL is invalid, so fetch fails
    'http://no-such-url'
];
Promise.all(
    urls.map(
        url => fetch(url).catch(err => err)
    )
).then(responses => Promise.all(
    responses.map(r => {
        if(r instanceof Error) return r;
        return r.json().catch(err => err);
    })
)).then(results => {
    alert(results[0].name); // Ilya Kantor
    alert(results[1]); // SyntaxError: Unexpected token < in JSON at position 0
    alert(results[2]); // TypeError: failed to fetch (text may vary)
});