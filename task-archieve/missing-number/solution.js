function missingNumber(nums) {
    const len = nums.length;
    let counter = 0;

    for (let i = 0; i < len; i++) {
        counter ^= nums[i];
    }

    for (let i = 0; i <= len; i++) {
        counter ^= i;
    }

    return counter;
}
