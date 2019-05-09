// Rewrite it using async/await instead of .then/catch:
// And get rid of the recursion in favour of a loop in demoGithubUser: with async/await
// that becomes easy to do. Rewrite this code:

//   function loadJson(url) {
//     return fetch(url)
//       .then(response => {
//         if (response.status == 200) {
//           return response.json();
//         } else {
//           throw new HttpError(response);
//         }
//       })
//   }

// Ask for a user name until github returns a valid user
//   function demoGithubUser() {
//     let name = prompt("Enter a name?", "iliakan");

//     return loadJson(`https://api.github.com/users/${name}`)
//       .then(user => {
//         alert(`Full name: ${user.name}.`);
//         return user;
//       })
//       .catch(err => {
//         if (err instanceof HttpError && err.response.status == 404) {
//           alert("No such user, please reenter.");
//           return demoGithubUser();
//         } else {
//           throw err;
//         }
//       });
//   }

//   demoGithubUser();

class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

async function loadJson(url) {
    const res = await fetch(url);
    if(res.status !== 200) throw new HttpError(res);
    return res;
}

async function demoGithubUser() {
    let name;
    let res;

    while(true) {
        try {
            name = prompt('Enter a GitHub ID', 'TomSssM');
            res = await loadJson(`https://api.github.com/users/${name}`);
            break;
        } catch (err) {
            if(err instanceof HttpError) {
                alert('Please reenter!');
            } else throw err;
        }
    }

    const githubJson = await res.json();

    alert(`Your public repos count is ${githubJson.public_repos}`);
}

demoGithubUser();