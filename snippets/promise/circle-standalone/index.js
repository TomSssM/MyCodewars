// In the task Animated circle an animated growing circle is shown.
// Now let’s say we need not just a circle, but to show a message inside it. 
// The message should appear after the animation is complete (the circle is fully grown), 
// otherwise it would look ugly.
// In the solution of the task, the function showCircle(cx, cy, radius) draws the circle, 
// but gives no way to track when it’s ready.
// Add a callback argument: showCircle(cx, cy, radius, callback) to be called when the animation 
// is complete. The callback should receive the circle <div> as an argument.
// Here’s the example:

//  |1|    showCircle(150, 150, 100, div => {
//  |2|      div.classList.add('message-ball');
//  |3|      div.append("Hello, world!");
//  |4|    });

const button = document.querySelector('#js-button');
button.addEventListener('click', () => {
    showCircle(150, 150, 100, div => {
        div.classList.add('message-ball');
        div.append("Hello, world!");
    });
});

function showCircle(cx, cy, radius, callback) {
    function step1(cx, cy, radius) {
        const div = document.createElement('div');
        div.style.width = 0;
        div.style.height = 0;
        div.style.left = cx + 'px';
        div.style.top = cy + 'px';
        div.className = 'circle';
        document.body.append(div);
        setTimeout(() => step2(div, radius), 0);
    }

    function step2(elem, radius) {
        elem.style.width = radius * 2 + 'px';
        elem.style.height = radius * 2 + 'px';
        setTimeout(() => callback(elem), 2000);
    }

    step1(cx, cy, radius);

    const div = document.createElement('div');
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + 'px';
    div.style.top = cy + 'px';
    div.className = 'circle';
    document.body.append(div);
    setTimeout(() => {
        div.style.width = radius * 2 + 'px';
        div.style.height = radius * 2 + 'px';
        const cb = () => {
            callback(div);
            div.removeEventListener('transitionend', cb);
        }
        div.addEventListener('transitionend', cb);
    }, 0);

}