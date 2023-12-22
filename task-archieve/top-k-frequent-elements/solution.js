function topKFrequent(nums, k) {
    const hashMap = {}; // as optimization it could be Priority Queue instead of Hash Map

    for (const value of nums) {
        if (value in hashMap) {
            hashMap[value]++;
        } else {
            hashMap[value] = 1;
        }
    }

    const result = Object.entries(hashMap)
        .sort((entry1, entry2) => entry2[1] - entry1[1])
        .map((entry) => Number(entry[0]));

    while (result.length > k) {
        result.pop();
    }

    return result;
}
