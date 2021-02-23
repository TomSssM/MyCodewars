// Given an unsorted array of integers, find the length of the longest consecutive elements sequence.
// Well, lets assume that this task related only to the sequence with step equal to 1 only.
//
// For example:
// Given exampleArray = `[100, 4, 200, 1, 3, 2]`.
// The longest consecutive elements sequence is `[1, 2, 3, 4]`.
//
// `longestConsecutiveLength(exampleArray)` returns the length of the longest sequence - `4`.
//
// Your algorithm should have O(n) complexity.

function longestConsecutiveLength(array) {
    const step = 1;
    const set = new Set();
    let longestSequence = 0;

    array.forEach((val) => {
        let sequence = 1;
        let current;

        set.add(val);

        current = val;

        while (set.has(current + step)) {
            current += step;
            sequence += 1;
        }

        current = val;

        while (set.has(current - step)) {
            sequence += 1;
            current -= step;
        }

        if (sequence > longestSequence) {
            longestSequence = sequence;
        }
    });

    return longestSequence;
}
