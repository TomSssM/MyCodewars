function threeGreatestIntegers(array) {
    let counterA = -1;
    let counterB = -1;
    let counterC = -1;

    for (const value of array) {
        if (value > counterA) {
            counterC = counterB;
            counterB = counterA;
            counterA = value;
        } else if (value > counterB && (value !== counterA)) {
            counterC = counterB;
            counterB = value;
        } else if (value > counterC && (value !== counterB && value !== counterA)) {
            counterC = value;
        }
    }

    return [counterA, counterB, counterC];
}
