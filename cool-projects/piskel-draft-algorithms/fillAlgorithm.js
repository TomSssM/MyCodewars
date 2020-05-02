const canvas = document.querySelector('#draw-canvas');
const ctx = canvas.getContext('2d');
let squareCount = null;
let squareSize = null;
let drawing = false;
let prevSquare = null;
const canvasOffsets = {};
const mouseKeys = {
    leftKey: 1,
    rightKey: 3,
};
let offscreenCanvas = null;
let offscreenCtx = null;
const changedSquares = new Set();

initCanvas(32, 320);
initOffscreenCanvas();

function initCanvas(squaresNum, canvasSize) {
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    canvas.style.border = '1px solid #000';
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    squareCount = squaresNum;
    squareSize = canvas.width / squareCount;

    canvas.addEventListener('mousedown', (e) => {
        const coords = canvas.getBoundingClientRect();
        canvasOffsets.top = coords.top;
        canvasOffsets.left = coords.left;
        if (e.which !== mouseKeys.leftKey) return;
        drawing = true;

        const square = getSquareFromCoords(e.clientX, e.clientY);
        paintSquareAt(square.x, square.y);
        prevSquare = square;
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!drawing) return;
        const square = getSquareFromCoords(e.clientX, e.clientY);
        if (square.x === prevSquare.x && square.y === prevSquare.y) return;
        bresenhamsAlgorithm(prevSquare, square, '#000');
        prevSquare = square;
    });

    canvas.addEventListener('mouseup', () => {
        if (!drawing) return;
        drawing = false;
        updateOffsetCanvas();
        changedSquares.clear();
        canvasOffsets.top = null;
        canvasOffsets.left = null;
    });

    canvas.addEventListener('mouseleave', (e) => {
        if (!drawing) return;
        drawing = false;
        canvasOffsets.top = null;
        canvasOffsets.left = null;
        const square = getSquareFromCoords(e.clientX, e.clientY);
        square.x = Math.min(square.x, squareCount - 1);
        square.y = Math.min(square.y, squareCount - 1);
        bresenhamsAlgorithm(prevSquare, square, '#000');
        updateOffsetCanvas();
    });

    // ---- Fill Algorithm ---------------------------------------------
    canvas.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        onFillEvent(e);
        updateOffsetCanvas();
    });
    // -----------------------------------------------------------------
}

// -------- Fill Algorithm  Functions ------------------------------

function onFillEvent(event) {
    const square = getSquareFromCoords(event.clientX, event.clientY);
    const fillColor = [197, 52, 144, 255];
    const startColor = [255, 255, 255, 255];
    floodFillAlgorithm(square.x, square.y, offscreenCanvas, offscreenCtx, fillColor, startColor);
    fillAnyCanvas(canvas, ctx);
}

function floodFillAlgorithm(startX, startY, canvas, ctx, fillColor, startColor, drawingBoundTop = 0) {
    const pixelStack = [[startX, startY]];
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    let newPos;
    let x;
    let y;
    let pixelPos;
    let reachLeft;
    let reachRight;
    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

    while(pixelStack.length) {
        newPos = pixelStack.pop();
        x = newPos[0];
        y = newPos[1];
        pixelPos = (y * canvasWidth + x) * 4;
        while(y >= drawingBoundTop && matchColor(pixelPos, imageData, startColor)) {
            pixelPos -= canvasWidth * 4;
            y -= 1;
        }
        pixelPos += canvasWidth * 4;
        y += 1;
        reachLeft = false;
        reachRight = false;
        while(y < canvasHeight && matchColor(pixelPos, imageData, startColor)) {
            colorPixel(pixelPos, imageData, fillColor);
            if(x > 0) {
                if(matchColor(pixelPos - 4, imageData, startColor)) {
                    if(!reachLeft){
                        pixelStack.push([x - 1, y]);
                        reachLeft = true;
                    }
                } else if(reachLeft) {
                    reachLeft = false;
                }
            }

            if(x < canvasWidth - 1) {
                if(matchColor(pixelPos + 4, imageData, startColor)) {
                    if(!reachRight) {
                        pixelStack.push([x + 1, y]);
                        reachRight = true;
                    }
                } else if(reachRight) {
                    reachRight = false;
                }
            }
            y += 1;
            pixelPos += canvasWidth * 4;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function matchColor(pixelPos, imageData, [colorR, colorG, colorB, colorA]) {
    const r = imageData.data[pixelPos];
    const g = imageData.data[pixelPos + 1];
    const b = imageData.data[pixelPos + 2];
    const a = imageData.data[pixelPos + 3];
    return (r === colorR && g === colorG && b === colorB && a === colorA);
}

function colorPixel(pixelPos, imageData, [fillColorR, fillColorG, fillColorB, fillColorA]) {
    imageData.data[pixelPos] = fillColorR;
    imageData.data[pixelPos + 1] = fillColorG;
    imageData.data[pixelPos + 2] = fillColorB;
    imageData.data[pixelPos + 3] = fillColorA;
}

// -----------------------------------------------------------------

function bresenhamsAlgorithm(square1, square2, color) {
    let x1 = square1.x;
    let y1 = square1.y;
    let x2 = square2.x;
    let y2 = square2.y;

    const rise = y2 - y1;
    const run = x2 - x1;

    if (!run) {
        if (y2 < y1) {
            [y1, y2] = [y2, y1];
        }
        for (let y = y1; y <= y2; y += 1) {
            paintSquareAt(x1, y, color);
        }
    } else {
        let m = rise / run;
        let adjust = m >= 0 ? 1 : -1;
        let offset = 0;
        let threshold = 0.5;
        if (m <= 1 && m >= -1) {
            let delta = Math.abs(m);
            let y = y1;
            if (x2 < x1) {
                [x1, x2] = [x2, x1];
                y = y2;
            }
            for (let x = x1; x <= x2; x += 1) {
                paintSquareAt(x, y, color);
                offset += delta;
                if (offset >= threshold) {
                    y += adjust;
                    threshold += 1;
                }
            }
        } else {
            let delta = Math.abs(run / rise);
            let x = x1;
            if (y2 < y1) {
                [y1, y2] = [y2, y1];
                x = x2;
            }
            for (let y = y1; y <= y2; y += 1) {
                paintSquareAt(x, y, color);
                offset += delta;
                if (offset >= threshold) {
                    x += adjust;
                    threshold += 1;
                }
            }
        }
    }
}

function paintSquareAt(x, y, color) {
    changedSquares.add(`${x}:${y}`);
    ctx.fillStyle = color;
    ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
}

function getSquareFromCoords(x, y) {
    const horizontalDistance = x - canvasOffsets.left;
    const verticalDistance = y - canvasOffsets.top;
    return {
        x: Math.floor(horizontalDistance / squareSize),
        y: Math.floor(verticalDistance / squareSize),
    };
}

function initOffscreenCanvas() {
    offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = squareCount;
    offscreenCanvas.height = squareCount;
    offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.fillStyle = '#fff';
    offscreenCtx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
    offscreenCtx.fillStyle = '#000';
}

function updateOffsetCanvas() {
    let squareObj;
    changedSquares.forEach(square => {
        squareObj = square.split(':');
        offscreenCtx.fillRect(squareObj[0], squareObj[1], 1, 1);
    });
    const clone = document.querySelector('#clone');
    const cloneCtx = clone.getContext('2d');
    fillAnyCanvas(clone, cloneCtx);
}

function fillAnyCanvas(canvas, ctx) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(offscreenCanvas, 0, 0, squareCount, squareCount, 0, 0, canvas.width, canvas.height);
}