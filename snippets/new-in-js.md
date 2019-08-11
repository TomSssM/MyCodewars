# New in JS

## Data Type of Keys

We used to say that keys of objects can be only of type `string` and we also argued that they cannot be of 
type `number`. Well, now we also have a new primitive type - symbol. And guess what it is the second of the
2 data types that object keys can be.

```js
const str = 'clear';
const symb = Symbol.iterator;

typeof symb; // "symbol"
typeof str; // "string"

Map.prototype[symb]; // ƒ entries() { [native code] }
Map.prototype[str]; // ƒ clear() { [native code] }
```
