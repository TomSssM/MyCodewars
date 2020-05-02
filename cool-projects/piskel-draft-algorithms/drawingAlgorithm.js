const canvas = document.querySelector('#draw-canvas');
const ctx = canvas.getContext('2d');
let squareCount = null;
let squareSize = null;
let drawing = false;
let prevSquare = null;
const canvasOffsets = {};

initCanvas(32, 320);

function initCanvas(squaresNum, canvasSize) {
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    canvas.style.border = '1px solid #000';
    squareCount = squaresNum;
    squareSize = canvas.width / squareCount;

    canvas.addEventListener('mousedown', (e) => {
        const coords = canvas.getBoundingClientRect();
        canvasOffsets.top = coords.top;
        canvasOffsets.left = coords.left;
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

    canvas.addEventListener('mouseup', (e) => {
        if (!drawing) return;
        drawing = false;
        canvasOffsets.top = null;
        canvasOffsets.left = null;
    });

    canvas.addEventListener('mouseleave', (e) => {
        if (!drawing) return;
        drawing = false;
        canvasOffsets.top = null;
        canvasOffsets.left = null;
        const square = getSquareFromCoords(e.clientX, e.clientY);
        if (square.x === prevSquare.x && square.y === prevSquare.y) return;
        square.x = Math.min(square.x, squareCount - 1);
        square.y = Math.min(square.y, squareCount - 1);
        bresenhamsAlgorithm(prevSquare, square, '#000');
        prevSquare = square;
    });
}

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