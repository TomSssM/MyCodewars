## Sketch

Here is the map of cryptography:

TODO: picture of the map of cryptography

### One Way Functions

Cryptography is built upon the concept of one-way functions. One way functions take some input ( number, text, raw binary data, doesn't matter ) and produce an output. The point of one way functions is that if you have an output of a one way function, you won't be able to find out what the input was. In other words, given the output you cannot reverse a one way function to get the input.

TODO: an example from stack overflow with addition

Another example is the expanentiation. Imagine we come up with 3 random numbers: 12, 34, 79. A one way function might look something like this:

TODO: one way function below in JS

So as you can see it does the following: 12^34^79 = <very big number>. Now knowing that <very big number> equals 12^x^y, can you tell what x and y were? The answer is nope, in order to find out the values of x and y you need to start invoking the one way function ( which does 12 ^ x ^ y ) with all the possible values of x and y until it produces an output that equals <very big number>. In other words, to find out <very big number> you need to guess x and y. It is callled a brute force approach. In our naive example above it actually works, but what if we our numbers were not 12, 34 and 79, but something bigger like: 366363732 ^ 3773377372 ^ 7373737373 = <really huge number>. Now in order to guess what x and y were given only <really huge number> the computer would need more time than in the last example, a lot more.

Note: The output of a one way function is sometimes called a digest.

Now let's look at an even cooler one way function. Some time ago we have already implemented a function that calculates prime factors of a number:

TODO: link to it

For small numbers it works pretty well. But if you try to calculate the prime factor of a bug number like 8473737382728282, the computation will actually take dozens of years, years. That makes such functions potejtionally irriversible. Only quantum computers can reverse such functions and most attackers don't have those.

The only other thing that can break a one way function is algebra, which is why

TODO: quote from stack overflow

### Hash Functions

Hash Functions are one way functions that take an input of artitary length ( number, string, buffer etc. of any length ) and produce a fixed size hash. Hash is just a bunch of characters that is going to be unique for a this particular combination of characters that we pass as an input. Here is an example of a hash function called md5:

TODO: an example where we do the same input twice ( add: same as first ) with a slightly different one in between.

As you can see, even the slightest change in the input produces a drastically different output.

There are other hash functions like:

TODO: full list here

md5 is the fastest but it is not used as a security verification ( for instance, hashing passwords in a data base, more on that later on ) because it has "collisions".

Collisions happen in hash functions when two different inputs produce the same hash. Here is an example of a collision in md5:

TODO: here

Attackers can exploit this downside of md5 for evil purposes. That is why other hashing functions like TODO: here are used nowadays that have not been known ( at least as of 2020 ) to produce a collision.

However, md5 is actually still used for yet another purpose. You see, this feature of hash functions to produce drastically different outputs because of the least changes in the input is incredibly useful Data Integrity. Data Intergrity is making sure that a file didn't get corrupt because of some influence. md5 is the prime candidate here because it is the fastest. An example of file corruption is when, for example, one byte disappears from the file or a bit gets swapped from 1 to 0 and so on. Usually logical or physical errors in the hardware or file system may lead to that as well as errors when downloading the resource from the Internet. For instance the user may want to download some important file. In order to make sure that the user gets *exactly* the same ones and zeroes, which the file consists of, as there are on your server, you can use md5 to calculate a hash of the original file, then have the user calculate the hash of the file he downloads and if the hashes match, no file corruption occurred.

Every file cosists of bits, 1s and 0s, and, as we said in previous articles, we can take, for example, every byte ( 8 bits ) of the file and interpret it as a number ( from 0 - 255, or 0 - ff in hexadecimal ). As a result we get back an array of numbers, called a buffer since it is a representation of the 1s and 0s stored on the hardware, of the raw binary data. Then we can feed this buffer consisiting of numbers to a hash function ( for instance join all numbers into one very very long number, or chunk by chunk ) and get back a hash that is going to be unique for that particular file ( this hash is sometimes called a checksum of the file ), in other words only the 1s and 0s of that very file can produce such a checksum. Since hash functions can take an input of any length we are not going to be limited by a file size ( it will simply take longer for large files ). Collisions are not going to be a problem here either as most inputs that produce the same hash are drastically different from each other ( TODO: an example ). A text file containing"hello world" is very unlikely to get corrupted so bad that it becomes "TODO: here".

As a side note, this very same technique is used by The Holidays to ensure Data Integrity.

Now you may be wondering how hash functions relate to cryptography. Let's read on!

### Cryptography

Cryptography is a reversible process of transforming some data ( called plaintext ) to ciphertext and back again. Transformation from plain text to ciphertext is called Encryption, and transformation from ciphertext to plain text is called Decryption.

In order to be able to transform data to ciphertext and back again, cryptography functions use a key. Now a key is just some random sequence of numbers or letters or other characters, like "27j27as73hes27" might be considered a key ( even though not a very strong one ). That is how cryptography funtions can be reversed, hash functions cannot and don't take a key as a 2nd argument either ( which is why hash functions are sometimes called a keyless cryptography ).

Cryptography serves 2 purposes:

it makes sure that only the recipient with the right key can decrypt the message, in other words that 2 people can communicate without anybody being able to find out what they say to each other

it is also used to verify authenticity, in other words, that whatever we received came from the right source

To accomplish the 2 purposes above there are many cryptographic functions. Some functions take an input and use one key to encypt that input ( as we have seen above ), some use 2 keys ( a private key and a public key, more on that later on ). If a function takes one key, it is called Symmetric Cryptography ( or Secret Key Cryptography ), if a function uses two keys, it is called Asymmetric Cryptography.

### Symmetric Cryptography

In symmetric cryptography we use the same key to encrypt and decrypt data. There are many algorithms for that:
AES, RC4, DES etc.

TODO: an example

Thus if 2 people want to secretly communicate with each other, they need to both have the same key ( that nobody else knows ). Then one side encrypts data with the key and sends it to the other side. The other side uses the same secret key to decrypt data. Since nobody else has the secret key, nobody else can decrypt data to understand what the 2 sides are talking about. A more real life example is the use of symnetric cryptography when the browser encypts all the HTTP data it sends to the server and then the server defypts it. This way even if somebody intercepts that HTTP data flowing between the client and the server ( the HTTP data ), that somebody won't be able to understand anything since this data he intercepts is actually ciphertext and he doesn't have the secret key to decrypt it. Thus all the browser and the server need to do in order to be able to communicate secretly is make sure that nobody steals the secret key.

OK, we talked about symmeteic cryptography being used to accomplish the 1st purpose of cryptography ( that intended recipient receives the data ), but what about the 2nd purpose of cryptography: data authenticity ( making sure that the data we receive comes from the right source and not from some evil hacker ).

Let's talk more about the algorithms used in symmetric cryptography.

DES uses a 64-bit block size and a 56-bit key. There is an algorithm called DES. DES is a block cipher, meaning it segments the input data into blocks of a specific size and then encypts each of them:

But DES is not used anymore, instead we have an algorithm called AES, a successor of older algorithms like DES, 3DES etc. It is also a block cipher.

AES has three modes in which it can be executed:

ECB
CBC
CTR

TODO: picture.

So AES in ECB mode splits text into blocks of equal size and encrypts each block with a secret key.  

It is good because we can easily paralyze the tasks of encypting each block of plain text ( paralyze means if data consists of n blocks, we can run n tasks of encypting each block on n number of threads so that all the blocks can be in the process of encyption at the same time, more or less. As a result, to encrypt n blocks of data, it takes almost as little time as encrypting 1 block of data ). Yet DES is not safe because if one segment of plain text repeats, a segment of ciphertext will also repeat. Here is an example:

TODO: here

As you can see "ff" repeats in the original text ( plain text ) and there is also segment "dd" that repeats in the ciphertext ( output of DES ). A more robust example of that is when we want to encrypt an image:

TODO: here

Here DES is passed a bunch of pixels ( and a pixel is just four bytes, four numbers: one byte for red, one for green, one for blue and one for transparency ( alpha channel ) ). See how because many pixels repeat one after another, the encypted image barely differs from the original one.

That is why AES should not be executed in ECB mode. ECB mode is a building block for other modes: CBC and CTR modes.

AES in CBC mode takes as input not only text and a key but also an IV ( Initialization Vector ):

TODO: picture here

As you can see, before encrypting every block of text, it first mixes up the text with an IV ( TODO: or the previous ciphertext ). We can't paralyze that but in this mode even if the plain text repeats, the ciphertext doesn't:

TODO: an example

Here is the same image encrypted in ECB mode:

TODO: here

AES in CTR mode works almost the same but instead of IV it takes in a nonce. The difference between IV and nonce is very trivial.

Thus in order to securely encrypt a block of data we would need to do something like this:

TODO: example

As you can see, we also send an IV ( unencrypted ) so that the intended recipient can use it to decrypt our ciphertext. Since only the intended recipient has the secret key, nobody else will be able to decypt our message ( despite the fact that we send IV unencrypted ). 

The intended recipient ( client or another server, for example ) would need to decrypt our ciphertext like so:

TODO: example

As was mentioned, aunthentication is making sure that the data you receive comes from the intended source. Authentication also makes sure that the data you receive was not tempered in any way ( meaning modified by an attacker ).

In symmetric cryptography message authentication is done by calculating MAC ( message authentication code ). To calculate such a MAC we can use a symmetric cryptography algorithm called HMAC.

HMAC is a keyed hash function. It takes in an input and a key and produces a hash. Keyed hash function is the same as a usual hash function in that it takes in a varied size input and produces a fixed size hash, which cannot be reversed, and which would be unique for the input text and change drastically because of the least changes in the input text. It's only difference is that it additionally takes in a key, and then mixes that key with the input text:

TODO: picture here

Here is an example:

TODO: example

As you can see, in order to get hash "<hash example>", we need to know *both* the input text and a secret key. Now imagine we get some data from the Internet and we need to verify that the data comes from the trusted source. The only thing that connects us and the trusted source is that we both have the secret key that nobody else knows. If we get a MAC along with the message, we can use our own secret key to calculate our own MAC of the message and if our own MAC matches the MAC that we receive from the Internet, we can be sure that the message definitely came from the right source as only somebody with the same secret key ( thus only the trusted source ) would have been able to calculate such a MAC.

Here is an example, first the server would need to calculate a MAC of the data it wants to send ( to sign the data ):

TODO: an example

Then the client gets the data and the MAC from the server. In order to verify that the data indeed came from the trusted server, the client would need to calculate its own MAC and compare its with the one it receives:

TODO: example

That is how the client would know that the data comes from the trusted source. Also, if an evil hacker were to modify the data in any way, the MAC would be different and the client wouldn't process that data.

Also it is worth mentioning that Encryption without Authentication is not secure. You need to encypt the data first, then authenticate it ( with HMAC for instance ), and only after that send it to the recipient. The recipient needs to: verify that the MAC of the encrypted data matches, only then decrypt and process the data, like so:

TODO: example of server and client

You might be wondering why that if we encypt data already. Well, the reason is: we also send an IV along with the ciphertext and there were cases where attackers were able to change the IV in such a clever way that the ciphertext ( when run thru AES in CBC mode ) produced a result that gave attackers access to protected resources.

All right, this whole time we were talking about Authentication and encryption and stuff and it all relied upon the fact that both the intended recipient and the source had the same secret key. But how do we get both sides to share that secret key? We cannot just have the server send the secret key to the client over the Internet, the secret key will be instantly intercelted by an attacker and won't be secret anymore. So the question is how to get both sides to have the secret key without ever sending the secret key from one side to the other.

In symmetric cryptography we use the Modular Arithmetic Algorithm to get a shared secret key.

Here is a simplified overview of how it works. First both sides agree on the seed value like 12 for instance. Then both sides come up with random secret values: side A comes up with 14, for instance, and side B comes up with 29. We don't tell these secret values to anybody. After both sides do some irrversible operation with the seed and their secret value, like side A does 12^14 = <number a>. Side B does the same: 12^29 = <number b>. Then both sides exchange the values they got, side A sends <number a> to side B and side B sends <number b> to side A.

Then side A raises the number it just received from side B to the power of its secret value: <number b> ^ 14 = ff. Side B does the same with side A's secret value and its own secret value: <number a> ^ 29 = ff. And look, now both side A and side B have the same value because:

N ^ X ^ Y = Z
N ^ Y ^ X = Z
N ^ X ^ Y = N ^ Y ^ X

And only <number a> and <number b> were ever sent over the network during the whole process. Even if an attacker intercepts both  <number a> and <number b>, he will never be able to find out that the secret value of side A was 14 because 12^14=<number a> is an irreversible operation. Knowing only <number a> we cannot tell which number needs to be raised to the power of which number to calculate it. If we use some computationally expensive operation like Prime Factors above with incredibly huge numbers, the attacker won't be able to use even brute force.

If this process still doesn't make sense, do check out the Crash Course, they explain it pretty well.

In comparison to assymetric cryptography, symmetric cryptography is faster.

But Assymetric Cryptography is also very important, let's talk about that.

### Assymetric Cryptography

Assymetric Cryptography, or Public Key Cryptography, is when one key encrypts and the other key decrypts instead of having the same key that both encrypts and decrypts.

There is a public key and a private key. Public Key is available for everytone to see and have ( even the attacker ) and a private key needs to be kept secret from everyone. To implement the 1st purpose of cryptography, encyption, we use a public key to encypt data and a private key to decrypt.

Public and private key are mathematically related to each other such that data encypted with one public key can only be decryoted with the corresponding private key. Also you cannot calculate the private key from the public key but you can very easily calculate public key from the private key.

Imagine we want to secretly communicate with a client. We give the client our public key. Whenever the client wants to send us some data, it uses our public key to encypt data. When we receive the encypted data from the client, we use our private key to decrypt it. The attacker will be able to intercept only our public key. It is impossible to calculate a private key from the public key and it is obviously impossible to decrypt the message using public key. So all the attacker can do with the stoled public key is simply send us some encypted data but he won't be able to decrypt anything.

If *we* want to send the client some secret data, we would need the client's public key and all the rest is the same.

The algorithm used to implement public-private key encryption is called RSA. RSA is actually a special hash function with a trapdoor. Trapdoor allows hash functions to be reversed if you know the special value. The special value is the secret key in this case ( academy explains the math behind RSA pretty well, it is also in a way based on prime factorization ).

There is a use case where Assymetric Cryptography is more convenient than symmetric cryptography. Imagine a bank wants to communicate with millions of clients such that clients are going to be sending requests to bank to process their data. Since it is a bank everything needs to be super secure so we are going to use encryption. *But* if we were using symmetric cryptography, then bank would need to store millions of private keys of every client ( to decrypt data coming from each client ). It is inconvenient. What if one of those many keys gets compromised. But with assymetric cryptography it is now the clients that need to store bank's public key to send data to the bank. The bank in turn needs to keep track only of its own private key to decrypt data. A single private key is much less likely to get compromised than millions of shared secret keys and is much more convenient!

Now let's talk about data authentication in assymetric cryptography.

Sometimes, in assymetric cryptography, private key encrypts data and public key decrypts. Right now you might be scratching your head and thinking that it is a lunacy to let anyone out there be able to decrypt everything you transmit. Well, on the other hand it does give us a very significant advantage over symmetric cryptography. Just think about it: we receive some text and some other ciphertext, and we want to verify that the text came from the right source. All we have to do is to decrypt the ciphertext we received using the public key of the source and if the decrypted text matches the actual text of the message, then we can be sure that the text came from the right source because only the right source has the private key to create the ciphertext such that it decrypts to the actual text. It is called a digital signature.

TODO: example

Do note that we cannot verify it the same way using symmetric cryptography. In symmetric cryptography, we would need to use the shared secret key to generate a MAC to compare against. So only someone with the secret key would be able to validate that the data came from the trusted source. Thus with symmetric cryptography if the server wanted to prove that the data came from itself, in other words if the server wanted to authenticate the data, it would need to share its secret key with everyone, which defeats the whole purpose of the secret key. With assymetric cryptography we don't have such a problem because we have a private-public key pair.

Digital signature is a lot more secure than calculathing the sha255 hash of the file ( even with a collision free, secure function like sha255 ). You see, sometimes on the web sites there is a sha255 hash of the file to verify that the attacker didn't swap the contents of the file with a malicious program. Most users would re-calculate the hash of the file they downloaded on their local machine and if their sha255 hash matches the one on the web site they will assume that the contents indeed are the same as what the source claims it to be. But if the attacker was able to replace the contents of the file the user downloads, he will just as easily be able to replace the sha255 hash on the website. He will take the contents of his malicious program, generate a sha255 hash for them, and place that hash on the website. When the user sees that the checksum matches the one on the website, he will execute the malicious program. Profit. With digital signatures such a scenario is impossible as it is a lot harder to compromise all the public private keys stuff.

### Real Life Usage

In real world both assymetric and symmetric cryptography techniques are used side by side. The examples are network protocols like SSL handshake used in HTTPS, hashing passwords in Data Base or SSH.

#### SSH

TODO: add SSH
TODO: add HTTPS
TODO: not cryptography
TODO: todos in the article

#### Password Hashing

When the user submits a password you should never store it in plain text ( meaning unchanged ) in the Data Base. If your data base gets compromised, then an attacker will be able to find out all the passwords of all your users. What we do instead is we calculate an sha255 hash of the password and store the *hash* in the data base and not the password itself:

TODO: example

Now if your data base gets compromised an attacker will only see a bunch of washes but he will be unable to learn everything from them since hashes cannot be reversed to reveal the original password. What is good about the hash is that when the user submits a password again we will be able to re-calculate a hash and compare it with the one stored in the data base, then throw the original password away. This way, even the server doesn't know the user's password, only the user.

Do note that we don't encrypt passwords. Encryption is a reversible process if you have a secret key. If the attacker compromises the data base and steals the secret key, then all the passwords are out. It is far too great a responsibility for a single secret key. With hashed passwords even stealing the secret key doesn't help find out the passwords since hashes are practically irreversible, not unless you have a super powerful quantum computer to brute force it, but if you do why even steal the data base in the first place, just submit the login form with all the possible combinations in the world ( though of course we can block the user after a certain number of unsuccessful attempts ). Plus password hashes are made deliberately difficult to compute, which is especially important considering that the hardware is constantly becoming more and more powerful.

TODO: the table in the paragon article

The only thing that hashing passwords is not safe from is rainbow tables. Very many users use incredibly simple passwords like QUERTY or hello and so on. Rainbow tables are collections of precomputed hashes of such simple password. Somebody went ahead, computed many hashes for the most common passwords and put the hashes in the table. This way the attacker doesn't have to compute the hashes, he simply can look if maybe some of the hashes in the data base are the same as those in the rainbow table and already compromise some user accounts just because they had a common password. Users with common passwords need to he protected too! That is why you should always use "salt" when hashing padsowrd. Salt is a random string that is midlxed into the password before the padsowrd is hashed. If the user's password is QWERTY for examle, we would take a random salt like 7373637383 and mix it into the ladsword like so:

Q737E3637RT3Y83

Salt should be unique per user so that 2 users with the same common password will have different hashes

TODO: example

Thus using salt thwarts rainbow tables.

## Plan

- one way functions ( `plaintext` to `digest` )
    - hard to get the original data from the output
    - the only way to do so is by trying all the possible combinations
        - called _brute force_
        - example of how it may be difficult on big numbers with prime factors
    - hash functions are an example of one-way functions
        - varied size input, fixed size output, the least variation produces a drastically different output
        - examples are `sha256`, `md5` etc.
        - what is _hashing_
        - what is checksum
- what is cryptography
    - reversible process of transforming `plaintext` to `ciphertext` and back again
    - what is _key_
    - hash functions are _Keyless Cryptography_
    - cryptography has 2 functions:
        - it makes sure that only the recipient with the right key can _decrypt_ the message
        - it is also used to verify authenticy ( in other words, that whatever we received came from the _right_ source )
- symmetric cryptography ( Secret Key Cryptography )
    - the same key to encrypt and to decrypt
    - Authentication thru _Keyed Hash Functions_
        - Authentication with MAC ( using the HMAC algorithm )
    - algorithms
        - AES, RC4, DES etc.
        - DES uses a 64-bit block size and a 56-bit key. DES is a block cipher, segmenting the input data
          into blocks of a specific size
        - AES algorithm ( modes: ECB ( unsafe, used as a building block ), CBC ( safe, uses IV ), CTR ( safe, uses Nonce ) )
        - `aes-128-ctr` where `aes` is the algorithm ( symmetric, successor of `DES`, `3DES` etc. ), `128` - key length
          ( also accepts `192`, `256` )
    - why authenticate at all and why we need to authenticate `ciphertext` ( the IV tempering example )
    - in symmetric, or secret key cryptography, we use the _Modular Arithmetic Algorithm_ to get a shared secret key
        - _Modular Arithmetic Algorithm_ is when we do the colors example from the Crash Course
    - symmetric is faster than asymmetric
    - you have to _encrypt_ first, then _authenticate_ the `ciphertext`, then _send_
    - implementing the thing above in NodeJS ( if possible )
- asymmetric cryptography
    - asymmetric is when 2 keys are used to encrypt / decrypt ( Public Key Cryptography )
    - private key decrypts, public encrypts - _encryption_
    - private key encrypts, public key decrypts - _authentication_
    - encryption algorithms are RSA, ECC etc.
    - RSA is that trapdoor exponent thing based on prime factors
    - first reason why it exists: the bank server, for instance, doesn't have to have a million shared secret keys
      to securely communicate with clients
    - checksums are not secure
        - md5 is not secure at all because of collisions but it is fast so use it for data corruption check
        - why using even safe hash fucntions like sha256 is not secure
            - because you want to verify authenticy, an attacker could have replaced both the file content
              and the hash too
    - second reason: digital signatures are better because 3rd party that wants to verify the authenticy of the data doesn't have to
      have the signer's private key. With keyed hash functions such a situation is impossible: only the interneded recipient
      with the secret private key can verify the authenticy, which doesn't pan out well if you are just a user and not the
      intended server which has the other secret key
- real life usage
    - password hashing
        - password hashing algorithms vs hashing functions ( the table in the paragon article )
        - why hash passwords instead of encryption - if your private key is leaked, all passwords are out,
          but since hash functions cannot be reversed to get the original password even if we know the secret key
          the hashes stored thus don't reveal the original passwords while allowing us to verify them upon user login
        - talk about salt and rainbow tables
    - SSL handshake using both symmetric and asymmetric encryption
    - SSH using both symmetric and asymmetric encryption
        - generate shared secret key and use it to secure all the communication
        - use the client's public key to encrypt a text
        - send it to client
        - the client decrypts it with his private key and sends back the result
        - the server verifies the result decrypted by client with the original text
        - if everything is OK the server trusts that the client is indeed who he claims to be because the client has the
          expected private key
        - after that all the communication is held via a secure tunnel
        - a secure tunnel means all the data is encrypted and decrypted between the server and the client using that same
          shared secret key generated in the very beginning ( this key, unlike the public and private key pair used to
          authenticate the client, is actually session-based )
- not cryptography
    - Encoding ( base64, hex, percent encoding - etc. ) - used for transport
    - Compression ( gzip etc. ) - used for speed

## TODO

- Reread the paragon article to make sure we didn't leave anything out anything
- IV vs Nonce
- More on rainbow tables
