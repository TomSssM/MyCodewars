/* depth first search */

function letterCombinations(digits) {
    const result = [];

    if (digits.length === 0) {
        return [];
    }

    function backtrack(prefix, currentDigitIndex) {
        if (currentDigitIndex === digits.length) {
            result.push(prefix);
            return;
        }

        const letters = lookup(digits[currentDigitIndex]);

        for (const letter of letters) {
            backtrack(prefix + letter, currentDigitIndex + 1);
        }
    }

    backtrack('', 0);

    return result;
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
