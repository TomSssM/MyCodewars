let currSpeed = 1;
const elem = document.querySelector('#path');

document.querySelector('#js-speed-up').addEventListener('click', e => {
    currSpeed = Math.max(currSpeed - 0.3, 0.4);
    elem.style.animationDuration = `${currSpeed}s`;
});

document.querySelector('#js-speed-down').addEventListener('click', e => {
    currSpeed = Math.min(currSpeed + 0.3, 5);
    elem.style.animationDuration = `${currSpeed}s`;
});

document.querySelector('#js-direction').addEventListener('click', e => {
    elem.classList.toggle('upturned');
    if(elem.classList.contains('upturned')) {
        e.currentTarget.innerHTML = 'Down';
    } else e.currentTarget.innerHTML = 'Up';
})