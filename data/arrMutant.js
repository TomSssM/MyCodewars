class mutantArr {
  constructor(...args) {
    this.collection = [...args];
    this.index = 0;
  }

  get length() {
    return this.collection.length;
  }

  [Symbol.iterator]() {
    let iterInd = this.index;

    return {
      next: () => {
        while(Math.abs(this.collection[iterInd]) % 2 === 0) iterInd++;

        if(iterInd >= this.length) return {
          done: true,
          value: undefined,
        };

        return {
          done: false,
          value: this.collection[iterInd++],
        };
      },
    };
  }
}

const arr = new mutantArr(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20);
console.log(arr instanceof mutantArr); // => true
console.log([...arr]); // => [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]