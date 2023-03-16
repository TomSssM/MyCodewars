function diagonalSort(matrix) {
    for (let start = 0; start < matrix[0].length; start++) {
        const tmp = [];
        let i = 0;
        let j = start;

        while (matrix[i]?.[j] !== undefined) {
            tmp.push(matrix[i][j]);

            i++;
            j++;
        }

        tmp.sort((a, b) => a - b);

        i = 0;
        j = start;
        let k = 0;

        while (matrix[i]?.[j] !== undefined) {
            matrix[i][j] = tmp[k];

            i++;
            j++;
            k++
        }
    }

    for (let start = 1; start < matrix.length; start++) {
        const tmp = [];
        let i = start;
        let j = 0;

        while (matrix[i]?.[j] !== undefined) {
            tmp.push(matrix[i][j]);

            i++;
            j++;
        }

        tmp.sort((a, b) => a - b);

        i = start;
        j = 0;
        let k = 0;

        while (matrix[i]?.[j] !== undefined) {
            matrix[i][j] = tmp[k];

            i++;
            j++;
            k++
        }
    }

    return matrix;
}

console.log(
    diagonalSort([
        [3,3,1,1],
        [2,2,1,2],
        [1,1,1,2]
    ])
);
