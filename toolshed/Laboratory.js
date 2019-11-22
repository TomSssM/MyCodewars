// n queens problem

// TODO: try to make it more efficient in the isQueenSafe function
// TODO: test against CodeWars

// board: 1 - there is a queen, 0 - the cell is empty
const BOARD_SIZE = 4;
const board = createBoard(BOARD_SIZE);

// process:
queenBacktrack(board);
console.log(board.map((innerBoard) => innerBoard.join(' ')).join('\n'));

// functions:
function queenBacktrack(board) {
    function solve(row = 0) {
        const boardSize = board.length;

        if (row === boardSize) {
            return true;
        }

        for (let i = 0; i < boardSize; i += 1) {
            console.log(`checking board${row}${i}`);
            if (isQueenSafe(row, i, board)) {

                console.log(`setting board${row}${i}`);
                board[row][i] = 1;

                if (solve(row + 1)) {
                    return true;
                } else {
                    console.log(`removing board${row}${i}`);
                    board[row][i] = 0;
                }
            }
        }

        return false;
    }

    if (solve()) {
        return board;
    } else {
        throw new Error('Unsolvable');
    }
}

function isQueenSafe(row, col, board) {
    return (
        checkRowsAndColums(row, col, board) &&
        checkDiagonals(row, col, board)
    );
}

// task helpers:

function createBoard(boardSize) {
    const arr = [];
    let i = 0;

    while (i < boardSize) {
        arr.push(new Array(boardSize).fill(0));
        i += 1;
    }

    return arr;
}

function checkRowsAndColums(row, col, board) {
    const boardSize = board.length;

    for (let i = 0; i < boardSize; i += 1) {
        if (board[row][i] === 1) {
            return false;
        }

        if (board[i][col] === 1) {
            return false;
        }
    }

    return true;
}

function checkDiagonals(row, col, board) {
    const NUMBER_OF_BOARD_EDGES = 4;
    const boardSize = board.length;

    // guide on how for the algorithm to attain the top-left, top-right, bottom-left, bottom-right
    // cells relative to the current cell ( which is board[row][col] ); for instance in order to get
    // the top left cell relative to the current one, we need to do board[row - 1][col - 1], or -1 -1:
    const howToGetDiagnals = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
    ];
    // Note: since we never have any queens *below* the cell we are checking ( we are going top to bottom,
    // like in the video ), we can make the algorithm a bit more efficient by commenting out the
    // [-1, 1] and [1, -1] instructions above

    let offset = 1;

    while (true) {
        let overflowCount = 0;
        let i = 0;

        while (i < howToGetDiagnals.length) {
            const instruction = howToGetDiagnals[i];
            const nextRow = row + offset * instruction[0];
            const nextColumn = col + offset * instruction[1];

            if (
                nextRow >= 0 && nextColumn >= 0 &&
                nextRow < boardSize && nextColumn < boardSize
            ) {
                if (board[nextRow][nextColumn] === 1) {
                    return false;
                }
            } else {
                overflowCount += 1;
            }

            i += 1;
        }

        if (overflowCount === NUMBER_OF_BOARD_EDGES) {
            break;
        } else {
            offset += 1;
        }
    }

    return true;
}
