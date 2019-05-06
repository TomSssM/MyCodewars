const button = document.querySelector('#js-button');
button.addEventListener('click', () => {
    showCircle(150, 150, 100).then(div => {
        div.classList.add('message-ball');
        div.append("Hello, world!");
    });
});
function showCircle(cx, cy, radius) {
    return new Promise(resolve => {
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
            div.addEventListener('transitionend', () => resolve(div), false);
        }, 0);
    });
}