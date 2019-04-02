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
// In testing, a spy function is one that keeps track of various metadata regarding its invocations. 
// Some examples of properties that a spy might track include:
// Whether it was invoked
// How many times it was invoked
// What arguments it was called with
// What contexts it was called in
// What values it returned
// Whether it threw an error

// For this kata, implement a spyOn function which takes any function func 
// as a parameter and returns a spy for func. The returned spy must be callable in the 
// same manner as the original func, and include the following additional properties/methods:

// .callCount() — returns the number of times spy has been called
// .wasCalledWith(val) – returns true if spy was ever called with val, else returns false.
// .returned(val) — returns true if spy ever returned val, else returns false

const adder = (n1,n2) => n1 + n2;
const adderSpy = spyOn(adder);

function spyOn(func) {
    let callCount = 0;
    const calledWith = [];
    const returnedVals = [];
    const spiedFunc = function(...args) {
        const result = func(...args);
        callCount++;
        calledWith.push(...args);
        returnedVals.push(result);
        return result;
    };
    spiedFunc.wasCalledWith = (arg) => calledWith.includes(arg);
    spiedFunc.returned = (arg) => returnedVals.includes(arg);
    spiedFunc.callCount = () => callCount;
    return spiedFunc;
}

console.log(adderSpy(2, 4)); // returns 6
console.log(adderSpy(3, 5)); // returns 8

console.log(adderSpy.callCount()); // returns 2
console.log(adderSpy.wasCalledWith(4)); // true
console.log(adderSpy.wasCalledWith(0)); // false
console.log(adderSpy.returned(8)); // true
console.log(adderSpy.returned(0)); // false

// Task 33