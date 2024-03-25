function reverse(array) {
    const middle = Math.floor(array.length / 2);

    for (let i = 0; i < middle; i++) {
        const j = array.length - i - 1;

        swap(array, i, j);
    }

    return array;
}

function swap(array, a, b) {
    ([array[a], array[b]] = [array[b], array[a]]);
}

reverse([1,2,3,4]);
reverse(['a','b','c']);
