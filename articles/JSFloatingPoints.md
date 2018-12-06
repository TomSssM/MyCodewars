# What Every JavaScript Developer Should Know About Floating Points

[Original Source](https://modernweb.com/what-every-javascript-developer-should-know-about-floating-points/)

## Floating Points

To figure out what a floating point is, we first start with the idea that there are many kinds of numbers, which we will go through. We call 1 an integer – it is a whole number with no fractional values in it.

½ is what’s called a fraction. It implies that the whole number 1 is being divided into 2. The concept of fractions is a very important one in deriving floating points.

0.5 is commonly known as a decimal number. However, a very important distinction needs to be made – 0.5 is actually the decimal (base-10) representation of the fraction ½. This is how ½ is represented when written as a base-10 number – for this article, we will call it the dot notation. We call 0.5 a finite representation because the numbers in the representation for the fraction are finite – there are no more numbers after 5 in 0.5. An infinite representation would for example be 0.3333... when representing ⅓. Again, this idea will be important later on in our discussion.

There exists another way of representing numbers other than as whole numbers, fractions or decimal notations. You might have actually seen it before. It looks something like this: 6.022 x 1023 (Trivia: That is Avogadro’s number, which is the number of molecules in a mole of chemical solution). It’s commonly known as the standard form, or scientific notation. That form can be generalized to something that looks like this:

D<sub>1</sub>.D<sub>2</sub>D<sub>3</sub>D<sub>4</sub>...D<sub>p</sub> x B<sub>E</sub>

The general form is called a floating point.

The sequence of p digits of D, D1.D2D3D4...Dp are called Significands or Mantissa. p is the number of significant digits, commonly called the Precision. x follows the mantissa and is part of the notation (the multiplication symbol that will be used throughout this article will be *). The Base digit comes after, followed by the Exponent. The exponent can be a positive or negative number.

The beauty of the floating point is that it can be used to represent any number at all. For example, the integer 1 can be represented as 1.0 x 10<sup>0</sup>. The speed of light can be represented as 2.99792458 x 10<sup>8</sup> meters per second. 1/2 can be represented in base-2 as 0.1 x 2<sup>0</sup>.

## Removing the Radix Point

In the above examples, we’re still quite tied to having a radix point (the dot in the number). This presents some problems when it comes to representing something in binary. Given an arbitrary floating point, say π, we can represent it as a floating point as such: 3.14159 x 10<sup>0</sup>.

In binary, it would look something like this: 11.00100100 001111.... Assuming that the number is represented in a 16 bit manner, this means the digits would be laid out in the machine like this: 11001001000011111. The question now is this: where is the radix point supposed to be? This doesn’t even yet involve the exponent (we implicitly assume the base is base-2).

What if the number was 5.14159? The integral part would be 101 instead of 11, requiring one more bit field. Of course, we could specify that the first n bits of the field belong to the integer part (i.e. the left of the radix point), and the rest belongs to the fractional parts, but that’s the topic for another article about fixed point numbers.

Once we remove the radix point, then we only have two things to keep track of: the exponent and the mantissa. We can remove the radix point by applying a transformation formula, making the generalized floating point look like this:

<p>D<sub>1</sub>.D<sub>2</sub>D<sub>3</sub>D<sub>4</sub>...D<sub>p</sub> / (B<sup>p - 1</sup>) * B<sup>E</sup>

This is where we derive most of our binary floating points from. Note that the significand is now an integer. This makes it far simpler to store a floating point number in a machine. In fact, the most widely used method of representing floating points in binary is with the IEEE 754 format.

## IEEE 754
The representation of floating points in JavaScript follows the format as specified in IEEE-754. Specifically it is a double-precision format, meaning that 64 bits are allocated for each floating point. Although it is not the only way to represent floating points in binary, it is by far the most widely used format. The format is represented in 64-bits of binary like so:

IMG

One might notice that the layout of the machine representation is a little different from the written representation of a floating point – this is a matter of convention. Of the 64 bits available, 1 bit is used for the sign – whether a number is positive or not. 11 bits are used for the exponent – this allows for up to 1024 as an exponent. The remaining 52 bits are allocated for the mantissa. If you’ve ever wondered why there were things such as +0 and -0 in JavaScript, the sign bit explains that quite a bit – all numbers in JavaScript have the sign bit. Infinity and NaN are also encoded in the floating point – with 2047 as a special exponent. If the mantissa is 0, it is either a positive or negative Infinity. If it is not, then it is a NaN.

## Rounding Errors

With the introduction to floating points done, we now enter a more prickly topic – rounding errors. It is the bane of all developers who develop with floating point numbers, JavaScript developers doubly so, because the only number format available to JavaScript developers are floating point numbers.

It was mentioned earlier that fractions like ⅓ cannot be finitely represented in base-10. This is actually true for all numbers represented in any base. For example, in base-2 numbers, 1/10 cannot be finitely represented. It is represented as 0.00110011001100110011.... Note that 0011 is infinitely repeating. It is because of this particular quirk that rounding errors are caused.

But first, a primer on rounding errors. Consider one of the most famous irrational numbers, Pi: 3.141592653589793.... Most people remember the first 5 mantissa (3.1415) really well – that’s an example of rounding down, which we will use for this example. The rounding error can hence calculated as such:

( R - A ) / B<sup>p - 1</sup>

…where R stands for the rounded number, and A stands for the actual number. B is the base as previously seen, as was p, which is the precision. So the oft-remembered Pi has a rounding error of: 0.00009265...).

While this does not sound quite as severe, let’s try this idea with base-2 numbers. Consider the fraction 1/10. In base-10, it’s written as 0.1. In base-2, it is: 0.0011001100110011.... Assuming we round to just 5 mantissa, it’d be written as 0.0001. But 0.0001 in binary is actually 1/16 (or 0.0625)! This means there is a rounding error of 0.0375, which is rather large. Imagine doing basic mathematics like 0.1 + 0.2, and the answer returns 0.2625!

Fortunately, the floating point specification that ECMAScript uses specifies up to 52 mantissa, so the rounding errors are quite small – the specification specifically details the expected rounding errors for most numbers. Because conducting arithmetic operations on floating points causes errors to build up over time, the IEEE 754 specification also includes specific algorithms for mathematical operations.

However, it should be noted that despite all that, the associative property of arithmetic operations (like addition, subtraction, multiplication and subtraction) are not guaranteed when dealing with floating points, even at high precision ones. What I mean by that is ((x + y) + a + b) is not neccessarily equal to ((x + y) + (a + b)).

And that is the bane of JavaScript developers. For example, in JavaScript, 0.1 + 0.2 === 0.3 will yield false. Hopefully, by now you understand why. What is worse of course, is the fact that rounding errors add up with each successive mathematical operation performed on it.

## Handling Floating Points in JavaScript

There have been plenty of suggestions, both good and bad, when it comes to dealing with JavaScript numbers. Most of these suggestions have to do with rounding numbers in JavaScript before or after arithmetic operations.

Among the poorer suggestions I’ve seen so far is storing everything as an integer number (not the type) for operations, and then formatting it for display. An example can be seen in Stripe – the amounts are stored in cents. This has a notable problem – not all currencies in the world are actually decimal (Mauritiana). Also, there are currencies in the world where there are no subunits (Japanese Yen) or non-100 subunits (Jordanian Dinars), or more than one subunit (Chinese Renminbi). Eventually, you’d just recreate the floating point – probably poorly too.

The best suggestions I’ve seen to handle floating points have been to use properly tested libraries like sinfuljs or mathjs. I personally prefer mathjs (but really, for anything mathematics related I wouldn’t even go near JavaScript). BigDecimal is also extremely useful when arbitrary precision  math needs to be done.

Another oft-repeated bit of advice is to use the built-in toPrecision() and toFixed() methods on numbers. A big warning to anyone thinking of using them – those methods return strings. So if you have something like:

```javascript
function foo(x, y) {
    return x.toPrecision() + y.toPrecision()
}

> foo(0.1, 0.2)
"0.10.2"
```

The built in methods toPrecision() and toFixed() are really only for display purposes. Use with caution! Now go forth and multiply (safely)!
