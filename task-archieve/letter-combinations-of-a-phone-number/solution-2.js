function letterCombinations(digits) {
    let res = [];

    if (digits.length === 0) {
        return res;
    }

    res.push('');

    for (const digit of digits) {
        const currentLetters = lookup(digit);
        let newRes = [];

        for (const prefix of res) {
            for (const currentLetter of currentLetters) {
                newRes.push(prefix + currentLetter);
            }
        }

        res = newRes;
    }

    return res;
}

const digitsMap = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];

function lookup(digit) {
    return digitsMap[Number(digit) - 2]; // "1" does not map to any letters
}

console.log(
    letterCombinations('2')
);

console.log(
    letterCombinations('23')
);

console.log(
    letterCombinations('234')
);
