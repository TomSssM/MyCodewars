/**
 * @param {string} str
 * @param {number} K
 */
function longestStr(str, K) {
    const registry = {};
    let start = 0;
    let end = 0;
    let max = 0;

    while (end <= str.length) {
        const startLetter = str[start];
        const endLetter = str[end];
        const count = Object.keys(registry).length;

        if (count === K) {
            max = Math.max(max,
                Object.values(registry).reduce((a, b) => a + b, 0)
            );
        }

        if (end === str.length) {
            // we also break here because we need to consider the last letter and thus evaluate the if above
            break;
        }

        if (count <= K) {
            registry[endLetter] = (registry[endLetter] ?? 0) + 1;
            end++;
        } else {
            registry[startLetter]--;
            start++;
            if (registry[startLetter] === 0) {
                delete registry[startLetter];
            }
        }
    }

    return max;
}
