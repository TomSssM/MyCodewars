// all this stuff in the file is called spec, which describes
// and tests what some function or something should do or have etc.

// let's test isPrime from ./code-to-test.js

// we group workers (the 'it' blocks) inside the 'describe' blocks:
describe('one function (operation that a function should do etc.)', function() {
  it('particular use case number one', function() {
    // ... this one passes no errors detected
  });

  it('faulty test', function() {
    // the it block says that a particular test doesn't pass if anything
    // inside that it block throws an error
    throw new Error('tar-tar sauce');

    // note: if we were using Chai, instead of Error: we would
    // get AssertionError: and we would have the error message
    // we had written into assert instead of 'tar-tar sauce', which
    // we wrote into an Error constructor
  });
});

describe('we can nest describes', function() {
  describe('level1 one', function() {
    describe('level2', function() {
      it('level2 it', () => ':)');
      describe('level3', function() {
        describe('and so on', function() {
          it('very deep it', function() {
            console.assert('0' == '12');
          });
        });
      });
    });
  });

  describe('level 1 two', function() {
    it('level1 it', () => ':)');
  });

  it('it \'s ok', function() {
    return false;
  });
});

describe('making tests (it) thru a loop', function() {
  function isPrimeThatWorks(num) {
    if(num <= 1) return false;
    for(let i = 2; i <= Math.sqrt(num); i++) {
      if(num % i === 0) return false;
    }
    return true;
  }

  function makeTest(num) {
    const correctRes = isPrimeThatWorks(num);
    it((num + ' ' + (correctRes ? ' is primary' : 'is not primary')), function() {
      if(isPrime(num) !== isPrimeThatWorks(num)) throw new Error('doesn\'t work!!');
    });
  }

  for(let i = 0; i <= 10; i++) makeTest(i);
});

describe('using after/afterEach etc.', function() {
  // the before/after functions are executed before/after all 'it' tests
  // the beforeEach/afterEach tests are executed before/after every 'it' test

  before(function() {
    console.log('I run in the very beginning');
  });

  after(function() {
    console.log('I run last');
  });

  beforeEach(function() {
    console.log('I run before every test');
  });

  afterEach(function() {
    console.log('I run after every test');
  });

  it('test one', function() {
    console.log('test one ok');
  });

  it('test two', function() {
    // even syntax error doesn't go to the console
    sdasdasdasd;
    console.log('test two ok');
  });

  it('test three', function() {
    console.log('test three ok');
  });

//   The running sequence will be:

//   Testing started – before all tests (before)
//   Before a test – enter a test (beforeEach)
//   1
//   After a test – exit a test   (afterEach)
//   Before a test – enter a test (beforeEach)
//   2
//   After a test – exit a test   (afterEach)
//   Testing finished – after all tests (after)
});