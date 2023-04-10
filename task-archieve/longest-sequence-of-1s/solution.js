function countOnes(array) {
    let max = 0; // third counter
    let current = 0; // first counter
    let prev = 0; // second counter

    for (let i = 0; i < array.length; i++) {
        if (array[i] === 1) {
            current++;
        }

        if (array[i] === 0) {
            prev = current;
            current = 0;
        }

        max = Math.max(current + prev, max);
    }

    return max === array.length ? max - 1 : max;
}

console.log(countOnes([1, 0])); // 1
console.log(countOnes([1, 1])); // 1
console.log(countOnes([0, 0])); // 0
console.log(countOnes([1, 1, 1, 0, 1, 0, 0, 1, 1, 1])); // 4
