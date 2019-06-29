const container = document.querySelector('#container');
const squareCount = 32;

const canvasBack = document.querySelector('#canvas-background');
const backCtx = canvasBack.getContext('2d');
const offscreenCanvas = createOffscreenCanvas();

const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;
let currentRealSize = containerHeight;

const lowerBound = squareCount;
const upperBound = currentRealSize * 5;
const step = 20;
let maxAllowedCustomSize = null;
let minAllowedCustomSize = null;

container.addEventListener('wheel', (e) => {
    let increase = e.deltaY < 0;
    if (currentRealSize === lowerBound && increase) {
        currentRealSize = minAllowedCustomSize;
    } else if (currentRealSize === upperBound && !increase) {
        currentRealSize = maxAllowedCustomSize;
    } else if (currentRealSize !== lowerBound && currentRealSize !== upperBound) {
        if (increase) {
            if (currentRealSize + step * 1.5 >= upperBound) {
                maxAllowedCustomSize = currentRealSize;
                currentRealSize = upperBound;
            } else {
                currentRealSize += step;
            }
        } else {
            if (currentRealSize - step * 1.5 <= lowerBound) {
                minAllowedCustomSize = currentRealSize;
                currentRealSize = lowerBound;
            } else {
                currentRealSize -= step;
            }
        }
    }
    updateBackground();
}, { passive: true });

initBackCanvas();
updateBackground();

function createOffscreenCanvas() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = squareCount;
    canvas.height = squareCount;
    ctx.fillStyle = '#00fff7';
    for (let i = 0; i < squareCount; i += 1) {
        for (let j = 0; j < squareCount; j += 1) {
            if (i === j) {
                ctx.fillRect(i, j, 1, 1);
            }
        }
    }
    return canvas;
}

function initBackCanvas() {
    canvasBack.width = containerWidth;
    canvasBack.height = containerHeight;
}

function updateBackground() {
    backCtx.fillStyle = '#a0a0a0';
    backCtx.fillRect(0, 0, canvasBack.width, canvasBack.height);

    const leftOffset = (canvasBack.width - currentRealSize) / 2;
    const topOffset = (canvasBack.height - currentRealSize) / 2;
    backCtx.clearRect(leftOffset, topOffset, currentRealSize, currentRealSize);
    backCtx.imageSmoothingEnabled = false;
    backCtx.drawImage(
        offscreenCanvas,
        0,
        0,
        offscreenCanvas.width,
        offscreenCanvas.height,
        leftOffset,
        topOffset,
        currentRealSize,
        currentRealSize,
    );
}