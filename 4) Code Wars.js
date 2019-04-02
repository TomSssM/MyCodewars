// Task 31
// There's no such thing as private properties on a coffeescript object! 
// But, maybe there is?

// Implement a function createSecretHolder(secret) which accepts any value as 
// secret and returns an object with ONLY two methods:
//   getSecret() which returns the secret
//   setSecret() which sets the secret

// obj = createSecretHolder(5)
// obj.getSecret() # returns 5
// obj.setSecret(2)
// obj.getSecret() # returns 2

function createSecretHolder(secret) {
  const obj = {};
  let secretProp = secret;
  obj.getSecret = () => secretProp;
  obj.setSecret = function(newSecret) {
    secretProp = newSecret;
  };
  return obj;
}

const obj = createSecretHolder(5);
console.log(obj.getSecret()); // 5
console.log(obj.setSecret(2));
console.log(obj.getSecret()); // 2

// Task 32