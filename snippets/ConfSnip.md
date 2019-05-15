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