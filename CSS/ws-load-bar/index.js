const button = document.querySelector('#js-button');
const resetButton = document.querySelector('#js-reset-button');
const loader = document.querySelector('#js-loader');
const MAX_CHUNK_SIZE = 10;
const MAX_INTERVAL = 1000;
const BUTTON_CLASSNAME = 'button_pressed_yes';
const getRandom = (treshold) => Math.round(Math.random() * treshold);
const getNextChunk = () => getRandom(MAX_CHUNK_SIZE);
const getNextInterval = () => getRandom(MAX_INTERVAL);
let loaded = 0;
let loadTimeout;

const setWidth = () => {
    loader.style.width = `${loaded}%`;
};
const loadChunk = () => {
    loaded = Math.min(loaded + getNextChunk(), 100);
    setWidth();
};
const updateChunk = () => {
    clearTimeout(loadTimeout);
    loadTimeout = setTimeout(() => {
        loadChunk();
        if (loaded < 100) {
            updateChunk();
        }
    }, getNextInterval());
};
const reset = () => {
    if (loaded === 100) {
        updateChunk();
    }
    loaded = 0;
    setWidth();
};

updateChunk();
button.addEventListener('click', loadChunk);
resetButton.addEventListener('click', reset);

let pressedButton = null;
const findButton = (element) => {
    if (!element) return null;
    return element.closest('.button');
};
const unpressButton = () => {
    if (!pressedButton) return;
    pressedButton.classList.remove(BUTTON_CLASSNAME);
    pressedButton = null;
};
const pressButton = (button) => {
    if (pressedButton) unpressButton();
    pressedButton = button;
    pressedButton.classList.add(BUTTON_CLASSNAME);
};

document.addEventListener('mousedown', (e) => {
    const button = findButton(e.target);
    if (!button) return;
    pressButton(button);
});
document.addEventListener('mouseup', unpressButton);
