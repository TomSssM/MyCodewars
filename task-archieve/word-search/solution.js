function exist(board, word) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (check(board, word, i, j)) {
                return true;
            }
        }
    }

    return false;
}

function check(board, word, i, j, pos = 0, checked = {}) {
    if (board[i][j] !== word[pos]) {
        return false;
    }

    checked[getCheckedKey(i ,j)] = true;

    if (pos === word.length - 1) {
        return true;
    }

    const NEIGHBORS = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ];

    for (const [iNeighbor, jNeighbor] of NEIGHBORS) {
        const iNext = i + iNeighbor;
        const jNext = j + jNeighbor;

        if (checked[getCheckedKey(iNext, jNext)]) {
            continue;
        }

        if (isOutOfBounds(board, iNext, jNext)) {
            continue;
        }

        if (check(board, word, iNext, jNext, pos + 1, checked)) {
            return true;
        }
    }

    checked[getCheckedKey(i ,j)] = false;

    return false;
}

function getCheckedKey(i, j) {
    return [i, j].join('-');
}

function isOutOfBounds(board, i, j) {
    if (i >= board.length || i < 0) {
        return true;
    }

    if (j >= board[i].length || j < 0) {
        return true;
    }

    return false;
}

console.log('Example 1, true', exist(
    [
        ['A','B','C','E'],
        ['S','F','C','S'],
        ['A','D','E','E'],
    ],
    'ABCCED'
));
console.log('Example 2, true', exist(
    [
        ['A','B','C','E'],
        ['S','F','C','S'],
        ['A','D','E','E'],
    ],
    'SEE'
));
console.log('Example 3, false', exist(
    [
        ['A','B','C','E'],
        ['S','F','C','S'],
        ['A','D','E','E'],
    ],
    'ABCB'
));
console.log('Example 4, true', exist(
    [
        ['A','B','C','E'],
        ['S','F','E','S'],
        ['A','D','E','E']
    ],
    'ABCESEEEFS'
));
