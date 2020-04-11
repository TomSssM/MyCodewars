# Unicode vs `ASCII` vs `UTF-8` and so on

> the `†` character means there is some extra data about this part of the article in the [Notes](./str-encoding-n-charsets.md#notes) section

## From w3schools

**The Difference Between Unicode and `UTF-8`**

`Unicode` is a Character Set. `UTF-8` is an Encoding.

`Unicode` is a list of characters with unique decimal numbers ( `Code Point`s ). A = 65, B = 66, C = 67, ...

This list of decimal numbers represents the string `"hello"`: `104 101 108 108 111`

Encoding is how these numbers are translated into binary numbers to be stored in a computer:

`UTF-8` Encoding will store `"hello"` like this ( binary ): `01101000 01100101 01101100 01101100  01101111`

Character Sets translates characters to numbers. Encoding translates numbers into binary.

## Continued

So `Unicode` is a Character Set, it is an abstract model for how to represent letters through numbers ( because in
binary in computer we can only have numbers ). `Unicode` simply says that number 65, for instance, corresponds to
letter `"a"`, or number 70 to letter `"p"` and so on ( sort of like a Map where keys are numbers and the values are
letters that the numbers correspond to ). These magic numbers ( like 65 above and so on ) are also sometimes
called `Code Points`.

In `Unicode`, `Code Points` are written as `U+<number>` where `<number>` is, naturally, that same magic number to be
mapped to a letter ( like 65 was in the example above ).

`ASCII` is also a Character Set. It tells what letters and symbols the numbers between 0-127 should be mapped to.
The `Code Point`s in `ASCII` look just like numbers. For instance the `Code Point` in `ASCII` for the letter `"a"` is
`65` while in `Unicode` it is `U+65`. But unlike `Unicode`, `ASCII` is both a Character Set and a Character Encoding
at the same time. A Character Encoding is something that knows how to take a raw binary data like `100101010` and
convert it to `Code Point`s ( like `U+65 U+32 ...` ). The Character Encoding is a way to interpret the bits so that
they can be converted to the proper `Code Point`s and then be represented as the right characters on the screen.
In this matter `ASCII` is also pretty simple: it stores every `Code Point` as 1 byte ( 8 bits ). For instance if the
raw binary data is `0100000101110100`, then as per `ASCII` take every 8 bits: `01000001 01110100`, convert them to
decimal number: `65 116` and then map those to letters: `At`. Simple as that. Since in one byte we can store numbers
0-255, such a convention is perfect as `ASCII` only needs numbers 0-127.

So what is different between `ASCII` ( as a Character Set ) and `Unicode` besides the form in which you write
`Code Point`s ( `U+` vs plain number )? The whole Point of `Unicode` is that it includes all the number-to-letter
mappings as `ASCII` does, _and more_ ( for which reason `Unicode` is also sometimes called a superset of `ASCII` ).
You see with `ASCII` you can encode any English letter plus a whole bunch of symbols as numbers between 0-127
( in the default `ASCII` there are no number-to-letter mappings for the numbers 128-255 ). But what is the `Code Point`
in `ASCII` for, say, a Japanese letter? That is the problem with `ASCII`, there isn't. And there couldn't be actually.
Japanese alphabet consists of thousands of characters while with `ASCII` you can encode the maximum of 255 characters
( 127 of which are already occupied by mappings for English letters ). That is why `Unicode` was invented.
`Unicode` has mappings for all the imaginable characters in the world!

In `Unicode` you are not limited to 127 `Code Point`s that map to letters. In fact `Unicode` has thousands of
`Code Point`s with which you can even encode an emoji. For instance the `Code Point` for :coffee: is `U+9749`.
Thus number `9749` corresponds to :coffee:. See the problem here? Number `9749` in binary is `0010011000010101`.
You need 2 bytes ( not 1 as used to be ) to store the `Code Point` `9749`! That is where the problems arose as people
started arguing how to best store the raw binary data to represent a Unicode `Code Point`. Some `Code Point`s actually
need an astonishing 6 bytes ( !! ) to store them.

That is why `Unicode` is not, like `ASCII`, both a Character Set ( number-to-character mappings ) and at the same
time an Encoding ( a way to store `Code Point`s in binary and to convert raw binary data into
the correct `Code Point`s ). `Unicode` is only a Character Set because there are many different ways to encode
`Code Point`s for `Unicode` ( because as we discussed many of the Unicode `Code Point`s need more than 2 bytes
to store them ). In other words while `Unicode` is the default, standard Character Set, there are many Encodings that
exist for it. While the Encoding of characters for `ASCII` simply was to store `Code Point`s as bytes ( 8 bits back
to back that would map to an array of `Code Point`s ) there are many Encodings for `Unicode`, each of which would
produce a different pattern of bits ( thus `0010011000010101` in one Encoding may produce `U+9749` but in a different
Encoding it may produce `U+1233` or even some garbage value - ever saw those question marks `?` or boxes instead of
letters :smile: ).

There are many Encodings for `Unicode`: `UTF-8`, `UTF-16` and so on.

In `UTF-8` we store `Code Point`s between `U+0` and `U+255` as one byte ( because one byte is enough to fit them, also
it makes `UTF-8` completely compatible with `ASCII` ), after that we store `Code Point`s, which need 2 bytes to
encode them, as 2 bytes, that need 3 bytes as 3 bytes and so on ( that need `n` bytes as `n` bytes ), very efficient.

In `UTF-16` we store `Code Point`s starting at 2 bytes, so `U+255` would be stored as `0000000011111111`.

## In Real Life

The Knowledge of Character Sets ( `Unicode` particularly ) can help us when we need to insert the character that is
missing from the keyboard to HTML.

For instance here is how we would insert a copyright symbol:

```html
<span>Copyright &#174;</span>
```

This `&...;` thing is called an _HTML Entity_. There are actually many ways we could use this one. For every entity
there is a corresponding Unicode `Code Point`: for instance for the copyright symbol, the Unicode `Code Point` is
`U+174`, or as a hexadecimal number it is `U+00ae`. In HTML we can use the Unicode `Code Point`s to represent
characters that are not present on the keyboard ( because there is every possible character in the world available
in `Unicode` ). In order for HTML to show the character from the Unicode `Code Point`, we need to put the value of the
necessary `Code Point` between `&...;` prefixed by `#` ( like we did above ).

Also HTML allows to insert special characters not only via Unicode `Code Point`s but also via their names. That is
right, each such entity ( like the copyright symbol above though it could even be something as simple as the letter
`"a"` ) has a name associated with it. For the copyright symbol the name is `reg`. Do note though that such entity
names like `reg` above are associated with HTML entities only, **the Entity Names have nothing to do with
`Unicode`, it is just an alias which we can only use in HTML.**

If we use an entity name inside HTML we need to put it between `&...;` ( without the `#` ).

Finally if we want to use the Unicode `Code Point` _in hexadecimal_ we need to additionally prefix it by `x` so
that the Entity looks like `&#xae;` ( `ae` is 174 in decimal ).

Here is the cheatsheet:

- `&<entity-name>;`
- `&#<entity-number>;`
- `&#x<entity-hex-number>;`

Thus each `p` below will correctly render the copyright symbol:

```html
<p>I will display &reg;</p> <!-- Entity's Name - thus # is not needed -->
<p>I will display &#174;</p> <!-- Entity's Code Point - thud # IS needed -->
<p>I will display &#xAE;</p> <!-- Now Entity's Code Point is in hexadecimal - thus we need to prefix
                                  the hexadecimal number "AE" by "x" -->
```

## How `UTF-8` and Percent Encoding Works

Sometimes we need to encode a certain character when it is sent as part of the URL ( in GET requests for instance ).
For example if we send cyrillic letters or reserved characters ( reserved character is a character which, if used as
part of the URL, has a special meaning, for instance the character `/` is _reserved_ as it is used as part of the
`path` part of the URL to separate directories ).

Let's see, first, how to encode in `UTF-8`. If we take a look at the raw binary data encoded via `UTF-8` it is going to
have a certain structure. The first couple of bits in every byte thus encoded will have certain meaning. For instance
some `Code Point`s need 2 and more bytes to encode them. It means that some bytes are going to be intermediate bytes
comprising a `Code Point`.

For instance if a `Code Point` is stored in just one byte ( like number `71` ), then the first bit is going to be `0`:

```
0xxxxxxx
```

where `x` are the bits that are going to be used for the mantissa of the number ( of the `Code Point` ).

If there are going to be 2 bytes used to store the `Code Point` then the first byte is going to be:

```
110xxxxx
```

and the 2nd byte is going to be:

```
10xxxxxx
```

The `110` part of the 1st byte tells that there are going to be 2 bytes used to represent a `Code Point`. The `10` part
of the 2nd byte tells: _hey, I am a continuation byte_.

Likewise if we use 3 bytes to represent a `Code Point`, then the 1st byte is going to start:

```
1110xxxx 10xxxxxx 10xxxxxx
```

If we use 4 bytes to represent a `Code Point`, then the 1st byte is going to be:

```
11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
```

and so on.

Here is a table to sum things up:

![1](../data/unicode-expl/1.png)

**Example**

So imagine we need to encode the character `"€"`. Its `Code Point` is `U+20AC`. `20AC` in binary is:

![2](../data/unicode-expl/2.png)

Because the final output would be stored in 3 bytes, we need to prefix the 1st byte by `1110`.
Since the first 4 bits of the 1st byte are already occupied by `1110`, we can only take out the 1st four bits
_out of the number itself_ ( `0010` ) to put into the 1st byte and thus the first byte of _the result_ is going
to look like:

![3](../data/unicode-expl/3.png)

Since we need to prefix the 2nd byte of _the result_ by `10` to indicate that it is a continuation
byte, we have only 6 bits of the 2nd byte ( of _the result_ ) available to put stuff in:

```
1 0 x x x x x x
```

Thus we take out the next 6 bits out of _the number_ ( the green ones in the picture above ) and put
them instead of those `x`s. The 2nd byte of the result is going to look like:

![4](../data/unicode-expl/4.png)

Likewise for the 3rd byte. The full result of encoding the Unicode `Code Point` `U+20AC` is going
to look like ( 3 bytes ):

![5](../data/unicode-expl/5.png)

That is how `UTF-8` works :smile:

Do note that every byte of the result ( `11100010`, `10000010` and `10101100` ) can be represented
as a hexadecimal number. For instance if we convert `11100010` ( 1st byte ) from binary to hexadecimal
we get `E2`. Thus if we convert every byte to hexadecimal we get the following sequence of numbers:

```
E2 82 AC
```

That is exactly how weird Unicode characters are also encoded ( percent encoded ) when we send them
as part of the url. We can clearly see that especially if we send a character the encoding of which
requires more than 1 byte ( like `"€"` ). For instance the result of encoding `"€"` as a URI
component is going to be:

```js
encodeURIComponent('€');
// "%E2%82%AC"
```

Which corresponds perfectly to the sequence of hexadecimal numbers we just distilled as the result of
encoding the `Code Point` `U+20AC` via `UTF-8`.

And that is why you see several hexadecimal numbers when encoding, for instance, 1 cyrillic character.

**Note:** This isn't meant to be a complete overview of `UTF-8` but merely a nice example of how Encodings work and
how they differ from Character Sets.

## Unicode Planes

There are very many code points in Unicode. Since there are so many of them, it was decided to separate
all the code points into groups of 2^16 code points called _planes_.
There are 17 planes overall consisting of 17 * 2^16 = 1114112 code points
( meaning the biggest code point we _could_, in theory, represent is 1114112 - 1 or 0x10ffff in hexadecimal ),
more than enough to represent all the characters on earth.

Why not more you would ask? Recall how `UTF-8` works. In `UTF-8`, the spec says that we shouldn't use more than 4 bytes
to encode a code point. But in theory we can. Let's see how many code points we can represent if we add
just a couple of bytes. What if there were 6 bytes, thus the first byte is going to be `1111110x` leaving 31 bits
( number of `x`s ) for the code point:

```
1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
```

Thus with 31 bits the biggest code point we can represent is 2^31 - 1, which is 2^31 characters&#x2020;
and 32 768 planes&#x2020;. The reason we have only 17 planes instead of 32 768 is because of `UTF-16`
Unicode encoding ( we will see how it works in a moment ). The biggest code point `UTF-16` can encode
is around 0x10ffff ( in hexadecimal ) and even that not without a trick, which limits us to only 17 planes.&#x2020;

In Unicode the 1st plane has most of the characters that we normally use ( and more ), while most other planes still
are not assigned any characters at all. In fact the 1st Unicode plane is so popular that it has a name BMP.
Here is what the BMP plane looks like:

![BMP](https://upload.wikimedia.org/wikipedia/commons/0/01/Unifont_Full_Map.png)

The other planes are called supplementary planes. The 2nd Unicode plane called Supplementary Multilingual Plane
has emoji characters for instance.

| Plane | No. | Abbreviation | Code Points Range |
| :--- | :--- | :--- | :--- |
| Basic Multilingual Plane | 0 | BMP | 0000 - FFFF |
| Supplementary Multilingual Plane | 1 | SMP | 10000 - 1FFFF |
| Supplementary Ideographic Plane | 2 | SIP | 20000 - 2FFFF |
| Tertiary Ideographic Plane ( unassigned ) | 3 | TIP (unassigned) | 30000 - 3FFFF |
| Planes 4 - 13 | 4 - 13 | unassigned | 40000 - DFFFF |
| Supplementary Special-purpose Plane | 14 | SSP | E0000 - EFFFF |
| Supplement­ary Private Use Area plane A | 15 | SPUA-A | F0000 - FFFFF |
| Supplement­ary Private Use Area plane B | 16 | SPUA-B | 100000 - 10FFFF |

Amongst many, the last 2 planes are called Private Use Areas because they will never be assigned characters by the
Unicode Consortium. Actually, the same is also true about some code points in the BMP plane, these are the
code points U+E000...U+F8FF. These code points ( U+E000...U+F8FF, U+F0000...U+10FFFF ) are _reserved_ for private use.
By whom you ask? Why, by font vendors! The creators of fonts may make the character from plane 15 for example appear
as some SVG image. This way, if you use special font you may use inline images instead of letters. And the font-size
will correspond to the size of the images.

That is exactly how Font Awesome is built! For instance, let's add the font awesome font to our HTML page:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>Font Awesome Page</title>
    <style>
        .page-glyph {
            /*
              here we say that we want to use font awesome so that reserved
              Unicode code points appear as the corresponding Font Awesome
              SVG images
            */
            font-family: FontAwesome;
        }
    </style>
</head>
<body>
<span class="page-glyph">&#xf0f4;</span>
</body>
</html>
```

If you check, you will see that the `U+F0F4` Unicode Code Point used above is actually reserved for private use so that
it never collides with the real Unicode characters. And the font awesome creators decided to replace this private
use code point with a coffee mug svg image.

**Note:** Some code points are _control characters_, they make computer do special things when it sees them.
For instance, the `\n` newline character is a control character with code point of `0x000a`, which makes the
cursor go to the next line. The _very first Unicode character_ with code point of `0` is called a null character
( also called sometimes _null terminator_ or _null byte_ ), it is a control character too.
In lower-level languages like C, null terminator is used to mark the end of a string. Thus when a sequence
of characters is stored sequentially in computer memory, the C language will know where one string ends and
the next one starts when it sees the null charcter as it always comes in the end.

## How `UTF-16` Works

`UTF-16` uses 2 bytes to encode each code point. Remember, `UTF-8` would use a different amount of bytes depending
on how big a code point was ( for this, it is sometimes called a varied width encoding&#x2020; ). But `UTF-16`
always uses 2 bytes whether a code point is 0x0001 or 0x20ff. For this reason, all the code points of BMP
( the 0x0000 - 0xffff code points ) correspond to their binary representation because we need from 1 to 2 bytes max.
to store them in computer memory. But what about code points of the 2nd or the 3rd plane? They need 3 and more bytes
to store them. But in `UTF-16` we can use only 2 bytes ( 16 bits ) to store a single code point, that is it,
can't have more. So how does `UTF-16` handle non BMP code points from supplementary planes you ask? The answer is it
uses _surrogate pairs_.

There is a very good explanation of surrogates in the Modern JavaScript tutorial. Make sure to read it before
you continue!

Surrogate pairs are pairs of 2 usual Code Points in the BMP. In other words, surrogate characters are _simply_
BMP code points ( these are the code points 0xD800 - 0xDFFF ). These special code points
are reserved in Unicode to be used as surrogate characters for the `UTF-16` encoding and will not be re-assigned
in the future. They do not produce any visual character and are used only by `UTF-16` encoding as surrogate characters
to form surrogate pairs.

For the parser it is easy to identify a surrogate pair: if it encounters a code point between 0xD800 - 0xDFFF, it knows
that it is a surrogate pair. The code points in the range 0xD800 - 0xDBFF are called _high_ surrogates and the
code points in the range 0xDC00 - 0xDFFF are called _low_ surrogates.

Let's see how surrogate pairs help `UTF-16` encode code points that require over 2 bytes to be stored
( 0x10000 - 0x10ffff ). Let's encode the code point `U+10437`. This code point's binary value is ( 3 bytes ):

```
0000 0001  0000 0100  0011 0111
```

First we need to subtract the value of 0x10000 ( in hexadecimal ) from the code point. 0x10437 - 0x10000 we get
0x437. You see, even if we take the biggest possible code point of 10ffff and subtract 0x10000 we are going to
get 0xfffff, which requires no more than 20 _bits_ to be encoded. Thus we can say that if we subtract
0x10000 from any code point, the resulting value is going to be no more than 20 bits. Now, the 1st 10 bits of
this value are going to be part of the first surrogate, and the remaining 10 bits of this value are going to
be part of the 2nd surrogate.

OK, let's get back to our example. The code point `U+10437`, which we want to encode in `UTF-16` has the follwoing
binary representation:

```
1  0000 0100  0011 0111
```

As per our formula, let's subtract 0x10000 from it we get 0x10437 - 0x10000 = 0x437. The binary representation
of 0x437 is:

```
100 0011 0111
```

Let's pad it with 0s to make exactly 20 bits:

```
0000 0000 0100 0011 0111
```

Now let's take its first ( most significant ) 10 bits:

```
0000 0000 0100 0011 0111
^^^^ ^^^^ ^^
```

If we append them to `110110`:

```
1101 10 + 0000 0000 01
```

And then convert the binary number `1101100000000001` to hexadecimal, we get 0xD801. But what is 0xD801? Oh wait, it is
the 1st surrogate!

If we take the code point's 10 least significant bits:

```
0000 0000 0100 0011 0111
            ^^ ^^^^ ^^^^
```

And append them to `110111` we get `1101110000110111` which is our 2nd surrogate 0xDC37.

Since JavaScript internally uses `UTF-16` we can verify the validity of everything said above by running
the following code:

```js
'\uD801\uDC37'; // 𐐷
'\u{10437}'; // 𐐷
'\uD801\uDC37' === '\u{10437}'; // true
```

Here is the script which automates the convection between surrogates and usual code points:

```js
function convertToSurrogate(num, isBinary = false) {
    const inputCodePoint = parseInt(num, 16);
    const subtractVal = 0x10000;
    let rawInputValue = (inputCodePoint - subtractVal).toString(2);

    if (rawInputValue.length < 20) {
        rawInputValue = '0'.repeat(20 - rawInputValue.length) + rawInputValue;
    }

    const lowSurrogate = '110110' + rawInputValue.slice(0, 10);
    const highSurrogate = '110111' + rawInputValue.slice(10);
    const surrogates = [lowSurrogate, highSurrogate];

    if (isBinary) {
        return surrogates.map((surrogate) => {
            return surrogate.split('').map((char, index) => {
                const isFourth = index % 4 === 0;
                if (isFourth) {
                    return ` ${char}`;
                }
                return char;
            }).join('').trim();
        });
    }

    return surrogates.map((surrogate) => {
        const result = parseInt(surrogate, 2).toString(16);
        return '0'.repeat(4 - result.length) + result;
    });
}
```

Let's try encoding the biggest possible Unicode code point U+10ffff using the function above:

```js
convertToSurrogate('10ffff'); // [ 'dbff', 'dfff' ]
```

Do note that 0xdbff is the biggest possible _high_ surrogate while 0xdfff is the biggest possible _low_ surrogate.
Oops, looks like we have just proven that any Unicode code point can be encoded using surrogates!

Here are more examples:

```js
'\u{1f60d}'; // 😍
'\ud83d\ude0d'; // 😍
'😍'.charCodeAt(0).toString(16); // d83d
'😍'.codePointAt(0).toString(16); // 1f60d
```

More about `codePointAt` vs `charCodeAt` can be found in the Tutorial.

Do note though that using surrogaes in `UTF-16` HTML document won't work:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-16">
    <title>UTF 16 Doc</title>
</head>
<body>
<span>&#xD801;&#xDC37;</span>
</body>
</html>
```

But you can use non BMP characters _as is_:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-16">
    <title>UTF 16 Doc</title>
</head>
<body>
<span>&#x10437;</span>
</body>
</html>
```

Converting between `UTF-16` surrogates and usual code points is exactly what `TextEncoder` and `codePointAt`
do in JavaScript. You can make sure of that by looking at their [polyfills](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder).
Here is an example:

```js
const encoder = new TextEncoder();
const view = encoder.encode('\u{1f60d}'); // convert JS UTF-16 surrogates to UTF-8 raw binary data
view; // Uint8Array [ 240, 159, 152, 141 ]
```

Do note though that `TextEncoder` converts JS `UTF-16` surrogates into `UTF-8` encoded binary data. Here is proof.
Let's convert the code point above `U+1f60d` into binary data according to `UTF-8` ( the algorithm is described
in detail above ). The binary representation of 0x1f60d is:

```
11111 011000 001101
```

Now let's use the `UTF-8` encoding algorithm to convert it to raw binary data:

```
11110000  10011111  10011000 10001101
     ^^^    ^^^^^^    ^^^^^^   ^^^^^^
```

Highlighted are the bits that make up the binary value of the `U+1f60d` code point ( try following them from right to
left and you should see the same number ). Now let's interpret every 8 bits as a decimal value by converting
from binary, we get:

```
11110000 -> 240
10011111 -> 159
10011000 -> 152
10001101 -> 141
```

That is exactly the same values as returned by our Uint**8**Array View. Awesome!

NodeJS has an even better API to work with encodings as NodeJS supports a variety of encodings besides `UTF-16`.
Let's get a string from `UTF-8` binary data:

```js
const { StringDecoder } = require('string_decoder');
const utf8Decoder = new StringDecoder('utf8');
const euro1 = utf8Decoder.write(Buffer.from([0xE2, 0x82, 0xAC]));
euro1; // €
```

NodeJS's handling of `UTF-16` is a bit more tricky as it supports only _the little-endian variant of `UTF-16`_:

```js
const utf16Decoder = new StringDecoder('utf16le');
const euro2 = utf16Decoder.write(Buffer.from([0x20, 0xac].reverse()));
euro2; // €
```

The code point of "€" is 0x20AC ( in hexadecimal ). Thus it is 2 bytes: 0x20 and 0xAC.
As a result, the representation of "€" in `UTF-16` is:

```
0x20 0xAC
```

But in order to represent the same code point in the _little-endian_ variant of `UTF-16` we need to reverse
the order of all the bytes like this:

```
0xAC 0x20
```

Why do that for little endian is explained [here](./little-endian.md).

There is also a `UCS-2` encoding which also uses 2 bytes to store each code point but unlike `UTF-16`,
`UCS-2` is a fixed-width encoding. What it means is that it doesn't use surrogate pairs to depict code
points outside of BMP. For example `UCS-2` would interpret the 2 code points `\uD834\uDF06` ( both of which
are surrogate code points ) _not_ as a surrogate pair ( thus converting them to the code point `` ) but as
2 separate characters. Since neither `\uD834` nor `\uDF06` produce a visible output, nothing would be shown.

Thus `UCS-2` is limited to being able to depict only BMP characters.

## Composite Characters and Emoji

The tutorial also mentions composite characters. Don't confuse composite characters with surrogates.
Composite Characters are the characters to represent which we need to group 2 code points back to back. For instance,
from the tutorial example here is the character `s` with _dots above_: `Ṡ`.

To represent it though we need to group the letter `S` with the special code point `U+0307`. `U+0307` means dots above,
it is invisible on its own but if preceded by a letter, it adds dots above it: `&#x0307;&#x0307;` = Ṡ.

In fact it is a very common practice in Unicode to group two or more code points to get a character ( which is
different from grouping surrogates _just_ to get a code point, make sure not to confuse the two ). It is particularly
common with emoji. For example, so far we have seen the 😍 emoji. To depict it we would use a code point from the
2nd Unicode plane. But sometimes emoji are created by taking an already existing character like `U+2764`
( flat same-color 2D heart symbol ) and adding a special `U+FE0F` code point ( VARIATION SELECTOR-16 or VS16 )
after it:

```html
<span>&#x2764;</span>
<br>
<span>&#x2764;&#xFE0F;</span>
```

`&#x2764;` -> flat heart ( on most systems )

`&#x2764;&#xFE0F;` -> colorful emoji heart

The code point for a heart `U+2764` is called a _base code point_ in this case. We can combine base code points with
the VS16 code point `U+FE0F` to get an emoji like representation from a non-emoji character ( like we would get an
emoji heart out of flat heart shape symbol above&#x2020; ).

Just like there is VS16 code point, there is also a VS15 code point `U+FE0E` which makes emoji look like
the flat characters:

```js
'\u231B'; // ⌛
'\u231B\uFE0E'; // ⌛︎ <- tiny sand clock
```

So V16 and V15 are special code points that make emoji look different. But it doesn't end here! There are also
special code points to make emoji different skin color! Here are different skin colors:

```js
'\u{1F3FB}'; // 🏻
'\u{1F3FD}'; // 🏽
```

Skin colors are code points `U+1F3FB` – `U+1F3FF`, combine them with human emoji and voila we have
different-looking dudes:

```js
'\u{1F468}'; // 👨
'\u{1F468}\u{1F3FB}'; // 👨🏻
'\u{1F468}\u{1F3FD}'; // 👨🏽
```

Some emoji are groups of other emoji with the Zero Width Joiner ( ZWJ for short ) code point between them.
ZWJ is a code point `U+200D` that is used to tell the compiler that 2 neighboring characters are to be
interpreted as one ( if possible ). For instance this emoji: &#x1F937;&#x200D;&#x2642;&#xFE0F; is actually
a combination of a woman shrugging emoji &#x1F937; and male sign ♂️ character. But if we write them like this:

```js
'\u{1F937}\u2642'; // 🤷♂
```

we get back 2 separate characters. Looks like we forgot a ZWJ:

```js
'\u{1F937}\u200D\u2642';
```

Now if you run this we get back a man shrugging instead. What is interesting is that many emoji are created like this.
For instance, a family emoji &#x1F468;&#x200D;&#x1F469;&#x200D;&#x1F467;&#x200D;&#x1F466; is just four separate
emoji of man, woman, girl and boy joined by a ZWJ code point. Here is proof:

```js
const man = '\u{1F468}'; // 👨
const woman = '\u{1F469}'; // 👩
const girl = '\u{1F467}'; // 👧
const boy = '\u{1F466}'; // 👦
[man, woman, girl, boy].join('\u200D');
// above code equivalent to:
'\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}';
```

See? Knowing Unicode is awesome!

### Notes

&#x2020; You might be wondering, if we can represent 2^31 characters, why is the biggest code point that
can be represented is 2^31 - 1? The answer is there is also 0. Thus if we can represent a total of 4 characters
starting at 0, then the biggest character we can represent is 3 ( `0`, `1`, `2`, `3` = a total of 4 characters ).
This might be particularly confusing when we talk binary. What is the biggest number that can be represented with
4 bytes or 32 bits in decimal? The answer is 2^32 - 1 ( 32 `1`s ). 2^32 is already 33 bits. Thus it is sometimes a lot
easier to use hexadecimal to answer the question above. The biggest number that can be represented with 2 bytes is
`0xffff`. We will get to it soon.

&#x2020; In order to get the number of planes, we need to divide the overall amount of characters
( 4 294 967 296 or 2^32 ) by the amount of characters each plane can hold ( 2^16 ), which is: 2^32 / 2^16 = 32 768.

&#x2020; Also let's briefly take a look at how much more convenient it is to work with code points if we write
them in hex. We know that the biggest number that can be represented using 1 byte is 255, which is 2^8 - 1.
The same number can be written in hex as 0xff. Now what if we were asked what is the biggest number that can be
represented using 2 bytes? We would say, because of what we already learnt about hex - 0xffff ( two 'f' chars
for each byte ). And vice versa. How many bytes are needed to represent this hexadecimal number: 0x1234?
Since, as we said, every 2 chars in hex correspond to 1 byte and there are 4 chars we can instantly tell:
4 / 2 = 2 bytes. See? Convenient :)

It is even more convenient to use hex for Unicode code points since we can always see in which plane the code point is.
Let's see an example of that. The 1st plane is code points 0 - 2^17 or, in hexadecimal, 0x0 - 0xffff. What about
the 2nd plane? Each Unicode plane has 2^17 chars in it so that the next plane is going to be code points
2^17 - 2^34 or, in hexadecimal, 0x10000 - 0x1ffff. The 3rd plane is code points 131072 - 196607 in decimal
or 0x20000 - 0x2ffff. See the tendency? The first character of the hexadecimal code point corresponds to the plane
that the code point comes from ( except for 1st plane code points ). Thus, nothing means 1st plane, 1 means 2nd plane
and so on. For example, 0x**1**1f4a means code point comes from the 2nd plane and so on. Awesome!

&#x2020; A variable width encoding is when in order to represent a single code point, the encoding would sometimes use
1 byte but some other times 2 or more bytes. In formal writing the bytes are also sometimes referred to as _units_.
Thus, in a variable width encoding some units are going to be _singletons_, which by themselves represent a single code
point, some are going to be _lead units_, which come first in a multi-unit sequence, and _trail units_, which come
afterwards in a multi-unit sequence. The reason `UTF-8` is considered a variable width encoding is because
depending on how large the code point is, it is going to use a different amount of bytes. Consider this string `I♥NY`.
In `UTF-8` it is going to be encoded as 6 bytes: `49 E2 99 A5 4E 59`, where `49` is a _singleton_ and corresponds
to the character `I`; `E2` is a _lead unit_, `99` and `A5` are trail units and together `E2 99 A5` can be decoded
into the `♥` character; both `4E` and `59` are also _singletons_ and decode to the
characters `N` and `Y` correspondingly.

What is probably less intuitive is that `UTF-16` is also a variable width encoding. The reason for that is that in order
to encode code points 0x0000-0xffff it uses 2 bytes for each code point but in order to encode code points
0x10000-0x10ffff `UTF-16` uses 4 bytes ( a surrogate pair ), which means that in order to encode a single code point,
`UTF-16` uses sometimes one amount of bytes, sometimes a different amount of bytes, which, in turn, fits the
definition of a variable width encoding.

&#x2020; You might have noticed the example above is done via HTML entities. Unfortunately there is no very
illustrative way of verifying the same point in the JS console as the console for some reason depicts all emoji
created this way as their corresponding non-emoji base code points.
