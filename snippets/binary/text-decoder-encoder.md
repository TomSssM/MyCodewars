# TextDecoder and TextEncoder

## TextDecoder

What if the binary data is actually a string? For instance, we received a file with textual data.
What these two classes actually do is turn a bunch of bits into text according to a certain standard ( f.e. `UTF-8` )

The build-in TextDecoder object allows to read 
the value into an an actual JavaScript string, given the buffer and the encoding.

We first need to create it:
```js
const decoder = new TextDecoder([label], [options]);
```

- __`label`__ -- the encoding, `utf-8` by default, but `big5`, `windows-1251` and many other are also supported.
- __`options`__ -- optional object:
  - __`fatal`__ -- boolean, if `true` then throw an exception for invalid (non-decodable) characters, 
  otherwise (default) replace them with character `\uFFFD`.
  - __`ignoreBOM`__ -- boolean, if `true` then ignore BOM (an optional 
  byte-order unicode mark), rarely needed.

...And then decode:

```js
const str = decoder.decode([input], [options]);
```

- __`input`__ -- `BufferSource` to decode ( `TypedArray` or `ArrayBuffer` ).
- __`options`__ -- optional object:
  - __`stream`__ -- `true` for decoding streams, when `decoder` is called repeatedly with incoming chunks of data. 
  In that case a multi-byte character may occasionally split between chunks. 
  This options tells `TextDecoder` to memorize "unfinished" characters and decode them when the next chunk comes.

For instance:

```js
let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

alert( new TextDecoder().decode(uint8Array) ); // Hello
```


```js
let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

alert( new TextDecoder().decode(uint8Array) ); // 你好
```

We can decode a part of the buffer by creating a subarray view for it:

```js
const uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);

// the string is in the middle
// create a new view over it, without copying anything
let binaryString = uint8Array.subarray(1, -1);

alert( new TextDecoder().decode(binaryString) ); // Hello
```

## TextEncoder

`TextEncoder` does the reverse thing -- converts a string into bytes.

The syntax is:

```js
let encoder = new TextEncoder();
```

The only encoding it supports is "utf-8".

It has two methods:
- __`encode(str)`__ -- returns `Uint8Array` from a string.
- __`encodeInto(str, destination)`__ -- encodes `str` into `destination` that must be `Uint8Array`.

```js
let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hello");
alert(uint8Array); // 72,101,108,108,111
```

Here is an example of encoding / decoding in action:
```js
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const str = decoder.decode(encoder.encode('Coffee'));
console.log(str); // Coffee
```
