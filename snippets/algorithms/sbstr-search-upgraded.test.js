const assert = require('assert');

const {
    substringSearchU,
    buildSuffixArray,
} = require('./sbstr-search-upgraded');

assert.deepEqual(buildSuffixArray('abcdabca'), [0,0,0,0,1,2,3,1]);
assert.deepEqual(buildSuffixArray('aabaabaaa'), [0,1,0,1,2,3,4,5,2]);

assert.strictEqual(substringSearchU('abxabcabcaby', 'abcaby'), 6);
assert.strictEqual(substringSearchU('saddssd', 'ok'), -1);
assert.strictEqual(substringSearchU('wow it is a cactatcaatcat over there', 'cat'), 22);

console.log('Success!');
