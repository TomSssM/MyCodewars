function findPeakElement(nums) {
    if (nums.length === 1 || nums[0] > nums[1]) {
        return 0;
    }

    if (nums.length === 2 && nums[1] > nums[0]) {
        return 1;
    }

    for (let i = 0; i < nums.length; i++) {
        const value = nums[i];
        const left = nums[i - 1] ?? 0;
        const right = nums[i + 1] ?? 0;

        if (value > left && value > right) {
            return i;
        }
    }

    return -1;
}
