/* Create HashMap and iterate it */

function partitionLabels(s) {
    const hashMap = {};

    for (let i = 0; i < s.length; i++) {
        const letter = s[i];

        if (letter in hashMap) {
            hashMap[letter].push(i);
        } else {
            hashMap[letter] = [i];
        }
    }

    const result = [];
    let min = undefined;
    let max = undefined;

    for (const positions of Object.values(hashMap)) {
        const firstPosition = positions[0];
        const lastPosition = positions[positions.length - 1];

        if (min === undefined && max === undefined) {
            min = firstPosition;
            max = lastPosition;
            continue;
        }

        if (firstPosition > max) {
            const diff = max - min + 1;

            result.push(diff);

            min = firstPosition;
            max = lastPosition;

            continue;
        }

        min = Math.min(min, firstPosition);
        max = Math.max(max, lastPosition);
    }

    const finalDiff = max - min + 1;

    result.push(finalDiff);

    return result;
}

console.log(
    partitionLabels('ababcbacadefegdehijhklij')
);
