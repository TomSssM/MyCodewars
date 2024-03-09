# Task Type Summary General

## One Pointer One Array

1. Iterate an array
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

    </details>

2. Iterate an array in reverse
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

    </details>

3. Use values as indexes
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

    </details>

---

## Two Pointers Two Arrays

1. Two pointers of two arrays increase like in Merge Sort
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

    </details>

---

## Two Pointers One Array

1. Two pointers go from start and end until some condition
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

    </details>

2. _Sliding Window_
    1. Right is always ahead of left and window size is fixed
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

        </details>

    2. Right is ahead of left but window size is dynamic
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

                while(condition() && j < array.length) {
                    j++;
                }
            }
        }
        ```

        __Input:__ `[1, 2, 3, 4, 5, 6, 7]`

        __Output:__ `1, 2`, `1, 4`, `3, 4`, `3, 5`, `4, 5`, `5, 6`, `5, 7`, `6, 7`

        </details>

    3. Right is ahead of left but window size is dynamic and right meets left sometimes (they both look at the same element)
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

                while(condition() && j < array.length) {
                    j++;
                }
            }
        }
        ```

        __Input:__ `[1, 2, 3, 4, 5, 6, 7]`

        __Output:__ `1, 1`, `1, 2`, `2, 2`, `2, 3`, `3, 3`, `3, 5`, `5, 5`, `5, 6`, `6, 7`, `7, 7`

        </details>

---

## One Pointer One Array and One or More Counters

1. Iterate an array keeping one or more counters
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

    </details>

---

## One Pointer One Array and HashMap

1. Create and use one or more HashMaps as you iterate an array
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

    </details>

2. Create one or more HashMaps and iterate the HashMap (the HashMaps) in some way
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

    </details>

3. Create one or more HashMaps and iterate the array again using the HashMap (the HashMaps)
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

    </details>

---

## One Pointer One Array and Stack

1. Create and use one or more Stacks as you iterate an array
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

    </details>

---

## Stack or Queue

1. Do while loop while Stack is not empty popping and pushing along the way
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        const stack = [];

        logic(stack);

        while(stack.length) {
            logic(array, stack); // stack.push() stack.pop()
        }
    }
    ```

    </details>

2. Do while loop while Queue is not empty queueing and dequeueing along the way
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        const queue = [];

        logic(queue);

        while(queue.length) {
            logic(array, queue); // queue.push() queue.shift()
        }
    }
    ```

    </details>

3. Merge two Queues of prefixes
    <details>

    <summary>Code</summary>

    __*queue:*__

    ```js
    function approach() {
        let queue = [];

        logic(queue);

        while (condition()) {
            const currentQueue = [];

            while (queue.length > 0) {
                const element = queue.shift();

                currentQueue.push(...logic(element));
            }

            queue = currentQueue;
        }
    }
    ```

    __*recursion:*__

    ```js
    function approach(array) {
        const result = [];

        function backtrack(prefix, offset) {
            if (offset === array.length) {
                result.push(prefix);
                return;
            }

            const value = array[offset];

            backtrack([...prefix, ...logic(value)], offset + 1);
        }

        backtrack([], 0);

        logic(result);
    }
    ```

    </details>

---

## Array Relation of Indexes or Values or Indexes to Values

1. Find the relation between the indexes of the array
2. Find the relation between the values of the array
3. Find the relation of the indexes to values of the array

---

## Array Math Operation on All Elements

1. Do math or bitwise operation on all the elements of the array
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

    </details>

2. Do math or bitwise operation first on all the elements of the array and then to the same counter on all the elements that should be in array
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

    </details>

3. Do math or bitwise operation first on one part of the array and then on another part of of the array
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

    </details>

---

## In-Place Swap and Overwrite

1. Swap elements of one or more arrays
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

    </details>

2. Overwrite elements of one or more arrays
    1. The first pointer goes through the array and upon some condition does two things at once: overwrites the value at the second pointer and increments the second pointer
        <details>

        <summary>Code</summary>

        ```js
        function approach(array) {
            let i = 0;
            let j = 0;

            for (i = 0; i < array.length; i++) {
                if (condition()) {
                    array[j++] = logic(array[i]);
                }
            }
        }

        // or:

        function approach(array) {
            let i = 0;

            for (const value of array) {
                if (condition()) {
                    array[i++] = logic(value);
                }
            }
        }
        ```

        </details>

    2. Iterate the array and get some information. Then based on this information iterate the array again overwriting its values
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

        </details>

---

## Matrix

1. Iterate a matrix
    <details>

    <summary>Code</summary>

    ```js
    function approach(matrix) {
        let i;
        let j;

        // horizontal
        for (i = 0; i < matrix[0].length; i++) {
            logic(matrix[0][i]);
        }

        // vertical
        for (j = 0; j < matrix.length; j++) {
            logic(matrix[j][0]);
        }

        // diagonal
        for (i = 0, j = 0; i < matrix[0].length && j < matrix.length; i++, j++) {
            logic(matrix[j][i]);
        }
    }
    ```

    __Input:__
    ```
    [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ]
    ```

    __Output:__ horizontal: `1`, `2`, `3`, vertical: `1`, `4`, `7`, diagonal: `1`, `5`, `9`

    </details>

---

## Numbers Math

1. Use Prime Numbers
    <details>

    <summary>Code</summary>

    ```js
    function approach() {
        logic(getPrimes, isPrime);
    }

    function getPrimes(limit = 0) {
        const primes = [];

        if (limit === 0) {
            return primes;
        }

        primes.push(2);

        for (let i = 3; i <= limit; i++) {
            let found = true;

            for (let j = 0; j < primes.length; j++) {
                if (i % primes[j] === 0) {
                    found = false;
                    break;
                }
            }

            if (found) {
                primes.push(i);
            }
        }

        return primes;
    }

    function isPrime(num) {
        if (num <= 1) {
            return false;
        }

        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                return false;
            }
        }

        return true;
    }
    ```

    __Output:__ `2`, `3`, `5`, `7`, `11`, `13`, `17`, `19`, `23`, `29`, `31`, `37`, `41`, `43`, `47`, ...

    </details>

2. Use Fibonacci Sequence
    <details>

    <summary>Code</summary>

    ```js
    function approach() {
        logic(fibonacci, getFibonacci);
    }

    function fibonacci(length = 0) {
        if (length === 0) {
            return [];
        }

        if (length === 1) {
            return [0];
        }

        const nums = [0, 1];

        if (length === 2) {
            return nums;
        }

        for (let i = 2; i < length; i++) {
            nums[i] = nums[i - 1] + nums[i - 2];
        }

        return nums;
    }

    function getFibonacci(position = 0) {
        if (position <= 1) {
            return position;
        }

        let prev = 1;
        let current = 2;
        let i = 3;

        while (i < position) {
            const sum = prev + current;

            prev = current;
            current = sum;

            i++;
        }

        return current;
    }
    ```

    __Output:__ `0`, `1`, `1`, `2`, `3`, `5`, `8`, `13`, `21`, `34`, ...

    </details>

---

## Check if Puzzle is Solvable

1. Call the function recursively and see if it solves the puzzle
    <details>

    <summary>Code</summary>

    ```js
    function approach(game) {
        for (let i = 0; i < game[0].length; i++) {
            for (let j = 0; j < game.length; j++) {
                logic(game[j][i]);

                if (approach()) {
                    return true;
                }
            }
        }

        return false;
    }
    ```

    </details>

---

## Backtracking

1. Get all permutations of values of an array in any order (call the function recursively taking out each element out of the array per iteration)
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        const permutations = [];

        if (array.length === 1) { // recursion exit condition
            return [[array[0]]];
        }

        for (let i = 0; i < array.length; i++) {
            const picked = [array[i]];
            const rest = approach(
                array.filter((_value, index) => index !== i)
            );

            for (let j = 0; j < rest.length; j++) {
                const next = [...picked, ...rest[j]];

                permutations.push(next);
            }
        }

        logic(permutations);

        return permutations;
    }
    ```

    __Input:__ `[1, 2, 3]`

    __Output:__ `[ 1, 2, 3 ]`, `[ 1, 3, 2 ]`, `[ 2, 1, 3 ]`, `[ 2, 3, 1 ]`, `[ 3, 1, 2 ]`, `[ 3, 2, 1 ]`

    </details>

2. Get all unique combinations of values of an array in any order (do Depth-first Search of Array)
    <details>

    <summary>Code</summary>

    ```js
    function approach(array) {
        const combinations = [];

        function dfs(current, offset) {
            combinations.push(current);

            logic(current);

            if (offset === array.length) {
                return;
            }

            for (let i = offset; i < array.length; i++) {
                dfs([...current, array[i]], i + 1);
            }
        }

        dfs([], 0);

        logic(combinations);
    }
    ```

    __Input:__ `[1, 2, 3]`

    __Output:__ `[]`, `[1]`, `[2]`, `[3]`, `[1,2]`, `[1,3]`, `[2,3]`, `[1,2,3]`

    </details>

3. Get all unique combinations of values of many arrays in any order (adapt the approach called "Merge two Queues of prefixes")
    <details>

    <summary>Code</summary>

    __*queue:*__

    ```js
    function approach(...arrays) {
        let queue = [[]];

        for (const array of arrays) {
            const currentQueue = [];

            while (queue.length > 0) {
                const currentArray = queue.shift();

                for (const element of array) {
                    currentQueue.push([...currentArray, element]);
                }
            }

            queue = currentQueue;
        }

        logic(queue);
    }
    ```

    __*recursion:*__

    ```js
    function approach(...arrays) {
        const result = [];

        function backtrack(prefix, offset) {
            if (offset === arrays.length) {
                result.push(prefix);
                return;
            }

            const array = arrays[offset];

            for (const value of array) {
                backtrack([...prefix, value], offset + 1);
            }
        }

        backtrack([], 0);

        logic(result);
    }
    ```

    __Input:__ `['1', '2', '3']`, `['a', 'b', 'c']`, `['*', '#', '$']`

    __Output:__
    ```
    [ 1, 'a', '*' ]
    [ 1, 'a', '#' ]
    [ 1, 'a', '$' ]
    [ 1, 'b', '*' ]
    [ 1, 'b', '#' ]
    [ 1, 'b', '$' ]
    [ 1, 'c', '*' ]
    [ 1, 'c', '#' ]
    [ 1, 'c', '$' ]
    [ 2, 'a', '*' ]
    [ 2, 'a', '#' ]
    [ 2, 'a', '$' ]
    [ 2, 'b', '*' ]
    [ 2, 'b', '#' ]
    [ 2, 'b', '$' ]
    [ 2, 'c', '*' ]
    [ 2, 'c', '#' ]
    [ 2, 'c', '$' ]
    [ 3, 'a', '*' ]
    [ 3, 'a', '#' ]
    [ 3, 'a', '$' ]
    [ 3, 'b', '*' ]
    [ 3, 'b', '#' ]
    [ 3, 'b', '$' ]
    [ 3, 'c', '*' ]
    [ 3, 'c', '#' ]
    [ 3, 'c', '$' ]
    ```

    </details>

---

| [:arrow_left: back](./README.md) |
| :---: |