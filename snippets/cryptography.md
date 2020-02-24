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

- Verify an algorithm to reverse a hash function or a cryptography algorithm like AES provided we have enough
- Reread the paragon article to make sure we didn't leave anything out
  computing power
- IV vs Nonce
- More on rainbow tables
- Read the rest of the cryptography articles
