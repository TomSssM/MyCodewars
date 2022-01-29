/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    const numOfVertical = numRows - 2;
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

console.log(convert('PAYPALISHIRING', 3)); // 'PAHNAPLSIIGYIR'
