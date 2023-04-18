/* Dutch National Flag algorithm */

function sortColors(nums) {
    let s = 0;
    let e = nums.length - 1;
    let mid = 0;

    while (mid <= e) {
        if (nums[mid] === 0) {
            ([nums[mid], nums[s]] = [nums[s], nums[mid]]);
            mid++;
            s++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            ([nums[mid], nums[e]] = [nums[e], nums[mid]]);
            e--;
        }
    }

    return nums;
}

console.log(
    sortColors([2,0,2,1,1,0])
);
