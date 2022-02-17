/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
    let max = 0;
    let i = 0;
    let j = height.length - 1;

    while (i < j) {
        const v1 = height[i];
        const v2 = height[j];
        const amount = Math.min(v1, v2) * (j - i);

        if (max < amount) {
            max = amount;
        }

        if (v1 <= v2) {
            while (i < j) {
                i++;
                if (height[i] >= v2) {
                    break;
                }
            }
        }

        if (v2 < v1) {
            while(j > i) {
                j--;
                if (height[j] >= v1) {
                    break;
                }
            }
        }
    }

    return max;
};

[
    [1,8,6,2,5,4,8,3,7], // 7 * 7 = 49
    [3, 9, 3, 4, 7, 2, 12, 6] // 5 * 9 = 45
].forEach((v) => {
    console.log(`answer [${v}]`, maxArea(v));
});
