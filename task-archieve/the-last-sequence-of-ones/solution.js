function lastSequenceOfOnes(array) {
    let counter = 0;

    for (const value of array) {
        if (value === 1) {
            counter++;
        }

        if (value === 0) {
            counter = 0;
        }
    }

    return counter;
}
