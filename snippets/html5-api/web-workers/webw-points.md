# Points on Web Workers

The points to remember about Web Workers are here.

First of all, do keep in mind that Web Workers are just
a way to simulate concurrency in JS. So, believe it or not, when a Web Worker is created ( supposing that the file
whose path we feed to a constructor exists ) an isolated thread is allocated for it. That is why the code for a Web
Worker needs to be contained in a separate file. Thus a Web Worker can perform tasks without blocking the user
interface. However, since creating Web Workers spans real OS threads you might think that this will create 
concurrency problems. In reality, however, the way that Web Workers are built achieving such a negative effect is 
nearly impossible.

Another point is, if we can't modify DOM with Web Workers then how do we do it if we absolutely have to? For example
we need to syntax color 20000 lines of code on the page. Well, the answer is simple since we _are_ after all able to
post messages to the page. Thus, we can perform the entire CPU hungry task of syntax highlighting in a Web Worker
thread, but upon processing every 50 lines for example we could send something like a JSON object telling which word
should be which color, a less CPU hungry operation that shouldn't block the UI :)