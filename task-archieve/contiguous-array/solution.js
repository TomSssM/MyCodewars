function findMaxLength(nums) {
    const prevCountersHashMap = {};
    let maxLength = 0;
    let counter = 0;
    let i = 0;

    while (i < nums.length) {
        const value = nums[i];

        if (value === 0) {
            counter--;
        }

        if (value === 1) {
            counter++;
        }

        if (counter === 0) {
            maxLength = i + 1;
        }

        if (counter in prevCountersHashMap) {
            const prevIndex = prevCountersHashMap[counter];
            maxLength = Math.max(maxLength, i - prevIndex);
        } else {
            prevCountersHashMap[counter] = i; // store the first unique counter value
        }

        i++;
    }

    return maxLength;
}
