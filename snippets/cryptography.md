# TODO

- one way functions
- TODO: are one way functions in the crash course the same as hash functions ( sha256, md5 etc. )?
- hash functions ( keyless cryptography )
- TODO: Symmetric Cryptography vs Secret Key Cryptography
    - public and secret key also seem to be present in secret key cryptography when we use the special Modular
      arithmetic algorithms to get a shared secret key
- TODO: Asymmetric Cryptography vs Public Key Cryptography
- symmetric is when one key is used to encrypt / decrypt
    - Authentication with MAC ( using the HMAC algorithm )
    - Encryption with `AES` algorithm ( modes: ECB ( unsafe, used as a building block ), CBC ( safe, uses IV ), CTR ( safe, uses Nonce ) )
    - TODO: IV vs Nonce
- asymmetric is when 2 keys are used to encrypt / decrypt ( both _encryption_ and _authentication_ ) ( Public Key Cryptography )
    - private key decrypts, public encrypts - _encryption_ ( algorithms - `RSA` etc. )
    - private key encrypts, public key decrypts - _authentication_
- you have to _encrypt_ first, then _authenticate_, then _send_
- password hashing
    - password hashing algorithms vs hashing functions
    - TODO: why hash passwords instead of encryption
    - TODO: rainbow tables
- Encoding ( base64, hex - etc. )
- Compression ( gzip etc. )
