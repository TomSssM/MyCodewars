# `Unicode` vs `ASCII` vs `UTF-8` and so on

## From w3schools

**The Difference Between Unicode and UTF-8**

`Unicode` is a Character Set. `UTF-8` is an Encoding.

`Unicode` is a list of characters with unique decimal numbers ( `Code Point`s ). A = 65, B = 66, C = 67, ...

This list of decimal numbers represents the string `"hello"`: `104 101 108 108 111`

Encoding is how these numbers are translated into binary numbers to be stored in a computer:

`UTF-8` Encoding will store `"hello"` like this ( binary ): `01101000 01100101 01101100 01101100  01101111`

Encoding translates numbers into binary. Character Sets translates characters to numbers.

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

In `UTF-8` we store `Code Point`s between `U+0` and `U+255` as one byte ( because one byte is enough to fit them ), 
after that we store `Code Point`s, which need 2 bytes to encode them, as 2 bytes, that need 3 bytes as 3 bytes and so on 
( that need `n` bytes as `n` bytes ), very efficient. In `UTF-16` we store `Code Point`s starting at 2 bytes,
so `U+255` would be stored as `0000000011111111`, which may not be that much sufficient in terms of memory because 
of all the 0s there.

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

## TODO

- unriddle and add the URL example
- how UTF-8 works, how come the byte stuff is so weird?
