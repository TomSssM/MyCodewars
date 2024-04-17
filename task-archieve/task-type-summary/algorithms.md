# Task Type Summary Algorithms

## __`Check if Puzzle is Solvable`__

1. __*`Call the function recursively and see if it solves the puzzle`*__
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

    ---

    </details>

---

## __`Numbers Math`__

1. __*`Use Prime Numbers`*__
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

    ---

    </details>

2. __*`Use Fibonacci Sequence`*__
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

    ---

    </details>

---

## __`Backtracking`__

1. __*`Get all permutations of values of an array in any order`*__
    <details>

    <summary>Code</summary>

    Call the function recursively taking out each element out of the array per iteration

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

    ---

    </details>

2. __*`Get all unique combinations of values of an array in any order`*__
    <details>

    <summary>Code</summary>

    Depth-first Search of Array

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

    ---

    </details>

3. __*`Get all unique combinations of values of many arrays in any order`*__
    <details>

    <summary>Code</summary>

    Adapt the Approach _`Merge two Queues of prefixes`_

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

    ---

    </details>

---

## __`Tabulation`__

<!-- TODO: here -->

---

| [:arrow_left: back](./README.md) |
| :---: |
