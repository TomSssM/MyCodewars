// self-devised diff algorithm based on the longest common subsequence algorithm
const { longestCommSubs } = require('../longest-common-subsequence');

const TYPES_ENUM = {
    UNCHANGED: 0,
    DELETED: 1,
    INSERTED: 2,
    MODIFIED: 3,
};

function diff(str1, str2) {
    if (str1 === str2) {
        return null;
    }

    if (str1.includes('\n') || str2.includes('\n')) {
        throw new Error('Cannot parse string with new lines');
    }

    const subsequence = longestCommSubs(str1, str2);
    const hash1 = buildChangesHash(str1, subsequence);
    const hash2 = buildChangesHash(str2, subsequence);
    const getFinalValue = getFinalValueRaw.bind(null, hash1, hash2);
    const diffArr = [];

    /*
     in case str1 and str2 don't have longest common subsequence,
     for example: they are completely different:
     */
    const prependDiff = getFinalValue('-1-0');
    prependDiff && diffArr.push(prependDiff);

    subsequence.split('').forEach((val, index) => {
        const lastDiffArrItem = diffArr[diffArr.length - 1] || {};
        if (lastDiffArrItem.type === TYPES_ENUM.UNCHANGED) {
            lastDiffArrItem.val += val;
        } else {
            diffArr.push({
                val,
                type: TYPES_ENUM.UNCHANGED,
            });
        }

        const currentDiff = getFinalValue(`${index}-${index + 1}`);
        currentDiff && diffArr.push(currentDiff);
    });

    return diffArr;
}

/**
 * Outputs a map like so:
 * {
 *     "-1-0": ...,
 *     "0-1": ...,
 *     "1-2": ...,
 * }
 *
 * As you can see, the keys are of the form: <number1>-<number2>, these <number>s mean that
 * the value was found in the string between index <number1> and index <number2>. As you can see,
 * the <number1> can -1, it simply means that the value was found before the first character in the string.
 *
 * Thus the map outputs the characters that are not part of the common subsequence. The keys of the map
 * show between which characters of the common subsequence the values were found. Like, if the common subsequence
 * is "abc" and the string is "abfc", then the map will be: { "1-2": "f" }, which tells us: the character "f"
 * was found between the 1st and the 2nd ( 0 based ) characters of the longest common subsequence, which is true.
 * */
function buildChangesHash (str, subsequence) {
    const map = {};
    let runner = 0;

    for (let i = 0; i < subsequence.length; i += 1) {
        const initRunner = runner;
        const subsequenceChar = subsequence[i];

        while (str[runner] !== subsequenceChar) {
            runner += 1;
        }

        if (initRunner !== runner) {
            map[`${i - 1}-${i}`] = str.slice(initRunner, runner);
        }
        runner += 1;
    }

    const remainer = str.slice(runner);

    if (remainer) {
        map[`${subsequence.length - 1}-${subsequence.length}`] = remainer;
    }

    return map;
}

function getFinalValueRaw(hash1, hash2, key) {
    const firstDiff = hash1[key];
    const secondDiff = hash2[key];

    if (!firstDiff && !secondDiff) {
        return null;
    }

    let type;
    let val;
    if (firstDiff && !secondDiff) {
        type = TYPES_ENUM.DELETED;
        val = firstDiff;
    } else if (!firstDiff && secondDiff) {
        type = TYPES_ENUM.INSERTED;
        val = secondDiff;
    } else if (firstDiff && secondDiff) {
        type = TYPES_ENUM.MODIFIED;
        val = secondDiff;
    }

    return {
        type,
        val,
    };
}

module.exports = exports = {
    diff,
    TYPES_ENUM,
};
