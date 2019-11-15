# How Compilers Work

So you write the source code of your program like this:

```js
function createSecretHolder(secret) {
  const obj = {};
  let secretProp = secret;
  obj.getSecret = () => secretProp;
  obj.setSecret = function(newSecret) {
    secretProp = newSecret;
  };
  return obj;
}
```

But the computer can't execute it: it only understands binary. Thus you need to pass your source code, which is basically
just a string of textual data, thru a compiler. Compiler is just a complicated low level cli tool that is going to take
that source code text and convert it to the 0s and 1s that the computer can understand. The compiler is going to create
a new executable file which contains all those 0s and 1s. If you try to run this executable file from the terminal
like so: `./someFile`, then the OS is going to take the 1s and 0s contained inside `someFile` and feed then right
into the computer. The computer will then generate the appropriate electronic signals, which, as a result, will make
it do whatever things you instructed it to do. Now let's look at it just a little bit closer to _really_ expand
our understanding.

Let's recall our _Elements of a Computer System Studies._ At the lowest level the computer's CPU can only add
and subtract numbers ( remember how computers add numbers by turning on the right bits and passing the carry
bit and all ) as well as write to memory. In other words there are no means to tell the computer: execute and if
statement, or: create a function. So, under the hood that executable file, which the compiler creates, with 1s and 0s
in it is just a set of instructions for the CPU to do. For instance, supposing that our executable file looks like this:

101010100101010101010101010110111010101110101010111101111111010011101010000001111010101100000110101011101010110101010000110101011010101001010101010101010101101110101011101010101111011111110100111010100000011110101011000001101010111010101101010100001101010110101010010101010101010101011011101010111010101011110111111101001110101000000111101010110000011010101110101011010101000011010101...

here
