# Confusing Snippets

## Another ASI Trick

Here, first we create an object `{goodbye: [1,2,3]}` after which the interpreter evaluates the following array
( because of the missing semicolon ) as bracket-accessing a property. What property? Comma operator :) Everything is
a mess, yet we are able to find a property at `{goodbye: [1,2,3]}['goodbye']` and indeed it is an array. After that we
do `forEach` for this array and assign the Return Value of `forEach` to `name`. The rest is predictory but in this case
ASI simply takes the code in a completely different direction.

```javascript
var name = { goodbye: [1,2,3] }
['hello','goodbye'].forEach(val => {
    console.log(val + ' - ' + name);
})
// output:
// log: 1 - undefined
// log: 2 - undefined
// log: 3 - undefined
```

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

## Class Expression

Here is an unorthodox way of defining a class:
```javascript
const App = class {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
};
```

## async Plus static

The order matters here:
```javascript
class SomeClass {
    constructor(name) {
        this.name = name;
    }
    
    static async method() {
        return 'Hello World';
    }
}
```

## await Plus return

Do note that there is no need to write `await` something if we return an asynchronous function call
in an `async` function:
```javascript
// this:
async function fun() {
    return await fetch(url);
}

// is the same as this:
async function fun2() {
    return fetch(url);
}
```
But the latter variant is preferred.

## Reference type in the prototype

The code below has the output as indicated:
```javascript
const User = function() {};
User.prototype.attributes = { isAdmin: false };

const admin = new User('Sam');
const guest = new User('Bob');

admin.attributes.isAdmin = true;
admin.attributes.isAdmin; // true
guest.attributes.isAdmin; // true
```
because the `attributes` property is the _reference_ type of value. If it were a usual value we would have both
a property on the `admin.attributes` with one value and another property with the same name on 
`admin.prototype.attributes` but with a different value.

## Invoking a function with null context

Such an action will make the context default to the `window` object:
```javascript
function foo() { console.log(this) }
foo.call(null); // Window
```

However that isn't the case in strict mode where the function will get as its context exactly the value we pass 
even if this value is null:
```javascript
"use strict";
function man() { console.log(this) }
man.call(null); // null
```

## Accidentally replacing parameters

In the following code, we can see that if we replace a value in the `arguments` object, we also replace the parameter
itself along with it:
```javascript
function foo(a) {
  console.log(a);
  arguments[0] = ':)';
  console.log(a);
}

foo(12);
// output:
// log: 12
// log: :)
```

## Fractions as indexes in arrays

We can use fractions as indexes for arrays, however everything that isn't an integer will be coerced to a string and
stored as a usual object property, that will also render it invisible if we log an array or try to iterate it:
```javascript
const arr = [1,2,3,4];
arr[1.5] = ':)';
arr; // [1, 2, 3, 4, 1.5: ":)"]
[...arr]; // [1, 2, 3, 4]
```

## Wrapper objects for Functions

Functions just like literals don't have most of their properties directly editable. Instead just like with the
literals wrapper objects are created and suspended:
```javascript
function foo() {};
foo.name; // "foo"
foo.name = 'other name';
foo.name; // "foo"
foo.length; // 0
delete foo.length; // true
foo.length; // 0
```

## Weird Lookahead

In RegExp we can actually specify the end of the line as a value that something should be followed with:
```js
// the following RegExp look for the last letters of words:
const regExp1 = /\w(?=\s|$)/g;
```

## Is primitive an instance of anything?

Primitives are actually not instances of their corresponding classes, they only are 
when wrapped with corresponding wrapper objects:
```js
Number.prototype.checkIt = function() {
  console.log(this instanceof Number);
};

12..checkIt(); // true
12 instanceof Number; // false
```

## Inserting <script> as innerHTML with caution

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