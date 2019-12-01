// 1) Array Mutant

class mutantArr {
  constructor(...args) {
    this.collection = [...args];
    this.index = 0;
  }

  get length() {
    return this.collection.length;
  }

  [Symbol.iterator]() {
    let iterInd = this.index;

    return {
      next: () => {
        while(Math.abs(this.collection[iterInd]) % 2 === 0) iterInd++;

        if(iterInd >= this.length) return {
          done: true,
          value: undefined,
        };

        return {
          done: false,
          value: this.collection[iterInd++],
        };
      },
    };
  }
}

const arr = new mutantArr(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20);
arr instanceof mutantArr; // => true
[...arr]; // => [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

// 2) FrankenCurry

function frankenCurry(fn, n = fn.length) {
  function getFrankenCurriedFn(prev) {
    return function() {
      const args = prev.concat(Array.from(arguments));
      if (args.length < n) {
        return getFrankenCurriedFn(args);
      } else {
        return fn.apply(this, args);
      }
    };
  }
  return getFrankenCurriedFn([]);
}

function a(arg1, arg2, arg3) {
  return arg1 + ', ' + arg2 + ', ' + arg3;
}

frankenCurry(a)('x','y','z'); // => "x, y, z"
frankenCurry(a)()()()()()(1)()()()()()(2)()()()()()(3); // => "1, 2, 3"

// 3) CSS and Emojis withconsole.log

const CSS = ['background:yellow', 'padding:2rem', 'color:chocolate', 'font-size: 3rem', 'font-weight:bold', 'margin:0 1rem'];
console.log('%cRed%cGreen%cBlue', (CSS.join(';') + ';color:red'), (CSS.join(';') + ';color:green'), (CSS.join(';') + ';color:blue'));
// in order for a compliler to render the
// unicode of your emoji and display it prefix
// the unicode id of the emoji with 0x

const bug = String.fromCodePoint(0x1F41E);
console.log(`Sometimes there is a ${bug} in the code`);
