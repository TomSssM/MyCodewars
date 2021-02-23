/*
   the explanation is in the CS videos

   complexity:
       time: O(m + n)
       space: O(m + n)
           m - length of the string
           n - length of the searched-for pattern
*/

function substringSearchU(str, pattern) {
    const strLength = str.length;
    const patternLength = pattern.length;
    let j = 0;
    const suffixArray = buildSuffixArray(pattern);

    for (let i = 0; i <= strLength; i++) {
        if (str[i] === pattern[j]) {
            let count = 0;
            const prevJ = j;
            while (j < patternLength && str[i + count] === pattern[j]) {
                j += 1;
                count += 1;
            }

            if (j === patternLength) {
                return i - prevJ;
            } else {
                i = i + count - 1;
                j = suffixArray[j - 1];
            }
        }
    }

    return -1;
}

function buildSuffixArray(str) {
    const suffixArr = [];
    let j = 0;

    suffixArr[0] = 0;

    for (let i = 1; i < str.length; i += 1) {
        if (str[i] === str[j]) {
            j += 1;
            suffixArr[i] = j;
        } else if (j === 0 && str[i] !== str[j]) {
            suffixArr[i] = 0;
        } else {
            j = suffixArr[j - 1];
            i -= 1; // do note that we need to continue assigning to j the value at the previous position so long as str[i] !== str[j] ( !! THE VIDEO DOESN'T say that )
        }
    }

    return suffixArr;
}

module.exports = exports = {
    buildSuffixArray,
    substringSearchU,
};
