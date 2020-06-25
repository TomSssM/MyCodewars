// Implement class `Sorter` with next methods:
//
// `constructor` - creates instance of `Sorter` class
//
// `add` - add element and store it in any way inside
//
// `length` - return the count of current elements, which were added to `Sorter` instance via `add` method
//
// `toArray` - return all elements in array. For example:
// ```js
//   const sorter = new Sorter();
//   sorter.add(1);
//   sorter.add(2);
//
//   console.log(sorter.length) // 2
//   console.log(sorter.toArray()) // [1, 2]
// ```
//
// `sort` - takes indices of already added elements and sorts *only* these elements. For example:
// ```js
//   const sorter = new Sorter();
//   sorter.add(2);
//   sorter.add(1);
//
//   console.log(sorter.length) // 2
//   console.log(sorter.toArray()) // [2, 1]
//
//   sorter.sort([0, 1]);
//   console.log(sorter.toArray()) // [1, 2]
// ```
//
// `setComparator` - takes `compareFunction` as parameter and use it while sorting elements.
// You can read about `compareFunction` [here](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).
// **Sort should work for numbers by default (if compareFunction was not set directly using this method)**
// For example:
// ```js
//   const sorter = new Sorter();
//   sorter.add(2);
//   sorter.add(1);
//
//   sorter.sort([0, 1]);
//   console.log(sorter.toArray()) // [1, 2]
//
//   sorter.add(3);
//
//   const reverseCompareFunction = (left, right) => right - left;
//   sorter.setComparator(reverseCompareFunction);
//
//   sorter.sort([0, 1, 2]);
//   console.log(sorter.toArray()); // [3, 2, 1]
// ```

class Sorter {
    static defaultComparator(val1, val2) {
        if (val1 > val2) {
            return 1;
        }

        if (val1 < val2) {
            return -1;
        }

        return 0;
    }

    constructor() {
        this._comparator = Sorter.defaultComparator;
        this._internalQueue = [];
    }

    add(element) {
        this._internalQueue.push(element);
    }

    at(index) {
        return this._internalQueue[index];
    }

    get length() {
        return this._internalQueue.length;
    }

    toArray() {
        return this._internalQueue.slice();
    }

    sort(indices) {
        const sortedArray = indices
            .sort(Sorter.defaultComparator)
            .map(index => this._internalQueue[index])
            .sort(this._comparator);

        indices.forEach((index) => {
            this._internalQueue[index] = sortedArray.shift();
        });
    }

    setComparator(compareFunction) {
        if (typeof compareFunction !== 'function') {
            throw new Error('Comparator should be a function!');
        }
        this._comparator = compareFunction;
    }
}
