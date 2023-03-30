function totalFruit(fruits) {
    let left = 0;
    let right = 0;
    let maxCount = 0;
    const fruitTypes = {};

    while (right < fruits.length) {
        const fruitType = fruits[right];

        if (!(fruitType in fruitTypes)) {
            fruitTypes[fruitType] = 1;
        } else {
            fruitTypes[fruitType]++;
        }

        while (Object.keys(fruitTypes).length > 2) {
            const leftFruitType = fruits[left];

            fruitTypes[leftFruitType]--;

            if (fruitTypes[leftFruitType] === 0) {
                delete fruitTypes[leftFruitType];
            }

            left++;
        }

        maxCount = Math.max(maxCount, right - left + 1);
        right++;
    }

    return maxCount;
}
