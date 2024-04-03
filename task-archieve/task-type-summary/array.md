# Task Type Summary Array

## __`One Pointer One Array`__

1. __*`Iterate an array`*__
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        for (let i = 0; i < array.length; i++) {
            logic(array[i], i);
        }
    }
    ```

    __Input:__ `[1, 2, 3]`

    __Output:__ value: `1`, `2`, `3`, index: `0`, `1`, `2`

    ---

    </details>

2. __*`Iterate an array in reverse`*__
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        for (let i = array.length - 1; i >= 0; i--) {
            logic(array[i], i);
        }
    }
    ```

    __Input:__ `[1, 2, 3]`

    __Output:__ value: `3`, `2`, `1`, index: `2`, `1`, `0`

    ---

    </details>

3. __*`Use values as indexes`*__
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        for (let i = 0; i < array.length; i++) {
            logic(array[array[i]]);
        }
    }
    ```

    __Input:__ `[1, 2, 3]`

    __Output:__ `2`, `3`, `undefined`

    ---

    </details>

---

## __`Two Pointers Two Arrays`__

1. __*`Two pointers of two arrays increase like in Merge Sort`*__
    <details>

    <summary>Code</summary>

    ```js
    function approach(array1, array2) {
        let i = 0;
        let j = 0;

        while (i < array1.length && j < array2.length) {
            if (condition()) {
                logic(array1[i++]);
            } else {
                logic(array2[j++]);
            }
        }

        while (i < array1.length) {
            logic(array1[i++]);
        }

        while (j < array1.length) {
            logic(array2[j++]);
        }
    }
    ```

    __Input:__ `[1, 2, 3]`, `['a', 'b', 'c']`

    __Output:__ intermingled values of both arrays

    ---

    </details>

---

## __`Two Pointers One Array`__

1. __*`Two pointers go from start and end until some condition`*__
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        let i = 0;
        let j = array.length - 1;

        while (i < j) {
            logic(array[i], array[j]);

            if (condition()) {
                i++;
            } else {
                j--;
            }
        }
    }
    ```

    ---

    </details>

---

## __`Sliding Window`__

1. __*`Sliding Window. Fixed size`*__
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        let i = 0;

        for (i = 0; i < WINDOW_SIZE; i++) {
            logic(array[i]);
        }

        while (i < array.length) {
            logic(array[i - WINDOW_SIZE], array[i]);
            i++;
        }
    }
    ```

    __Input:__ `WINDOW_SIZE = 3`, `[1, 2, 3, 4, 5, 6, 7]`

    __Output:__ `1, 4`, `2, 5`, `3, 6`, `4, 7`

    ---

    </details>

2. __*`Sliding Window. Dynamic size`*__
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        let i = 0;
        let j = 1;

        while (j < array.length) {
            logic(array[i], array[j]);

            while (i < j - 1) {
                if (condition()) {
                    i++;
                }
            }

            while (condition() && j < array.length) {
                j++;
            }
        }
    }
    ```

    __Input:__ `[1, 2, 3, 4, 5, 6, 7]`

    __Output:__ `1, 2`, `1, 4`, `3, 4`, `3, 5`, `4, 5`, `5, 6`, `5, 7`, `6, 7`

    ---

    </details>

3. __*`Sliding Window. Dynamic size. Left meets right sometimes`*__
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        let i = 0;
        let j = 0;

        while (j < array.length) {
            logic(array[i], array[j]);

            while (i < j) {
                if (condition()) {
                    i++;
                }
            }

            while (condition() && j < array.length) {
                j++;
            }
        }
    }
    ```

    __Input:__ `[1, 2, 3, 4, 5, 6, 7]`

    __Output:__ `1, 1`, `1, 2`, `2, 2`, `2, 3`, `3, 3`, `3, 5`, `5, 5`, `5, 6`, `6, 7`, `7, 7`

    ---

    </details>

---

## __`Array and Counter`__

1. __*`Iterate an array keeping one or more counters`*__
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        let counter;

        for (let i = 0; i < array.length; i++) {
            logic(array[i], counter);
        }
    }
    ```

    ---

    </details>

---

## __`Array and HashMap`__

1. __*`Create and use one or more HashMaps as you iterate an array`*__
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        const hashMap = {};

        for (let i = 0; i < array.length; i++) {
            logic(array[i], hashMap);
        }
    }
    ```

    ---

    </details>

2. __*`Create one or more HashMaps and iterate the HashMap (the HashMaps) in some way`*__
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        const hashMap = {};

        for (let i = 0; i < array.length; i++) {
            logic(array[i], hashMap);
        }

        logic(hashMap, Object.entries(hashMap));
    }
    ```

    ---

    </details>

3. __*`Create one or more HashMaps and iterate the array again using the HashMap (the HashMaps)`*__
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        const hashMap = {};

        for (let i = 0; i < array.length; i++) {
            logic(array[i], hashMap);
        }

        for (let i = 0; i < array.length; i++) {
            logic(array[i], hashMap);
        }
    }
    ```

    ---

    </details>

---

## __`Array and Stack or Queue`__

1. __*`Create and use one or more Stacks as you iterate an array`*__
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        const stack = [];

        for (let i = 0; i < array.length; i++) {
            logic(array[i], stack); // stack.push() stack.pop()
        }
    }
    ```

    ---

    </details>

2. __*`Create and use one or more Queues as you iterate an array`*__
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        const queue = [];

        for (let i = 0; i < array.length; i++) {
            logic(array[i], queue); // queue.push() queue.shift()
        }
    }
    ```

    ---

    </details>

---

## __`Array Relation of Indexes and Values`__

1. __*`Find the relation between the indexes of the array`*__
2. __*`Find the relation between the values of the array`*__
3. __*`Find the relation between the indexes and the values of the array`*__

---

## __`Array Math Operation on All Elements`__

1. __*`Do math or bitwise operation on all the elements of the array`*__
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        let counter = 0;

        for (const value of array) {
            counter += value; // math
            // or:
            counter ^= value; // bitwise
        }

        logic(counter);
    }
    ```

    ---

    </details>

2. __*`Do math or bitwise operation first on all the elements of the array and then to the same counter on all the elements that should be in the array`*__
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        let counter = 0;

        for (const value of array) {
            counter += value; // math
            // or:
            counter ^= value; // bitwise
        }

        for (let i = 0; i <= array.length; i++) {
            counter += i; // math
            // or:
            counter ^= i; // bitwise
        }

        logic(counter);
    }
    ```

    ---

    </details>

3. __*`Do math or bitwise operation first on one part of the array and then on another part of of the array`*__
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        let i;
        let n = logic(); // index of array

        let counter1 = 0;
        let counter2 = 0;

        for (i = 0; i < n; i++) {
            const value = array[i];

            counter1 += value; // math
            // or:
            counter1 ^= value; // bitwise
        }

        for (i = n; i < array.length; i++) {
            const value = array[i];

            counter2 += value; // math
            // or:
            counter2 ^= value; // bitwise
        }

        logic(counter1, counter2);
    }
    ```

    ---

    </details>

---

## __`In-Place Swap and Overwrite`__

1. __*`Swap elements of one or more arrays`*__
    1. __*`Swap elements of one or more arrays`*__
        <details>

        <summary>Code</summary>

        ```js
        function approach(array) {
            for (let i = 0; i < array.length; i++) {
                logic(array, i, swap);
            }
        }

        function swap(array, i1, i2) {
            ([array[i1], array[i2]] = [array[i2], array[i1]]);
        }
        ```

        ---

        </details>

    2. __*`The first pointer goes through the array and upon some condition does two things at once: swaps the value at the first pointer with the value at the second pointer and increments the second pointer`*__
        <details>

        <summary>Code</summary>

        ```js
        function approach(array) {
            let i = 0; // or 1
            let j = 0;

            for (i = 0; i < array.length; i++) {
                if (condition()) {
                    swap(array, i, j);
                    j++;
                }
            }
        }

        function swap(array, i1, i2) {
            ([array[i1], array[i2]] = [array[i2], array[i1]]);
        }
        ```

        ---

        </details>

    3. __*`Swap one part of the array with the other part of the array`*__
        <details>

        <summary>Code</summary>

        ```js
        function approach(array) {
            const partsSeparator = logic(array);

            for (let i = 0; i < partsSeparator; i++) {
                const j = logic(array, partsSeparator, i);

                swap(array, i, j);
            }
        }

        function swap(array, i1, i2) {
            ([array[i1], array[i2]] = [array[i2], array[i1]]);
        }
        ```

        ---

        </details>

    4. __*`Dutch National Flag algorithm`*__
        <details>

        <summary>Code</summary>

        If smaller then s++ and mid++. If middle then mid++. If larger then e--

        ```js
        const SMALLER = 0;
        const MIDDLE = 1;
        const LARGER = 2;

        function DutchNationalFlagAlgorithm(array) {
            let s = 0;
            let e = array.length - 1;
            let mid = 0;

            while (mid <= e) {
                if (array[mid] === SMALLER) {
                    swap(array, mid, s);
                    s++;
                    mid++;
                } else if (array[mid] === MIDDLE) {
                    mid++;
                } else { // array[mid] === LARGER
                    swap(array, mid, e);
                    e--;
                }
            }
        }

        function swap(array, i1, i2) {
            ([array[i1], array[i2]] = [array[i2], array[i1]]);
        }
        ```

        ---

        </details>

2. __*`Overwrite elements of one or more arrays`*__
    1. __*`The first pointer goes through the array and upon some condition does two things at once: overwrites the value at the second pointer and increments the second pointer`*__
        <details>

        <summary>Code</summary>

        ```js
        function approach(array) {
            let i = 0; // or 1
            let j = 0;

            for (i = 0; i < array.length; i++) {
                if (condition()) {
                    array[j++] = logic(array[i]);
                }
            }
        }
        ```

        ---

        </details>

    2. __*`Iterate the array and get some information. Then based on this information iterate the array again overwriting its values`*__
        <details>

        <summary>Code</summary>

        ```js
        function approach(array) {
            let i = 0;

            for (i = 0; i < array.length; i++) {
                logic(array[i], i);
            }

            for (i = 0; i < array.length; i++) {
                array[i] = logic();
            }
        }
        ```

        ---

        </details>

---

| [:arrow_left: back](./README.md) |
| :---: |
