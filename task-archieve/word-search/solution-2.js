function exist(board, word) {
    const traverse = (x, y, i) => {
        if (i === word.length) return true;

        if (board[y]?.[x] !== word[i]) return false;

        board[y][x] = '#';

        for (const [dx, dy] of [[-1, 0], [0, -1], [1, 0], [0, 1]]) {
            if (traverse(x + dx, y + dy, i + 1)) {
                return true;
            }
        }

        board[y][x] = word[i];

        return false;
    }

    return board.some((row, y) => row.some((_col, x) => traverse(x, y, 0)));
}
