// here are a few advantages in using finally:
// when we need a cleanup

// 1
function f1() {
  try {
    alert('start');
    return 'finished';
  } catch {
    alert('we may have some errors');
  }
  finally {
    alert('clean-up');
  }
}
f1(); // cleanup was done

// the following function doesn't use finally and thus the cleanup is never done:
function no1() {
  try {
    alert('start');
    return 'finished';
  } catch {
    alert('we may have some errors');
  }
  alert('clean-up');
}

no1(); // clean up is never done because of return

// 2
// later on we are going to be using rethrowing
// in this case the clean-up stuff is also only going
// to be done if it is inside finally:

function f2() {
  try {
    alert('start');
    throw new Error('some weird error');
  } catch(e) {
    if('can\'t handle the error') throw e;
  } finally {
    alert('clean up');
  }
}

f2(); // clean up is done because of finally even if we rethrow

function no2() {
  try {
    alert('start');
    throw new Error('unknown error too...');
  } catch(e) {
    if('obviously need to rethrow') throw e;
  }
  alert('clean up');
}

no2(); // clean up isn't done

// *now let's inherit from errors!

// *before we begin here is a lil note on what the usual error constructor does:
// class Error {
//   constructor(message) {
//     this.message = message;
//     this.name = "Error"; // (different names for different built-in error classes)
//     this.stack = <nested calls>; // non-standard, but most environments support it
//   }
// }

// *here is the workflow in a nutshell:
// 1) we inherit from general Error and add new properties to
//    instances of our own errors specific to them
// 2) in try we make sure that something went wrong and throw
//    custom (extending) errors
// 3) in catch blocks we see if the coming error is an instance of
//    our custom error: if it is we handle it, otherwise rethrow it
//    and handle it in the global try block instead

// inheriting:

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super(`no property: ${property}`);
    this.name = 'PropertyRequiredError';
    this.property = property;
  }
}

class PropertyRangeError extends ValidationError {
  constructor(val, overflow = false) {
    if(overflow) {
      super(`value too big: ${val}`)
    } else {
      super(`value too small: ${val}`);
    }
    this.name = 'PropertyRangeError';
    this.value = val;
  }
}

// applying:

function readJSON(json) {
  const user = JSON.parse(json);
  if(!user.age) throw new PropertyRequiredError('age');
  if(!user.name) throw new PropertyRequiredError('name');
  if(user.age >= 20) throw new PropertyRangeError(user.age, true);
  if(user.age <= 10) throw new PropertyRangeError(user.age);
  alert('success!');
  return user;
}

// usage:
// (uncomment and try every use case)

try {
  try {
    // readJSON('{ "age": 25 }'); // no name property
    // readJSON('{ "name": "Tom", "age": 7 }'); // age underflow
    // readJSON('{ sdfdsfsdfsdf }'); // insane input
    // readJSON('{ "name": "Tom", "age": 12 }'); // success!
  } catch(e) {
    // making sure it is our own custom error:
    if(e instanceof PropertyRequiredError) {
      alert(`Please enter ${e.property}`);
    } else if(e instanceof PropertyRangeError) {
      alert(`Age ${e.message}`);
    } else {
      // some unknown error let's rethrow it:
      throw e;
    }
  }
} catch(e) {
  alert('we are sorry some unknown error happened');
  console.error(e);
}

// *adding some superpowers:

// we could avoid having to reassign the inheriting error's name like so:
class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class CoolerPropReqErr extends MyError {
  constructor(property) {
    super(`no property: ${property}`);
    this.property = property;
  }
}

try {
  const user = JSON.parse('{}');
  if(!user.name) throw new CoolerPropReqErr('name');
} catch(e) {
  if(e instanceof CoolerPropReqErr) {
    alert(`Required property ${e.property} hasn't been entered`);
  }
}

// wrapping exceptions
// imagine we have many custom errors like so:
class SomeErrorOne extends MyError {
  constructor(message) {
    super(message);
    this.order = 'one';
  }
}

class SomeErrorTwo extends MyError {
  constructor(message) {
    super(message);
    this.order = 'two';
  }
}

class SomeErrorThree extends MyError {
  constructor(message) {
    super(message);
    this.order = 'three';
  }
}

try {
  const user = JSON.parse('{ "order": 2 }');
  if(user.order !== null) {
    if(user.order === 1) throw new SomeErrorOne('One thing');
    if(user.order === 2) throw new SomeErrorTwo('Two all');
    if(user.order === 3) throw new SomeErrorTwo('This is Patrick!');
  }
} catch(e) {
  // while it is ok to have many checks above just take a look
  // at how much we have to do to verify that it is our custom errors
  // that are being thrown (let's forget about the check via instanceof MyError
  // for a while)
  if(e instanceof SomeErrorOne) {
    alert('it\'s one');
  } else if(e instanceof SomeErrorTwo) {
    alert('it\'s two');
  } else if(e instanceof SomeErrorThree) {
    alert('it\'s Patrick again');
  }
}

// that is pretty tedious plus even if we do check that it is
// our own error via instanceof MyError how do we know which one
// of the three it is exactly without doing all those checks?
// so there is a better approach

class ReadError extends MyError {
  constructor(message, err) {
    super(message);
    this.cause = err;
  }
}

// here is the same implementation except using
// ReadError and a better catch block without the many checks but
// providing the same result

function someFun(json) {
  const user = JSON.parse(json);
  if(user.order !== null) {
    if(user.order === 1) throw new SomeErrorOne('One thing');
    if(user.order === 2) throw new SomeErrorTwo('Two all');
    if(user.order === 3) throw new SomeErrorTwo('This is Patrick!');
  }
  alert('success!');
  return user;
}

try {
  try {
    someFun('{ "order": 2 }');
    // someFun();
  } catch(e) {
    if(e instanceof MyError && !(e instanceof ReadError)) { 
      throw new ReadError('our custom error', e);
    } else {
      throw e;
    }
  }
} catch(e) {
  if(e instanceof ReadError) {
    alert(`error: ${e.cause}`);
  } else alert('unknown error');
}

// here is a better and less examply example from the tutorial:
// VERY IMPORTANT NOTE HERE:
// we should inherit from the more general ValidationError class
// to make things easier in line below marked as (*)

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
  }

  try {
    validateUser(user);
  } catch (err) {
    // (*) here
    // because there may well be many species of
    // the validation error type
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
    alert(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    alert("Original error: " + e.cause);
  } else {
    throw e;
  }
}