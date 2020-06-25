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
