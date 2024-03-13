function flatten(array) {
    var stack = [array];
    var result = [];

    while (stack.length > 0) {
        var element = stack.pop();
        if (Array.isArray(element)) {
            for (var i = element.length - 1; i >= 0; i--) {
                stack.push(element[i]);
            }
        } else {
            result.push(element);
        }
    }
    return result;
}

console.log(flatten([1,2,3,[4,[5]],[6],7]));
