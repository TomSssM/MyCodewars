# Longest sequence of 1's

Your task is to implement algorithm that finds the longest sequence of 1's in array consisting of 1's and 0's. For this task you also have to
exclude at least 1 element out of the array, for example:

```js
countOnes([1, 0]); // 1
countOnes([1, 1]); // 1 (because we have to throw away at least one element, thus we throw away 1)
countOnes([0, 0]); // 0
countOnes([1, 1, 1, 0, 1, 0, 0, 1, 1, 1]); // 4 (we throw away 0 at index 3 and get four 1's)
```

<details>

<summary>Task Type</summary>

It is one of those tasks where you use one pointer to iterate the array as well as one or more counters that we may or may not reset sometimes

__Note:__ a counter is a variable that holds some number which we are going to change, increase or decrease per iteration (and if we say reset the counter it means assign to the counter the value that it had before we started iterating the array)

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
