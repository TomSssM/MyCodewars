# Canvas Notes

## Setup

In order to work with canvas we need a canvas element:

```html
<canvas id="canvas-elem"></canvas>
```

The tool to work with 2d graphics is going to be the 2d _context_ of the canvas:

```javascript
const canvas = document.querySelector('#canvas-elem');
const context = canvas.getContext('2d');
```

Also in order to set a width / height for our canvas we shouldn't use CSS, instead a better solution
is to use the `width` / `height` attributes or properties like so:
```javascript
canvas.width = 200;
canvas.height = 200;
```

## Straight Lines

Here is how to draw lines:
```javascript
// beginPath() means if we were previously drawing a line
// once we call lineTo() we want line to start not from the end
// of the previous line but from the coordinates specified in the
// following call to moveTo()
context.beginPath();
context.moveTo(20, 30);
context.lineTo(40, 70);
context.lineTo(30, 40);
context.stroke(); // the line appears after calling this one

// however if we call moveTo() we don't need to
// call beginPath() in addition
// if we were to call beginPath() without further calling
// moveTo(), all the lineTo's and stroke's would be futile
// as JS doesn't know where to begin the line
context.moveTo(100, 100);
context.lineTo(200, 200);
context.stroke();

// draw colorful lines:
context.strokeStyle = '#e316e3';
context.beginPath();
context.moveTo(200, 200);
context.lineTo(100, 300);
context.stroke();
```

## Why it is a good idea to call beginPath()

The reason we should always go with the workflow: `beginPath -> moveTo -> lineTo -> stroke` is
because until we call `beginPath` the previous `strokeColor` will override the current one even if
`stroke` is called in between specifying this value. Sounds complicated here is a good example:

```javascript
context.strokeStyle = '#00ff8e';
context.beginPath();
context.moveTo(30, 30);
context.lineTo(40, 30); // (*)
context.stroke();
// context.beginPath();
context.strokeStyle = '#0013ff';
context.moveTo(50, 30);
context.lineTo(70, 30); // (**)
context.stroke();
```

Here you might think that the first line (`(*)`) will be colored `#00ff8e` and the second line (`(**)`)
will be colored `#0013ff`, but in reality it isn't so and both lines end up colored `#0013ff` :) That is why
we need to uncomment a call to `beginPath()`