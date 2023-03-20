function climbStairs(n) {
    const numbers = [0, 1, 1, 2];

    let i = 3;

    while (i < n + 1) {
        numbers.push(numbers[i - 1] + numbers[i]);
        i++;
    }

    return numbers[n + 1];
}
