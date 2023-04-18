function sortColors(nums) {
    let numOfZeros = 0;
    let numOfOnes = 0;
    let numOfTwos = 0;

    for (const num of nums) {
        if (num === 0) {
            numOfZeros++;
        }

        if (num === 1) {
            numOfOnes++;
        }

        if (num === 2) {
            numOfTwos++;
        }
    }

    let i = 0;

    while (i < nums.length) {
        if (numOfZeros > 0) {
            nums[i] = 0;
            numOfZeros--;
        } else if (numOfOnes > 0) {
            nums[i] = 1;
            numOfOnes--;
        } else if (numOfTwos) {
            nums[i] = 2;
            numOfTwos--;
        }

        i++;
    }

    return nums;
}

console.log(
    sortColors([2,0,2,1,1,0])
);
