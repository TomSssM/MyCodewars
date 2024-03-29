# Longest sequence of ones

Your task is to implement algorithm that finds the longest sequence of 1's in array consisting of 1's and 0's. For this task you also have to exclude at least 1 element out of the array, for example:

```js
countOnes([1, 0]); // 1
countOnes([1, 1]); // 1 (because we have to throw away at least one element, thus we throw away 1)
countOnes([0, 0]); // 0
countOnes([1, 1, 1, 0, 1, 0, 0, 1, 1, 1]); // 4 (we throw away 0 at index 3 and get four 1's)
```

<details>

<summary>Task Type</summary>

- __`Array and Counter`__
  <details>

  <summary><i><b><code>Iterate an array keeping one or more counters</code></b></i></summary>

    It is one of those tasks where you use one pointer to iterate the array as well as one or more counters that we may or may not reset sometimes

    The key to the solution of this particular task is to reset one of the counters once we encounter a 0 (as we presume we should exclude only 0 if we are to find the longest sequence of 1's)

    __Note:__ a "counter" is a variable that holds some number which we are going to increase, decrease or change in some other way per iteration (and if we say "reset the counter" it means assign to the counter the value that it had before we started iterating the array)

    __Note:__ we have already seen a somewhat simpler task where we used counters to solve it. The task is called ["3 Greatest Integers in an Array"](../../2\)%20Task%20Challanges.md#30-3-greatest-integers-in-an-array)

  </details>

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
