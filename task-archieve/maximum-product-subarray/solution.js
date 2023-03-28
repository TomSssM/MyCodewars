function maxProduct(nums) {
    let maxProduct = -Infinity;
    let counter = 1;

    for (let i = 0; i < nums.length; i++) {
        counter *= nums[i];
        maxProduct = Math.max(maxProduct, counter);

        if (counter === 0) {
            counter = 1;
        }
    }

    counter = 1;

    for (let i = nums.length - 1; i >= 0; i--) {
        counter *= nums[i];
        maxProduct = Math.max(maxProduct, counter);

        if (counter === 0) {
            counter = 1;
        }
    }

    return maxProduct === -Infinity ? 0 : maxProduct;
}

console.log(maxProduct([-2])); // -2
console.log(maxProduct([-8,5,3,1,6])); // 90
