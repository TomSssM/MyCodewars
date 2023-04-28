function missingNumber(sortedNums) {

    const len = sortedNums.length;

    for (let i = 0; i < len; i++) {
        const value = sortedNums[i];

        if (value !== i) {
            return i;
        }
    }

    return len;
}
