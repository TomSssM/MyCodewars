// also based on the videos in the alogrithms section

const assert = require('assert');

function longestCommSubs(firstStr, secondStr) {
    const matrix = buildSubsequenceMatrix(firstStr, secondStr);
    let i = matrix.length - 1;
    let j = matrix[0].length - 1;
    let longestCommonSubsequence = '';
    while (i >= 1 && j >= 1) {
        const value = matrix[i][j];
        while (matrix[i][j - 1] === value) {
            j -= 1;
        }
        while (i > 0 && matrix[i - 1][j] === value) {
            i -= 1;
        }
        if (i >= 1 && j >= 1) {
            longestCommonSubsequence = secondStr[i - 1] + longestCommonSubsequence; // or firstStr[j - 1] + longestCommonSubsequence
        }
        i -= 1;
        j -= 1;
    }
    return longestCommonSubsequence;
}

function buildSubsequenceMatrix(firstStr, secondStr) {
    const matrix = [new Array(firstStr.length + 1).fill(0)];
    for (let i = 0; i < secondStr.length; i += 1) {
        matrix[i + 1] = [];
        matrix[i + 1][0] = 0;
        for (let j = 0; j < firstStr.length; j += 1) {
            if (firstStr[j] === secondStr[i]) {
                matrix[i + 1][j + 1] = matrix[i][j] + 1;
            } else {
                matrix[i + 1][j + 1] = Math.max(matrix[i + 1][j], matrix[i][ j + 1]);
            }
        }
    }
    return matrix;
}

// self devised units:

const firstUnit = () => {
    const firstStr = 'abcdaf';
    const secondStr = 'acbcf';
    assert.deepEqual(
        buildSubsequenceMatrix(firstStr, secondStr),
        [
            [0,0,0,0,0,0,0],
            [0,1,1,1,1,1,1],
            [0,1,1,2,2,2,2],
            [0,1,2,2,2,2,2],
            [0,1,2,3,3,3,3],
            [0,1,2,3,3,3,4],
        ],
    );
    assert.strictEqual(longestCommSubs(firstStr, secondStr), 'abcf');
};

const secondUnit = () => {
    const firstStr = 'mzjawxu';
    const secondStr = 'xmjyauz';
    assert.deepEqual(
        buildSubsequenceMatrix(firstStr, secondStr),
        [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1],
            [0,1,1,1,1,1,1,1],
            [0,1,1,2,2,2,2,2],
            [0,1,1,2,2,2,2,2],
            [0,1,1,2,3,3,3,3],
            [0,1,1,2,3,3,3,4],
            [0,1,2,2,3,3,3,4],
        ],
    );
    assert.strictEqual(longestCommSubs(firstStr, secondStr), 'mjau');
};

const thirdUnit = () => {
    const firstStr = 'a';
    const secondStr = 'b';
    assert.deepEqual(
        buildSubsequenceMatrix(firstStr, secondStr),
        [
            [0,0],
            [0,0]
        ],
    );
    assert.strictEqual(longestCommSubs(firstStr, secondStr), '');
};

firstUnit();
secondUnit();
thirdUnit();

console.log('Success');
