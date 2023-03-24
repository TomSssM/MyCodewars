# Confusing DOM Snippets

## Full Width

Apart from `offsetWidth` you can also get the full width ( content width + padding + border ) of the element like so:
```javascript
parseInt(getComputedStyle(elem).width, 10)
```

## Appening Parent to Child

We can't really do `appendChild` if the child we are appending is in fact parent of the target element. The following
code throws an error:
```html
<div id="parent">
  <div id="child"></div>
</div>
<script>
  const child = document.querySelector('#child');
  const parent = document.querySelector('#parent');
  child.appendChild(parent); // Error
</script>
```

## textContent in plain HTML

Don't forget that writing HTML via `textContnet` property replaces `<`, `>`, etc. with encoded values:
```html
<p id="text">Hi!</p>
<script>
  const p = document.querySelector('#text');
  p.textContent = p.outerHTML;
  alert(p.innerHTML); // &lt;p id="text"&gt;Hi!&lt;/p&gt;
</script>
```

## preventDefault() bubbles
A click event will happen on `<a>` yet the default-prevented will bubble and cancel default for `<a>` as well as all
the ancestors of `#elem`
```html
<a href="https://developer.mozilla.org/en-US/docs/Web">
  <span>
    <span id="elem" onclick="event.preventDefault()">Click</span>
  </span>
</a>
```

## outerHTML plus no variable

When we rewrite `outerHTML` we erase the target element completely. Thus the only way to keep a reference to erased
element is via a variable:
```html
<p id="elem">Hi!</p>
<script>
  // variable:
  const element = document.querySelector('#elem');
  element.outerHTML = 'man';
  alert(element.outerHTML); // <p id="elem">Hi!</p>

  // no variable:
  elem.outerHTML = 'bye';
  // after the code above finished working elem doesn't exist
  // anymore both on the DOM Tree and in the window
  alert(elem.outerHTML); // Error elem is not defined
</script>
```

## Inserting \<script\> as innerHTML with caution

Yeap, in __inline scripts__ we gotta be really careful when we do the following:
```html
<body>
<div id="elem"></div>
<script> // (**)
  const elem = document.querySelector('#elem'); // (*)
  elem.innerHTML = 'Some text <script>alert(1)</script>';
</script>
</body>
```

You see it the browser may think the text inside `''` ( below line `(*)` ) as the closing tag of the `<script>` in
line `(**)` and not as a string literal ( but as HTML token instead ) thus it is better to escape it:
```html
<script>
  // ...
  elem.innerHTML = 'Some text <script>alert(1)<\/script>';
</script>
```

Now we are OK

The reason that happens is because the HTML parser works before the JS parser. Thus the browser first
builds HTML, so it looks at all the text and searches for HTML tokens, and only after that the browser
executes whatever it can find between any 2 `<script />` tags.

## window.onerror

The global `window.onerror` event listener will be called in case there is ever thrown an error in your code:

```html
<script>
    window.onerror = function (smth) {
        console.log(`Got it: ${smth}`);
    };

    throw 'what';

    // expected output: Got it: what + error log from the browser DevTools
</script>
```

**Note:** errors thrown _by the browser_ also go into the `window.onerror` Event Listener:

```html
<script>
    window.onerror = function (smth) {
        console.log(`Got it: ${smth}`);
    };

    dmfdksjfkldsfjsdklf();

    // expected output: Got it: Uncaught ReferenceError: dmfdksjfkldsfjsdklf is not defined
    //                  error log from the browser DevTools
</script>
```

**Note:** this event handler doesn't catch syntax errors in code because JavaScript needs to be first parsed in order to
assign the `.onerror` event listener :)

**Also Note** The `.onerror` event listener on other HTML elements ( external resources like `<img/>` ) is called if
we fetch this resource from the server and the request for it fails ( 403 or something ).

## Where KeyboardEvents are triggered

When you press a key, a keyboard event is going to be triggered only on the `document.activeElement` ( thus
only on the currently focused element ) **if** it has an event handler set on it.

Also a KeyBoardEvent, when you press a key, is _always_ going to be triggered on:

- `document` element
- `window` element

Probably the logic behind this is that they are always focused.

**But it doesn't end here**

Apart from `document.activeElement`, `document` and `window` elements a keyboard event is also going to be triggered
on the parent elements of `document.activeElement`. Here is an example of that, imagine we have HTML:

```html
<div id="special">
  <div id="almost-inner">
    <div id="elem" tabindex="2">ok</div>
  </div>
</div>
```

And the JS code like this:

```js
const special = document.querySelector('#special');
const almostInner = document.querySelector('#almost-inner');
const elem = document.querySelector('#elem');

elem.addEventListener('keydown', () => {
    console.log('keydown on elem');
});

almostInner.addEventListener('keydown', () => {
    console.log('keydown on almost-inner');
});

special.addEventListener('keydown', () => {
    console.log('keydown on special');
});
```

Now, because the `#elem` div can be focused on ( the `tabindex` attribute ), keyboard event _are_ going to be triggered
on it ( if it has an event listener for keyboard events of course ). If you run the code above, then focus on the
`#elem` div and press a key, you will see that a `keydown` event also triggers on all the parent elements of this
`#elem` div ( the behavior would be the same if instead of `#elem` div we had an input element, so long as it is
the element can be focused on ).

If the `#elem` div were not focused on then a keyboard event wouldn't trigger on it nor any of its parents
( do note though, that if `#elem` div is focused, keyboard events will still trigger on its parents no matter
whether or not the `#elem` div itself has a keyboard event listener ).

Thus we can conclude that keyboard events trigger on:

- focusable element that currently has focus ( `document.activeElement` )
- parents of `document.activeElement`
- `document` and `window` elements no matter if any of the elements on the page has focus
 ( no matter if `document.activeElement` exists )

Do note that keyboard event are _not_ going to be triggered on the children of `document.activeElement`.

## Catching Errors

We have discussed that `window.onerror(...)` catches all uncaught errors. However if an error happens inside a Promise
then the promise gets rejected and `window.onerror(...)` doesn't catch promise rejections. For that you need the
`unhandledrejection` event. Here is code that will catch all the errors:

```js
window.addEventListener('error', (e) => {
    console.log('error caught', e.message);
    e.preventDefault(); // prevents an error being thrown
});

window.addEventListener('unhandledrejection', (e) => {
    console.log('promise rejection caught', e.reason);
    e.preventDefault();
});


setTimeout(() => {
    throw new Error('ok');
});

Promise.reject(12);
```

For the NodeJS API see the `process` section in the `LibDocs`

## `dispatchEvent` is synchronous

When an event is dispatched, the registered event listeners are triggered _synchronously_. If you run
the following code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JS</title>
</head>
<body>
<div id="special"></div>
<script>
  const event = new Event('cool');
  const elem = document.querySelector('#special');

  elem.addEventListener('cool', (e) => {
    console.log(`event ${e.type} dispatched`);
  }, false);

  // Dispatch the event
  console.log('Before dispatch');
  elem.dispatchEvent(event); // called synchronously
  console.log('After dispatch');
</script>
</body>
```

The log is going to be:

```
Before dispatch
event cool dispatched
After dispatch
```

## `stopPropagation` for Capture Phase

We can `stopPropagation` for the Capture Phase just like for the Bubbling Phase. Here is an example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Stop Propagation Intricacy</title>
</head>
<body>
<div id="special">
  <span id="inner-special">
    Special Element
  </span>
</div>
<script>
  const special = document.querySelector('#special');
  const innerSpecial = document.querySelector('#inner-special');

  special.addEventListener('click', (e) => { // (*)
    console.log('special clicked');
    e.stopPropagation();
  }, true);

  innerSpecial.addEventListener('click', () => { // (**)
    console.log('inner special clicked');
  }, true);
</script>
</body>
</html>
```

When we click on the text `Special Element`, we are actually going to be clicking on the `#inner-special` HTMl element.
As a result, the event listener in line `(*)` will be queued for execution _before_ the event listener in line `(**)`
( because we are in the Capture Phase, thus the topmost-first order ). But because the event listener in line `(*)`
makes a call to `e.stopPropagation`, it will cancel the execution of all the following event listeners to be executed
As a result, the event listener in line `(**)` will not be called.

**Note:** what is even more interesting is that a call to `e.stopPropagation` in the Capture Phase also cancels
execution of any event listeners registered for the Bubbling Phase. Here is an example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Stop Propagation Intricacy</title>
</head>
<body>
<div id="special">
  <span id="inner-special">
    Special Element
  </span>
</div>
<script>
  const special = document.querySelector('#special');
  const innerSpecial = document.querySelector('#inner-special');

  special.addEventListener('click', (e) => { // (*)
    console.log('special capture clicked');
    e.stopPropagation();
  }, true);

  innerSpecial.addEventListener('click', () => { // (**)
    console.log('inner special capture clicked');
  }, true);

  special.addEventListener('click', () => { // (***)
    console.log('special bubbling clicked');
  });

  innerSpecial.addEventListener('click', () => { // (****)
    console.log('inner special bubbling clicked');
  });
</script>
</body>
</html>
```

Upon clicking the `#inner-special` HTML element, only the event listener in line `(*)` will be called
and the event listeners in lines `(**)`, `(***)` and `(****)` will be ignored. The last 2 are set for the
Bubbling phase and they will also be ignored because of a call to `e.stopPropagation` in the event listener
in line `(*)`.

## Another transition intricacy

One intricacy that we learnt about setting `transition` property from JS is that in order to work, it needs to be set
in a separate tick of the event loop after the browser has a chance to paint. For exampe this code will not apply
transition for the `opacity` property:

```html
<style>
  div {
    width: 100px;
    height: 100px;
    background-color: blue;
  }
</style>

<div id="elem"></div>

<script>
  const e = document.getElementById('elem');
  e.style.transition = 'opacity 1s ease-out';
  e.style.opacity = 0;
</script>
```

the reason being that the browser didn't paint or process the CSS properties of element `e`.

But this code will work:

```js
const e = document.getElementById('elem');
e.style.transition = 'opacity 1s ease-out';

setTimeout(() => {
  e.style.opacity = 0;
});
```

because the code changes the property that will be affected by the transition (`opacity`) in the next tick of the event loop after the browser
has processed the styles of `e`.

Note that this code will work as well:

```js
const e = document.getElementById('elem');

setTimeout(() => {
  e.style.transition = 'opacity 1s ease-out';
  e.style.opacity = 0;
});
```

It is OK to set _both_ the transition property and the property that transition will affect at the same time if the browser has already
processed the CSS properties of our element.

OK, this code will also work:

```js
const e = document.getElementById('elem');

setTimeout(() => {
  e.style.transition = 'opacity 1s ease-out';
  e.style.opacity = 0;
}, 1000);

setTimeout(() => {
  e.style.transition = null;
  e.style.opacity = 1;
}, 3000);
```

here it will first fade opacity with transition and then make the element opaque again without transition, nothing criminal here.

But this code will not have transition already:

```js
const e = document.getElementById('elem');
e.style.transition = 'opacity 1s ease-out';

setTimeout(() => {
  e.style.opacity = 0;
}, 1);

setTimeout(() => {
  e.style.transition = null; // (*)
}, 2);
```

which may seem illogical if you comare it to example above where we set it in 2 different `setTimeout`s as well.

So why is that? Let me explain.

In order to work, the `transition` property and the property it affects need to be set in a separate tick of the event loop such that when
comes the tick during which the browser re-paints, the CSS properties will already have been processed by the browser. When the re-paint
tick comes, the browser will see that the transition is set and the CSS property it affects has changed and will thus animate the transition.
In our case above we indeed set the transition and the browser repaints but since the transition is removed only 1 milisecond later, the browser
cancels the transition animation (after 1ms, as soon as the function in line `(*)` fires) and abruptly changes the opacity to zero
without animation. Since it is only 1 milisecond we barely even see element `e`.

__Note:__ the effect is almost the same if we use `requestAnimationFrame`, this code does not apply the transition _at all_ because the functions
in lines `(*)` and `(**)` both fire during the same re-paint tick:

```js
const e = document.getElementById('elem');
e.style.transition = 'opacity 1s ease-out';

requestAnimationFrame(() => {
  e.style.opacity = 0; // (*)
});

requestAnimationFrame(() => {
  e.style.transition = null; // (**)
});

// the same as:
// requestAnimationFrame(() => {
//   e.style.opacity = 0; // (*)
//   e.style.transition = null; // (**)
// });
```

Also note that if we were to remove the transition in the midst of the animation, for example like so:

```js
const e = document.getElementById('elem');
e.style.transition = 'opacity 1s ease-out';

setTimeout(() => {
  e.style.opacity = 0;
});

setTimeout(() => {
  e.style.transition = null;
}, 500);
```

then it simply means that the transition will be smooth during 500ms and then the opacity will go abrupty to zero.
