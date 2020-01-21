const assert = require('assert');
const { genRandom } = require('./genRandom');
const { MegaPromise } = require("../../Polyfill");

describe('MegaPromise', () => {
    let expectedData;

    beforeEach(() => {
        expectedData = genRandom();
    });

    it("should call async stuff", (done) => {
        new MegaPromise((res) => {
            setTimeout(() => {
                res(expectedData);
            }, 20);
        }).then((data) => {
            assert(data === expectedData);
            done();
        });
    });

    it('should also support sync stuff', () => {
        new MegaPromise((res) => {
            res(expectedData);
        }).then((data) => {
            assert(data === expectedData);
        });
    });

    it('should cache the predefined resolve()', (done) => {
        MegaPromise.resolve(expectedData).then((data) => {
            assert(data === expectedData);
            done();
        });
    });

    it('should support piping', (done) => {
        const pr = new MegaPromise((res) => {
            setTimeout(() => {
                res(expectedData);
            }, 20);
        });

        pr.then((data) => {
            assert(data === expectedData);
            expectedData = genRandom();
            return expectedData;
        }).then((data) => {
            assert(data === expectedData);
            expectedData = genRandom();
            return expectedData;
        }).then((data) => {
            assert(data === expectedData);
        }).then(done);
    });

    it('should execute thens in the right order', (done) => {
        const order = [];

        const pr = new Promise((res) => {
            setTimeout(res, 10);
        }).then(() => {
            order.push(1);
        }).then(() => {
            order.push(2);
        });

        pr.then(() => {
            order.push(3);
        }).then(() => {
            order.push(6);
        }).then(() => {
            order.push(7);
            assert(JSON.stringify(order) === JSON.stringify([1,2,3,4,5,6,7]));
            done();
        });

        pr.then(() => {
            order.push(4);
        });

        pr.then(() => {
            order.push(5);
        });
    });

    it('should flatten promises 1', (done) => {
        new Promise((res) => {
            res(new Promise((res) => {
                setTimeout(() => res(expectedData), 1200);
            }));
        }).then((data) => {
            assert(data === expectedData);
            done();
        });
    });

    it('should flatten promises 2', (done) => {
        new MegaPromise((res) => {
            setTimeout(() => {
                res(expectedData);
            }, 20);
        }).then((data) => {
            assert(data === expectedData);
            expectedData = genRandom();
            return new MegaPromise((res) => {
                setTimeout(() => {
                    expectedData = genRandom();
                    res(expectedData);
                }, 30);
            });
        }).then((data) => {
            assert(data === expectedData);
            done();
        });
    });
});
