const MAX_UNIQUE = 2;

function removeDuplicates(nums) {
    let k = 0;

    for (const num of nums) {
        if (k < MAX_UNIQUE || num > nums[k - MAX_UNIQUE]) {
            nums[k++] = num;
        }
    }

    return k;
}
