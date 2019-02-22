# General

Javascript is a single threaded single concurrent language, meaning it can handle one task at a time or a piece of code at a time. It has a single call stack which along with other parts like heap, queue constitutes the Javascript Concurrency Model (implemented inside of V8). Let us first go through each of these terminologies:

<p align="center">
  <img src="../data/inside-JS.png">
</p>

__1. Call Stack__

It’s a data structure which records the function calls, basically where in the program we are. If we call a function to execute , we push something on to the stack, and when we return from a function, we pop off the top of the stack.

__2.Heap__

Objects are allocated in a heap i.e mostly unstructured region of memory. All the memory allocation to variables and objects happens here.

__3.Queue__

A JavaScript runtime contains a message queue, which is a list of messages to be processed and the associated callback functions to execute. When the stack has enough capacity, a message is taken out of the queue and processed which consists of calling the associated function (and thus creating an initial stack frame). The message processing ends when the stack becomes empty again. In basic words , these messages are queued in response to external async events(such as a mouse being clicked or receiving the response to an HTTP request), given a callback function has been provided. If, for example a user were to click a button and no callback function was provided — no message would have been enqueued.

# Regular Event Loop

<p align="center">
  <img src="../data/event-loop.png" width="520px">
</p>

This shows the execution order given JavaScript's Call Stack, Event Loop, and
any asynchronous APIs provided in the JS execution environment (in this example;
Web APIs in a Browser environment)

---

Given the code

```javascript
setTimeout(() => { 
  console.log('hi')
}, 1000)           
```

The Call Stack, Event Loop, and Web APIs have the following relationship

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  |                   |              | |               |
    console.log('hi') |                   |              | |               |
  }, 1000)            |                   |              | |               |
                      |                   |              | |               |
```
To start, everything is empty

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  | <global>          |              | |               |
    console.log('hi') |                   |              | |               |
  }, 1000)            |                   |              | |               |
                      |                   |              | |               |
```
It starts executing the code, and pushes that fact onto the Call Stack (here named
`<global>`)

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
> setTimeout(() => {  | <global>          |              | |               |
    console.log('hi') | setTimeout        |              | |               |
  }, 1000)            |                   |              | |               |
                      |                   |              | |               |
```
Then the first line is executed. This pushes the function execution as the
second item onto the call stack.

Note that the Call Stack is a _stack_; The last item pushed on is the first
item popped off. Aka: Last In, First Out. (think; a stack of dishes)

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
> setTimeout(() => {  | <global>          |              | | timeout, 1000 |
    console.log('hi') | setTimeout        |              | |               |
  }, 1000)            |                   |              | |               |
                      |                   |              | |               |
```
Executing `setTimeout` actually calls out to code that is _not_ part of JS.
It's part of a _Web API_ which the browser provides for us.
There are a different set of APIs like this available in node.

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  | <global>          |              | | timeout, 1000 |
    console.log('hi') |                   |              | |               |
  }, 1000)            |                   |              | |               |
                      |                   |              | |               |
```
`setTimeout` is then finished executing; it has offloaded its work to the Web
API which will wait for the requested amount of time (1000ms).

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  |                   |              | | timeout, 1000 |
    console.log('hi') |                   |              | |               |
  }, 1000)            |                   |              | |               |
                      |                   |              | |               |
```

As there are no more lines of JS to execute, the Call Stack is now empty.

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  |                   | function   <-----timeout, 1000 |
    console.log('hi') |                   |              | |               |
  }, 1000)            |                   |              | |               |
                      |                   |              | |               |
```
Once the timeout has expired, the Web API lets JS know by adding code to the
Event Loop.

It doesn't push onto the Call Stack directly as that could intefere with already
executing code, and you'd end up in weird situations.

The Event Loop is a _Queue_. The first item pushed on is the first
item popped off. Aka: First In, First Out. (think; a queue for a movie)

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  | function        <---function     | |               |
    console.log('hi') |                   |              | |               |
  }, 1000)            |                   |              | |               |
                      |                   |              | |               |
```
Whenever the Call Stack is empty, the JS execution environment occasionally checks
to see if anything is Queued in the Event Loop. If it is, the first item is moved
to the Call Stack for execution.

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  | function          |              | |               |
>   console.log('hi') | console.log       |              | |               |
  }, 1000)            |                   |              | |               |
                      |                   |              | |               |
```
Executing the function results in `console.log` being called, also pushed onto
the Call Stack.

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  | function          |              | |               |
    console.log('hi') |                   |              | |               |
  }, 1000)            |                   |              | |               |
                      |                   |              | |               |
> hi
```
Once finished executing, `hi` is printed, and `console.log` is removed from the
Call Stack.

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  |                   |              | |               |
    console.log('hi') |                   |              | |               |
  }, 1000)            |                   |              | |               |
                      |                   |              | |               |
> hi
```
Finally, the function has no other commands to execute, so it too is taken off
the Call Stack.

Our program has now finished execution.

End.
# Starved Event Loop

Below is an example of how code running in the current Call Stack can prevent
code on the Event Loop from being executed. aka; the Event Loop is _starved_.

---

Given the code

```javascript
setTimeout(() => { 
  console.log('bye')
}, 2)           
someSlowFn()
console.log('hi')
```

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  |                   |              | |               |
    console.log('bye')|                   |              | |               |
  }, 2)               |                   |              | |               |
  someSlowFn()        |                   |              | |               |
  console.log('hi')   |                   |              | |               |
```
To start, everything is empty

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  | <global>          |              | |               |
    console.log('bye')|                   |              | |               |
  }, 2)               |                   |              | |               |
  someSlowFn()        |                   |              | |               |
  console.log('hi')   |                   |              | |               |
```
It starts executing the code, and pushes that fact onto the Call Stack (here named
`<global>`)

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
> setTimeout(() => {  | <global>          |              | |               |
    console.log('bye')| setTimeout        |              | |               |
  }, 2)               |                   |              | |               |
  someSlowFn()        |                   |              | |               |
  console.log('hi')   |                   |              | |               |
```
`setTimeout` is pushed onto the Call Stack

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
> setTimeout(() => {  | <global>          |              | | timeout, 2    |
    console.log('bye')| setTimeout        |              | |               |
  }, 2)               |                   |              | |               |
  someSlowFn()        |                   |              | |               |
  console.log('hi')   |                   |              | |               |
```
`setTimeout` triggers the timeout Web API

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  | <global>          |              | | timeout, 2    |
    console.log('bye')|                   |              | |               |
  }, 2)               |                   |              | |               |
  someSlowFn()        |                   |              | |               |
  console.log('hi')   |                   |              | |               |
```
`setTimeout` is then finished executing, while the Web API waits for the
requested amount of time (2ms).

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  | <global>          |              | | timeout, 2    |
    console.log('bye')| someSlowFn        |              | |               |
  }, 2)               |                   |              | |               |
> someSlowFn()        |                   |              | |               |
  console.log('hi')   |                   |              | |               |
```

`someSlowFn` starts executing. Let's pretend this takes around 300ms to
complete. For that 300ms, JS can't remove it from the Call Stack

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  | <global>          | function   <-----timeout, 2    |
    console.log('bye')| someSlowFn        |              | |               |
  }, 2)               |                   |              | |               |
> someSlowFn()        |                   |              | |               |
  console.log('hi')   |                   |              | |               |
```
Meanwhile, the timeout has expired, so the Web API lets JS know by adding code
to the Event Loop.

`someSlowFn` is still executing on the Call Stack, and cannot be interrupted,
so the code to be executed by the timeout waits on the Event Loop for its turn.

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  | <global>          | function     | |               |
    console.log('bye')| someSlowFn        |              | |               |
  }, 2)               |                   |              | |               |
> someSlowFn()        |                   |              | |               |
  console.log('hi')   |                   |              | |               |
```

Still waiting for `someSlowFn` to finish...

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  | <global>          | function     | |               |
    console.log('bye')|                   |              | |               |
  }, 2)               |                   |              | |               |
> someSlowFn()        |                   |              | |               |
  console.log('hi')   |                   |              | |               |
```
`someSlowFn` finally finished!

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  | <global>          | function     | |               |
    console.log('bye')| console.log       |              | |               |
  }, 2)               |                   |              | |               |
  someSlowFn()        |                   |              | |               |
> console.log('hi')   |                   |              | |               |
```

The next line is executed, pushing
`console.log` onto the Call Stack

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  | <global>          | function     | |               |
    console.log('bye')|                   |              | |               |
  }, 2)               |                   |              | |               |
  someSlowFn()        |                   |              | |               |
> console.log('hi')   |                   |              | |               |

> hi
```

We see `hi` output on the console thanks to `console.log`

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  |                   | function     | |               |
    console.log('bye')|                   |              | |               |
  }, 2)               |                   |              | |               |
  someSlowFn()        |                   |              | |               |
  console.log('hi')   |                   |              | |               |

> hi
```

Nothing left to execute, so the special `<global>` is popped off the Call Stack.

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  | function        <---function     | |               |
    console.log('bye')|                   |              | |               |
  }, 2)               |                   |              | |               |
  someSlowFn()        |                   |              | |               |
  console.log('hi')   |                   |              | |               |

> hi
```

This frees up the JS execution environment to check the Event Loop for any code
which needs to be executed.

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  | function          |              | |               |
>   console.log('bye')| console.log       |              | |               |
  }, 2)               |                   |              | |               |
  someSlowFn()        |                   |              | |               |
  console.log('hi')   |                   |              | |               |

> hi
```
Executing the function results in `console.log` being called, also pushed onto
the Call Stack.

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  | function          |              | |               |
    console.log('bye')|                   |              | |               |
  }, 2)               |                   |              | |               |
  someSlowFn()        |                   |              | |               |
  console.log('hi')   |                   |              | |               |

> hi
> bye
```

Once finished executing, `bye` is printed, and `console.log` is removed from the
Call Stack.

Notice that by this point, it is at least 300ms _after_ the code originally
requested the `setTimeout`. Meaning even though we asked for it to be executed
after only 2ms, we still had to wait for the Call Stack to empty before the
`setTimeout` code on the Event Loop could be executed

_Note: Even if we didn't have `someSlowFn`, `setTimeout` is clamped to 4ms as
the mimimum delay allowed in some cases_

---

```text
        [code]        |   [call stack]    | [Event Loop] | |   [Web APIs]  |
  --------------------|-------------------|--------------| |---------------|
  setTimeout(() => {  |                   |              | |               |
    console.log('bye')|                   |              | |               |
  }, 2)               |                   |              | |               |
  someSlowFn()        |                   |              | |               |
  console.log('hi')   |                   |              | |               |

> hi
> bye
```
Finally, there are no other commands to execute, so it too is taken off the Call
Stack.

Our program has now finished execution.

End.