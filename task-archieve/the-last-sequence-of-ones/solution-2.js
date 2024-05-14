function lastSequenceOfOnes(array) {
    let counter = 0;

    for (let i = array.length - 1; i >= 0; i--) {
        const value = array[i];

        if (value === 1) {
            counter++;
        }

        if (value === 0) {
            break;
        }
    }

    return counter;
}
