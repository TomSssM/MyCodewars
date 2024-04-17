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

  <summary><i><b><code>Iterate an array incrementing and decrementing one or more counters</code></b></i> + <i><b><code>Iterate an array keeping one or more max or min counters</code></b></i> + <i><b><code>Iterate an array keeping one or more previous counters</code></b></i></summary>

    <!-- TODO:  Easy Task for Iterate an array incrementing and decrementing one or more counters: you use one pointer to iterate the array as well as one or more counters that we may or may not reset sometimes TODO: maybe like count number of 1's in an array or like the last sequence of 1's after 0 -->

    __Note:__ a "counter" is a variable that holds some number which we are going to increase, decrease or change in some other way per iteration (and if we say "reset the counter" it means assign to the counter the value that it had before we started iterating the array)

    __Note:__ when we say "keep a counter" while iterating an array it means you iterate an array and on some or all iterations you update or reset the counter. Sometimes you merely increment or decrement the counter and sometimes (if the logic of the task is complex) you may assign some cleverly calculated value to it per iteration (the current value of the counter itself may be used to calculate its new value of course)

    <!-- TODO: Easy Task for Iterate an array keeping one or more max or min counters TODO: probably google on leetcode biggest integer in array -->

    <!-- TODO: Easy Task for Iterate an array keeping one or more previous counters TODO: ["3 Greatest Integers in an Array"](../../2\)%20Task%20Challanges.md#30-3-greatest-integers-in-an-array -->

    <!-- TODO: expnanation of the logic of the solution: we combine three Approaches and here comes the explanation -->

  </details>

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
