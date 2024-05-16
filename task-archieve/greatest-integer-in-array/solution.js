function findGreatestInteger(array) {
    let maxCounter = -1;

    for (const value of array) {
        maxCounter = Math.max(value, maxCounter);
    }

    return maxCounter;
}
