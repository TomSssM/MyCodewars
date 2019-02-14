// ________________________________________________________________________________________________________________________
// Quotes and Commas
// ________________________________________________________________________________________________________________________
// when writing JSON strings yourself remember that
// property keys and strings must be double quoted 
// and there should be no trailing commas
// then such a string can be safelyfed to JSON.parse
// JS objects to be fed to JSON.stringify can be anything
const jsonString = '{  "key1": "string", "key2": true }';
const anotherJsonString = '"string"';

// ________________________________________________________________________________________________________________________
// Stringify
// ________________________________________________________________________________________________________________________
// JSON.stringify(object, replacer, space);
// space can be a number [0-10] or a string [only first ten chars are used]
JSON.stringify([1,2,3], null, 4);
JSON.stringify([1,2,3], null, '_|-');

// stringify considers only enumerable own properties
const obj = Object.defineProperty({}, 'foo', {
  enumerable: false,
  value: 7,
});
obj.foo2 = ':)';
JSON.stringify(obj); // => '{"foo2":":)"}'

// replacer is either a node visitor or an array of
// properties to include
JSON.stringify({
  "bar": {
    "man":1,
    ">o":2,
    "12":3,
    "someKey": {
      "bar":":)",
      "notBar": null
    }
  },
  "key": true
}, ['bar', 'someKey']); // => '{"bar":{"someKey":{"bar":":)"}}}'

// no effect on arrays
JSON.stringify([1, 'a'], ['0']); // => '[1,"a"]'

// ignores illegal values in objects and replaces them with null in arrays
JSON.stringify(function() {}); // => undefined
JSON.stringify({foo: function() {}}); // => '{}'
JSON.stringify([function() {}]); // => '[null]'

// ________________________________________________________________________________________________________________________
// Parse
// ________________________________________________________________________________________________________________________

function dateReviver(key, value) {
  if (typeof value === 'string') {
    const x = Date.parse(value);
    if (!isNaN(x)) { // valid date string?
      return new Date(x);
    }
  }
  return value;
}

JSON.parse('{ "name": "John", "birth": "2011-07-28T22:00:00.000Z" }', dateReviver);

// ________________________________________________________________________________________________________________________
// toJSON
// ________________________________________________________________________________________________________________________
// when JSON encounters a toJSON method inside an object it calls it
// with key of the object as the first argument and replaces the object
// with a return value
const obj2 = {toJSON(key) {
  return `>>${key}<<`;
}};

JSON.stringify({
  foo: obj,
  prop: ':)',
  arr: [obj],
}, null, 4);

// {
//   "foo": ">>foo<<",
//   "prop": ":)",
//   "arr": [
//       ">>0<<"
//   ]
// }

JSON.stringify({toJSON: (key) => key}); // => "" (root key)

// The Date interface inplements its own toJSON method
JSON.stringify({date: new Date()}); // => {"date":"2019-02-14T20:50:27.367Z"}

// ________________________________________________________________________________________________________________________
// Node Visitors
// ________________________________________________________________________________________________________________________
const nodeVisitor2 = function(key, val) {
  // Use JSON.stringify for nicer-looking output
  console.log(`|key: ${JSON.stringify(key)} | value: ${JSON.stringify(val)} |`);
  if(key === 'del') return undefined;
  if(key === 'change') return `|${val} was changed|`;
  // otherwise do nothing
  return val;
}

// for parse Leaves come first, Pseudo Root last
JSON.parse('["a", true, 12]', nodeVisitor2);

// for stringify Pseudo Root comes first Leaves Come Last
JSON.stringify({
  a: ':)',
  del: true,
  arr: [1,true, 'ok'],
  change: 'this property',
}, nodeVisitor2);

// it is going to return '"abc"'
JSON.stringify('abc', nodeVisitor2); // => |key: "" | value: "abc" |

// everything must be in dbl quotes for parse!!!
JSON.parse('"hi"', nodeVisitor2); // => |key: "" | value: "hi" |