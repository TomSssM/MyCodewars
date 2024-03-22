# Task Type Summary Data Structures

## __`Stack or Queue`__

1. __*`Do while loop while Stack is not empty popping and pushing along the way`*__
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

    ---

    </details>

2. __*`Do while loop while Queue is not empty queueing and dequeueing along the way`*__
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

    ---

    </details>

3. __*`Merge two Queues of prefixes`*__
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

    ---

    </details>

---

## __`Matrix`__

1. __*`Iterate a Matrix`*__
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

    ---

    </details>

---

| [:arrow_left: back](./README.md) |
| :---: |
