const canvas = document.querySelector('#my-canvas');
const drawCanvas = document.querySelector('#drawing-canvas');
const container = document.querySelector('.container');

let squaresCount = 32;
const ctx = canvas.getContext('2d');
const secondCtx = drawCanvas.getContext('2d');

let squareSize = 10;

canvas.width = squareSize * squaresCount;
canvas.height = squareSize * squaresCount;

// Resizing:

function randomColor(op) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    if (op !== undefined) {
        return `rgba(${r}, ${g}, ${b}, ${op})`;
    } else return `rgb(${r}, ${g}, ${b})`;
}

drawCanvas.width = 400;
drawCanvas.height = 400;

function initDrawCanvas(size) {
    secondCtx.fillStyle = '#ccc';
    secondCtx.fillRect(0, 0, 400, 400);
    const fraction = (400 - size) / 2;
    secondCtx.clearRect(fraction, fraction, size, size);
}

function draw() {
    ctx.fillStyle = 'rgba(250,255,0,0.31)';
    ctx.fillRect(0, 0, canvas.width, canvas.width);
    ctx.fillStyle = '#000';
}

draw();
initDrawCanvas(canvas.width);

container.addEventListener('wheel', (e) => {
    if (e.deltaY < 0) {
        squareSize -= 1;
    } else {
        squareSize += 1;
    }
    clear();
    let currSize = squareSize * squaresCount;
    canvas.width = currSize;
    canvas.height = currSize;
    draw();
    initDrawCanvas(currSize);
}, { passive: true });


// Drawing:

function getSquareWidth() {
    return squareSize;
}

function getSquaresFromCoords(e) {
    const coords = canvas.getBoundingClientRect();
    const clickX = e.clientX - coords.left;
    const clickY = e.clientY - coords.top;
    const squareWidth = getSquareWidth();
    return {
        x: Math.floor(clickX / squareWidth),
        y: Math.floor(clickY / squareWidth),
    };
}
function drawASquareAt(x, y) {
    const size = getSquareWidth();
    ctx.fillRect(x * size, y * size, size, size);
}

let isDrawing = false;

canvas.addEventListener('mousedown', (e) => {
    ctx.fillStyle = randomColor();
    isDrawing = true;
    ctx.beginPath();
    const squares = getSquaresFromCoords(e);
    drawASquareAt(squares.x, squares.y);
});

const prevSquares = {
    x: null,
    y: null,
};

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    const squares = getSquaresFromCoords(e);
    console.log(squares);

    if (prevSquares.x === null) {
        drawASquareAt(squares.x, squares.y);
    } else if (prevSquares.x === squares.x) {
        let y;
        let needed;
        if (prevSquares.y < squares.y) {
            y = prevSquares.y;
            needed = squares.y;
        } else {
            y = squares.y;
            needed = prevSquares.y;
        }
        while (y < needed) {
            drawASquareAt(squares.x, y);
            y++;
        }
    } else if (prevSquares.y === squares.y) {
        let x;
        let needed;
        if (prevSquares.x < squares.x) {
            x = prevSquares.x;
            needed = squares.x;
        } else {
            x = squares.x;
            needed = prevSquares.x;
        }
        while (x < needed) {
            drawASquareAt(x, prevSquares.y);
            x++;
        }
    } else {
        const size = getSquareWidth();
        ctx.lineWidth = 12;
        ctx.lineTo(squares.x * size, squares.y * size);
        console.log(`square in coords: x - ${squares.x * size}, y - ${squares.y * size}`);
        ctx.stroke();
        ctx.lineWidth = 1;
    }

    prevSquares.x = squares.x;
    prevSquares.y = squares.y;
});

canvas.addEventListener('mouseup', (e) => {
    ctx.fillStyle = '#000';
    isDrawing = false;
});

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}