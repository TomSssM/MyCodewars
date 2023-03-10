/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
function convert(s, numRows) {
    if (s.length === 1) {
        return s;
    }

    const numOfVertical = numRows > 2 ? numRows - 2 : 0;
    const incrementor = numRows + numOfVertical;
    let out = '';

    for (let i = 0; i < numRows; i++) {
        const isFirstRow = i === 0;
        const isLastRow = i === numRows - 1;

        if (!isLastRow) {
            out += s[i];
        }

        let j = 0;

        while (true) {
            const index1 = (incrementor - i) + (incrementor * j);

            if (!s[index1]) {
                break;
            } else {
                out += s[index1];
            }

            if (!isFirstRow && !isLastRow) {
                const index2 = (incrementor + i) + (incrementor * j);
                if (s[index2]) {
                    out += s[index2];
                }
            }

            j++;
        }
    }

    return out;
};

[
    ['PAYPALISHIRING', 3, 'PAHNAPLSIIGYIR'],
    ['PAYPALISHIRING', 4, 'PINALSIGYAHRPI'],
    ['A', 1, 'A'],
].forEach(([s, numRows, expected]) => {
    const actual = convert(s, numRows);
    console.log();
    console.log(`Input: s="${s}", numRows=${numRows}`);
    console.log(`Output: "${actual}"`);
    console.log(`PASS: ${actual === expected}`);
});
