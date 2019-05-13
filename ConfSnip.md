# Confusing Snippets

## Another ASI Trick

Here, first we create an object `{goodbye: [1,2,3]}` after which the interpreter evaluates the following array
( because of the missing semicolon ) as bracket-accessing a property. What property? Comma operator :) Everything is
a mess, yet we are able to find a property at `{goodbye: [1,2,3]}['goodbye']` and indeed it is an array. After that we
do `forEach` for this array and assign the Return Value of `forEach` to `name`. The rest is predictory but in this case
ASI simply takes the code in a completely different direction.

```javascript
var name = { goodbye: [1,2,3] }
['hello','goodbye'].forEach(val => {
    console.log(val + ' - ' + name);
})
// output:
// log: 1 - undefined
// log: 2 - undefined
// log: 3 - undefined
```