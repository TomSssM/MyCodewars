function solveSudoku(matrix) {
  function isInRow(row, num) {
    for(let i = 0; i < 9; i++) {
      if(matrix[row][i] === num) return true;
    }
  }

  function isInCol(col, num) {
    for(let i = 0; i < 9; i++) {
      if(matrix[i][col] === num) return true;
    }
  }

  function isInBox(row, col, num) {
    const r = Math.floor(row / 3) * 3;
    const c = Math.floor(col / 3) * 3;
    for(let i = r; i < r + 3; i++) {
      for(let j = c; j < c + 3; j++) {
        if(matrix[i][j] === num) return true;
      }
    }
  }

  function isSafe(row, col, num) {
    return (!isInRow(row, num) && !isInCol(col, num) && !isInBox(row, col, num));
  }

  function solve() {
    for(let row = 0; row < 9; row++) {
      for(let col = 0; col < 9; col++) {
        if(!matrix[row][col]) {
          for(let num = 1; num <= 9; num++) {
            if(isSafe(row, col, num)) {
              matrix[row][col] = num;
              if(solve()) {
                return true;
              } else {
                matrix[row][col] = 0;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  if(solve()) {
    return matrix;
  } else throw new Error('unsolvable');
}

const sudoku = [[5, 3, 4, 6, 7, 8, 9, 0, 0],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]];

console.log(solveSudoku(sudoku));