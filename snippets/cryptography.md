# TODO

- one way functions: hash functions ( sha256, md5 etc. ) are one-way functions and are keyless cryptography
- symmetric is when one key is used to encrypt / decrypt ( secret key cryptography )
    - Authentication with MAC ( using the HMAC algorithm )
    - Algorithms: AES, RC4, DES etc.
    - DES uses a 64-bit block size and a 56-bit key. DES is a block cipher, segmenting the input data into blocks of a specific size
    - Encryption with `AES` algorithm ( modes: ECB ( unsafe, used as a building block ), CBC ( safe, uses IV ), CTR ( safe, uses Nonce ) )
    - symmetric is faster than asymmetric
    - we use the Modular Arithmetic algorithm to get a shared secret key
    - Modular Arithmetic algorithm is when we do the colors example from the Crash Course
    - `aes-128-ctr` where `aes` is the algorithm ( symmetric, successor of `DES`, `3DES` etc. ), `128` - key length
      ( also accepts `192`, `256` ),
    - TODO: IV vs Nonce
- asymmetric is when 2 keys are used to encrypt / decrypt ( both _encryption_ and _authentication_ ) ( Public Key Cryptography )
    - algorithms are RSA, ECC etc. ( RSA is that trapdoor exponent thing based on prime factors )
    - private key decrypts, public encrypts - _encryption_ ( algorithms - `RSA` etc. )
    - private key encrypts, public key decrypts - _authentication_
    - argue a case for asymmetric encryption using a bank example
- you have to _encrypt_ first, then _authenticate_, then _send_
- password hashing
    - password hashing algorithms vs hashing functions
    - why hash passwords instead of encryption - if your private key is leaked, all passwords are out, hash functions
      cannot be reversed to get the original password even if we know the secret key
    - TODO: more on rainbow tables
- Encoding ( base64, hex - etc. )
- Compression ( gzip etc. )
- SSL handshake using both symmetric and asymmetric encryption
- TODO: actual examples of hash functions and cryptographic functions in NodeJS
