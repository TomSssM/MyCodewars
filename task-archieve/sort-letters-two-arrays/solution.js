function swap(array, i1, i2) {
    ([array[i1], array[i2]] = [array[i2], array[i1]]);
}

function solution(letters, indexes) {
    /**
     * for simplicity we use Bubble Sort here, but in real interview please use Quick Sort
     * see ./snippets/algorithms/quick-sort.html
     */
    for (let i = 1; i < indexes.length; i++) {
        let j = i;
        while (indexes[j] < indexes[j - 1] && j > 0) {
            swap(indexes, j, j - 1);
            swap(letters, j, j - 1);
            j--;
        }
    }
}
