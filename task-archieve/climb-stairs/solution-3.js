function climbStairs(n) {
    if (n <= 1) {
        return n;
    }

    let step1 = 1;
    let step2 = 2;
    let i = 3;

    while (i < n + 1) {
        const currentStep = step1 + step2;

        step1 = step2;
        step2 = currentStep;

        i++;
    }

    return step2;
}
