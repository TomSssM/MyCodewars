const MAX_UNIQUE = 2;

function removeDuplicates(nums) {
    let k = 0;

    for (let i = 0; i < nums.length; i++) {
        if (k < MAX_UNIQUE || nums[i] > nums[k - MAX_UNIQUE]) {
            swap(nums, i, k);
            k++;
        }
    }

    return k;
}

function swap(array, i1, i2) {
    ([array[i1], array[i2]] = [array[i2], array[i1]]);
}
