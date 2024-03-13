function flatten(array) {
    const result = [];
    const arraysToProcess = [array];

    while (arraysToProcess.length > 0) {
        const currentArray = arraysToProcess.pop();

        while (currentArray.length) {
            const element = currentArray.pop();

            if (Array.isArray(element)) {
                arraysToProcess.push(currentArray, element);
                break;
            } else {
                result.push(element);
            }
        }
    }

    return result.reverse();
}

console.log(flatten([1,2,3,[4,[5]],[6],7]));
