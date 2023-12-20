/* while loop and queue */

function letterCombinations(digits) {
    let queue = [''];
    let i = 0;

    if (digits === '') {
        return [];
    }

    while (i < digits.length) {
        const letters = lookup(digits[i]);
        const currentQueue = [];

        while (queue.length > 0) {
            const prefix = queue.shift();

            for (const letter of letters) {
                currentQueue.push(prefix + letter);
            }
        }

        queue = currentQueue;
        i++;
    }

    return queue;
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
