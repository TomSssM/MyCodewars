/* Create HashMap and iterate the input array once again */

function partitionLabels(s) {
    const hashMap = {}; // maps letters to their last indexes
    const result = [];

    for (let i = 0; i < s.length; i++) {
        const letter = s[i];

        hashMap[letter] = i;
    }

    let prev = -1;
    let maxLast = 0;

    for (let i = 0; i < s.length; i++) {
        const letter = s[i];

        maxLast = Math.max(maxLast, hashMap[letter]);

        if (i === maxLast) {
            result.push(maxLast - prev);
            prev = maxLast;
        }
    }

    return result;
}

console.log(
    partitionLabels('ababcbacadefegdehijhklij')
);
