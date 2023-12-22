function moveZeroes(nums) {
    let i = 0;

    for (const value of nums) {
        if (value !== 0) {
            nums[i++] = value;
        }
    }

    while (i < nums.length) {
        nums[i++] = 0;
    }
}
