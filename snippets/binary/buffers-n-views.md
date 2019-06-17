# Buffers And Views

In web-development we meet binary data mostly while dealing with files 
(create, upload, download). Another typical use case is image processing.

That's all possible in JavaScript, and binary operations are high-performant.

Although, there's a bit of confusion, because there are many classes. To name a few:
- `ArrayBuffer`, `Uint8Array`, `DataView`, `Blob`, `File`, etc.

Binary data in JavaScript is implemented in a non-standard way, compared to other languages. 
But when we sort things out, everything becomes fairly simple.

__The basic binary object is `ArrayBuffer` -- a reference to a fixed-length contiguous 
memory area.__

We create it like this:
```js
let buffer = new ArrayBuffer(16); // create a buffer of length 16
alert(buffer.byteLength); // 16
```

This allocates a contiguous memory area of 16 bytes and pre-fills it with zeroes.

__`ArrayBuffer` is not an array of something__

Let's eliminate a possible source of confusion. `ArrayBuffer` has nothing in common with `Array`:
- It has a fixed length, we can't increase or decrease it.
- It takes exactly that much space in the memory.
- To access individual bytes, another "view" object is needed, not `buffer[index]`.

`ArrayBuffer` is a memory area. What's stored in it? It has no clue. Just a raw sequence of bytes.

__To manipulate an `ArrayBuffer`, we need to use a "view" object.__

A view object does not store anything on it's own. It's the "eyeglasses" that give an 
interpretation of the bytes stored in the `ArrayBuffer`.

For instance:

- __`Uint8Array`__ -- treats each byte in `ArrayBuffer` as a separate number, with 
possible values are from 0 to 255 (a byte is 8-bit, so it can hold only that much). 
Such value is called a "8-bit unsigned integer".
- __`Uint16Array`__ -- treats every 2 bytes as an integer, with possible values 
from 0 to 65535. That's called a "16-bit unsigned integer".
- __`Uint32Array`__ -- treats every 4 bytes as an integer, with possible values 
from 0 to 4294967295. That's called a "32-bit unsigned integer".
- __`Float64Array`__ -- treats every 8 bytes as a floating point number with 
possible values from <code>5.0x10<sup>-324</sup></code> to <code>1.8x10<sup>308</sup></code>.

So, the binary data in an `ArrayBuffer` of 16 bytes can be interpreted as 16 "tiny numbers", 
or 8 bigger numbers (2 bytes each), or 4 even bigger (4 bytes each), 
or 2 floating-point values with high precision (8 bytes each).

```
                        new ArrayBuffer(16)
Uint8Array       | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
Uint16Array      |   0   |   1   |   2   |   3   |   4   |    5    |    6    |    7    |
Uint32Array      |       0       |       1       |        2        |          3        |
Float64Array     |               0               |                 1                   |
```

`ArrayBuffer` is the core object, the root of everything, the raw binary data.

But if we're going to write into it, or iterate over it, basically for almost any operation – we 
must use a view, e.g:

```js
let buffer = new ArrayBuffer(16); // create a buffer of length 16

let view = new Uint32Array(buffer); // treat buffer as a sequence of 32-bit integers

alert(Uint32Array.BYTES_PER_ELEMENT); // 4 bytes per integer

alert(view.length); // 4, it stores that many integers
alert(view.byteLength); // 16, the size in bytes

// let's write a value
view[0] = 123456;

// iterate over values
for(let num of view) {
  alert(num); // 123456, then 0, 0, 0 (4 values total)
}

```

## TypedArray

The common term for all these views (`Uint8Array`, `Uint32Array`, etc) is __TypedArray__.
They share the same set of methods and properities.

They are much more like regular arrays: have indexes and are iterable.

A typed array constructor (be it `Int8Array` or `Float64Array`, doesn't matter) 
behaves differently depending on argument types.

There are 5 variants of arguments:

```js
new TypedArray(buffer, [byteOffset], [length]);
new TypedArray(object);
new TypedArray(typedArray);
new TypedArray(length);
new TypedArray();
```

- If an `ArrayBuffer` argument is supplied, the view is created over it. 
We used that syntax already. Optionally we can provide `byteOffset` to start from 
(0 by default) and the `length` (till the end of the buffer by default), 
then the view will cover only a part of the `buffer`.

- If an `Array`, or any array-like object is given, it creates a typed 
array of the same length and copies the content. We can use it to pre-fill 
the array with the data:
```js
let arr = new Uint8Array([0, 1, 2, 3]);
alert( arr.length ); // 4, created binary array of the same length
alert( arr[1] ); // 1, filled with 4 bytes (unsigned 8-bit integers) with given values
```
- If another `TypedArray` is supplied, it does the same: creates a typed array of 
the same length and copies values. Values are converted to the new type 
in the process, if needed.
```js
let arr16 = new Uint16Array([1, 1000]);
let arr8 = new Uint8Array(arr16);
alert( arr8[0] ); // 1
alert( arr8[1] ); // 232, tried to copy 1000, but can't fit 1000 into 8 bits (explanations below)
```
- For a numeric argument `length` -- creates the typed array to contain that many elements. 
Its byte length will be `length` multiplied by the number of bytes in a single 
item `TypedArray.BYTES_PER_ELEMENT`:
```js
let arr = new Uint16Array(4); // create typed array for 4 integers
alert( Uint16Array.BYTES_PER_ELEMENT ); // 2 bytes per integer
alert( arr.byteLength ); // 8 (size in bytes)
```
__Note:__ A `length` argument is the number of elements, if it is a `Unit16` view, then each element 
is 16 bits or 2 bytes, thus the `byteLength` of such an array is: amount of bytes needed to 
comprise a single element ( 2 ) multiplied by the number of elements contained in the view. 
Thus the meaning of the `BYTES_PER_ELEMENT` property.

- Without arguments, creates an zero-length typed array.

We can create a `TypedArray` directly, without mentioning `ArrayBuffer`. 
But a view cannot exist without an underlying `ArrayBuffer`, so gets 
created automatically in all these cases except the first one (when provided).

To access the `ArrayBuffer`, there are properties:
- `arr.buffer` -- references the `ArrayBuffer`.
- `arr.byteLength` -- the length of the `ArrayBuffer`.

So, we can always move from one view to another:
```js
let arr8 = new Uint8Array([0, 1, 2, 3]);

// another view on the same data
let arr16 = new Uint16Array(arr8.buffer);
```


Here's the list of typed arrays:

- `Uint8Array`, `Uint16Array`, `Uint32Array` -- for integer numbers of 8, 16 and 32 bits.
  - `Uint8ClampedArray` -- for 8-bit integers, "clamps" them on assignment (see below).
- `Int8Array`, `Int16Array`, `Int32Array` -- for signed integer numbers (can be negative).
- `Float32Array`, `Float64Array` -- for signed floating-point numbers of 32 and 64 bits.


### Out-of-bounds behavior

What if we attempt to write an out-of-bounds value into a typed array? 
There will be no error. But extra bits are cut-off.

For instance, let's try to put 256 into `Uint8Array`. In binary form, 
`256` is `100000000` (9 bits), but `Uint8Array` only provides 8 bits per value, 
that makes the available range from 0 to 255.

For bigger numbers, only the _rightmost_ (less significant) 8 bits are stored, 
and the rest is cut off:
```
value:        1 0 0 0 0 0 0 0 0  --> | 1 | 0 0 0 0 0 0 0 0 |
bit index:   -1 0 1 2 3 4 5 6 7
```

So we'll get zero.

For `257`, the binary form is `100000001` (9 bits), the rightmost 8 get stored, 
so we'll have `1` in the array:

```
value:        1 0 0 0 0 0 0 0 1  --> | 1 | 0 0 0 0 0 0 0 1 |
bit index:   -1 0 1 2 3 4 5 6 7
```

In other words, the number modulo 2<sup>8</sup> is saved.

Here's the demo:

```js
let uint8array = new Uint8Array(16);

let num = 256;
alert(num.toString(2)); // 100000000 (binary representation)

uint8array[0] = 256;
uint8array[1] = 257;

alert(uint8array[0]); // 0
alert(uint8array[1]); // 1
```

`Uint8ClampedArray` is special in this aspect, its behavior is different. 
It saves 255 for any number that is greater than 255, and 0 for any negative number. 
That behavior is useful for image processing.

### Buffers and Views are References

Since both buffers and views reference the same contiguous area of memory, changes to view `a` created over
buffer `a`, will also affect view `b` if view `b` was created over the same buffer `a`:
```js
const buffer = new ArrayBuffer(16);
const view1 = new Uint16Array(buffer); // [ 0, 0, 0, 0, 0, 0, 0, 0 ]
const view2 = new Uint16Array(buffer); // [ 0, 0, 0, 0, 0, 0, 0, 0 ]
view1[2] = 22;

view1; // [ 0, 0, 22, 0, 0, 0, 0, 0 ]
view2; // [ 0, 0, 22, 0, 0, 0, 0, 0 ]
const view3 = new Uint8Array(buffer); // [ 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, … ]
```

## TypedArray methods

`TypedArray` has regular `Array` methods, with notable exceptions.

We can iterate, `map`, `slice`, `find`, `reduce` etc.

There are few things we can't do though:

- No `splice` -- we can't "delete" a value, because typed arrays are views on a buffer, and these 
are fixed, contiguous areas of memory. All we can do is to assign a zero.
- No `concat` method.

There are two additional methods:

- `arr.set(fromArr, [offset])` copies all elements from `fromArr` to the `arr`, 
starting at position `offset` (0 by default).
- `arr.subarray([begin, end])` creates a new view of the same type 
from `begin` to `end` (exclusive). That's similar to `slice` method 
(that's also supported), but doesn't copy anything -- just creates 
a new view, to operate on the given piece of data. It means that if we mutate
a resulting subarray we also mutate the source view that this subarray was derived from:
```js
const buffer = new ArrayBuffer(16);
const view16 = new Uint16Array(buffer); // [ 0, 0, 0, 0, 0, 0, 0, 0 ]
view16[2] = 22;
view16[5] = 4;
view16; // [ 0, 0, 22, 0, 0, 4, 0, 0 ]
const sub = view16.subarray(2,6); // [ 22, 0, 0, 4 ]
sub[0] = 33; // [ 33, 0, 0, 4 ]
view16; // [ 0, 0, 33, 0, 0, 4, 0, 0 ]
```
If we were to do `slice`, `sub` would be simply a copy of the view, not a _reference_ to a part of it, and thus
the source view would remain unchanged ( only `sub` would change )

These methods allow us to copy typed arrays, mix them, create new arrays from existing ones, and so on.

## DataView

`DataView` is a special super-flexible "untyped" view over `ArrayBuffer`. 
It allows to access the data on any offset in any format.

- For typed arrays, the constructor dictates what the format is. The whole array 
is supposed to be uniform. The i-th number is `arr[i]`.
- With `DataView` we access the data with methods 
like `.getUint8(i)` or `.getUint16(i)`. We choose the format at method 
call time instead of the construction time.

The syntax:

```js
new DataView(buffer, [byteOffset], [byteLength])
```

- __`buffer`__ -- the underlying `ArrayBuffer`. Unlike typed arrays, 
`DataView` doesn't create a buffer on its own. We need to have it ready.
- __`byteOffset`__ -- the starting byte position of the view (by default 0).
- __`byteLength`__ -- the byte length of the view (by default till the end of `buffer`).

For instance, here we extract numbers in different formats from the same buffer:

```js
// binary array of 4 bytes, all have the maximal value 255
let buffer = new Uint8Array([255, 255, 255, 255]).buffer;

let dataView = new DataView(buffer);

// get 8-bit number at offset 0
alert( dataView.getUint8(0) ); // 255

// now get 16-bit number at offset 0, it consists of 2 bytes, together iterpreted as 65535
alert( dataView.getUint16(0) ); // 65535 (biggest 16-bit unsigned int)

// get 32-bit number at offset 0
alert( dataView.getUint32(0) ); // 4294967295 (biggest 32-bit unsigned int)

dataView.setUint32(0, 0); // set 4-byte number to zero, thus setting all bytes to 0
```

`DataView` is great when we store mixed-format data in the same buffer. 
E.g we store a sequence of pairs (16-bit integer, 32-bit float).
Then `DataView` allows to access them easily.

Do note however that writing numbers to dataView affects the buffer and thus, all the dependent views over it.
For instance if we have a view of 8 bit numbers and we write to `DataView` instance a number that spans
25 bits, then the first 5 numbers in an 8-bit view are going to be distorted. Here is an example:

```js
const uint8View = new Uint8Array([255, 3, 5, 12]);
const buffer = uint8View.buffer;
const dataView = new DataView(buffer);
// the length of number 150000000 in bits is 28:
150000000..toString(2).length; // 28
dataView.setUint32(0, 150000000);
// it means that the first 4 numbers of uint8View are going
// to be distorted. Ooops! It is all numbers :)
uint8View; // [ 8, 240, 209, 128 ]
```

## Task

### Concat Uint8Arrays

Given an array of `Uint8Array`, write a function `concat(arrays)` that returns a concatenation of them 
into a single array.

```js
function concat(arrays) {
    const totalLength = arrays.reduce((t, arr) => t + arr.length, 0);
    const freshBuffer = new ArrayBuffer(totalLength);
    const uint8Array = new Uint8Array(freshBuffer);
    let elementsWritten = 0;
    for (const array of arrays) {
        uint8Array.set(array, elementsWritten);
        elementsWritten += array.length;
    }
    return uint8Array;
}

const chunks = [
    new Uint8Array([0, 1, 2]),
    new Uint8Array([3, 4, 5]),
    new Uint8Array([6, 7, 8])
];

console.log(Array.from(concat(chunks))); // 0, 1, 2, 3, 4, 5, 6, 7, 8

console.log(concat(chunks).constructor.name); // Uint8Array
```

## Summary

`ArrayBuffer` is the core object, a reference to the fixed-length contiguous memory area.

To do almost any operation on `ArrayBuffer`, we need a view.

- It can be a `TypedArray`:
    - `Uint8Array`, `Uint16Array`, `Uint32Array` -- for unsigned integers of 8, 16, and 32 bits.
    - `Uint8ClampedArray` -- for 8-bit integers, "clamps" them on assignment.
    - `Int8Array`, `Int16Array`, `Int32Array` -- for signed integer numbers (can be negative).
    - `Float32Array`, `Float64Array` -- for signed floating-point numbers of 32 and 64 bits.
- Or a `DataView` -- the view that uses methods to specify a format, e.g. `getUint8(offset)`.

In most cases we create and operate directly on typed arrays, 
leaving `ArrayBuffer` under cover, as a "common discriminator". 
We can access it as `.buffer` and make another view if needed.

There are also two additional terms, that are used in descriptions 
of methods that operate on binary data:
- `ArrayBufferView` is an umbrella term for all these kinds of views.
- `BufferSource` is an umbrella term for `ArrayBuffer` or `ArrayBufferView`.

`BufferSource` is one of the most common terms, as it means 
"any kind of binary data" -- an `ArrayBuffer` or a view over it.