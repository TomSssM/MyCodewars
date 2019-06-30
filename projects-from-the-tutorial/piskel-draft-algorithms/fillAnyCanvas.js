function fillAnyCanvas(canvas, ctx) {
    const squareCount = squares.length;
    const offscreen = document.createElement('canvas');
    const offscreenCtx = offscreen.getContext('2d');
    offscreen.width = squareCount;
    offscreen.height = squareCount;
    for (let y = 0; y < squareCount; y += 1) {
        for (let x = 0; x < squareCount; x += 1) {
            offscreenCtx.fillStyle = squares[y][x];
            offscreenCtx.fillRect(x, y, 1, 1);
        }
    }
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(offscreen, 0, 0, squareCount, squareCount, 0, 0, canvas.width, canvas.height);
}