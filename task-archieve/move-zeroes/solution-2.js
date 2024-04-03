function moveZeroes(nums) {
    let i = 0;
    let k = 0;

    while (i < nums.length) {
        if (nums[i] !== 0) {
            swap(nums, i, k);
            k++;
        }

        i++;
    }
}

function swap(array, i1, i2) {
    ([array[i1], array[i2]] = [array[i2], array[i1]]);
}
