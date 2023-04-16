function summaryRanges(nums) {
    const result = [];
    let left = 0;
    let right = 0;

    while (right < nums.length) {
        if (nums[right] !== nums[right + 1] - 1) {
            result.push(
                left === right
                    ? nums[right].toString()
                    : `${nums[left]}->${nums[right]}`
            );

            left = right + 1;
        }

        right++;
    }

    return result;
}

console.log(
    summaryRanges([0,1,2,4,5,7])
);
