# The Last Sequence of Ones

You are given a binary array `nums`. Binary array means that the array consists only of `1`s and `0`s. You need to return the length of the last sequence of `1`s after the last `0` in the array

__Example 1:__

```
Input: nums = [1, 0, 1, 1, 1]
                     ^  ^  ^
Output: 3
Explanation: the last 0 is at index 1 followed by 3 more 1s thus the length of the last sequence of 1s after the last 0 is 3
```

__Example 2:__

```
Input: nums = [0, 1, 1, 1, 0, 1, 1]
                              ^  ^
Output: 2
Explanation: we have a sequence of 1s whose length is 3 after the first 0 and another sequence of 1s whose length is 2 after the second 0 thus the length of the last sequence of 1s after the last 0 is 2
```

__Example 3:__

```
Input: nums = [1, 1, 1]
               ^  ^  ^
Output: 3
Explanation: we don't have 0s at all thus the length of the last sequence of 1s after the last 0 is 3 (the length of the entire array). For our purpose we are required to assume that if the array doesn't have 0s at all then the last 0 is at index -1
```

__Example 4:__

```
Input: nums = [0, 1, 1, 1, 0]
Output: 0
Explanation: 0 is the last element of the array thus the last sequence of 1s after the last 0 doesn't exist and its length is therefore 0
```

__Example 5:__

```
Input: nums = []
Output: 0
Explanation: the array is empty thus the last sequence of 1s after the last 0 doesn't exist and its length is therefore 0
```

<details>

<summary>Task Type</summary>

- __`Array and Counter`__
  <details>

  <summary><i><b><code>Iterate an array keeping one or more counters</code></b></i></summary>

    The Approach is that we iterate an array and keep one or more counters

    __Note:__ a "counter" is a variable that holds some number which we are going to increase, decrease or change in some other way per iteration. A _counter_ variable is created before we start iterating the array (before the for-loop) and is thus accessible during the entire iteration of the array as well as after the entire iteration of the array (after the for-loop)

    __Note:__ and if we say "reset a counter" it means assign to a counter the value that it had before we started iterating the array

    __Note:__ when we say "keep a counter" while iterating an array it means you iterate an array and on some or all iterations you update or reset the counter. Sometimes you merely increment or decrement the counter and sometimes (if the logic of the task is complex) you may assign some cleverly calculated value to the counter per iteration (the current value of the counter itself may be used to calculate its new value of course) and other times you may want to reset the counter back to its initital value it had before we started iterating the array

    In order to solve this Task we need to create a counter then initialize it to `0` and then iterate the array applying the following logic: if we encounter a `1` in the array then we increment the counter and if we encounter a `0` in the array then we reset the counter back to its initial value of `0`. Thus at the end of the iteration of the entire array the counter will hold the length of the last sequence of `1`s after the last `0`

  </details>

---

- __`Array and Counter`__ + __`One Pointer One Array`__
  <details>

  <summary><i><b><code>Iterate an array incrementing and decrementing one or more counters</code></b></i> + <i><b><code>Iterate an array in reverse</code></b></i></summary>

    Another way we can solve this Task is if we apply the _`Iterate an array in reverse`_ Approach in addition to the _`Iterate an array incrementing and decrementing one or more counters`_ Approach. If we iterate the array in reverse then we can solve the Task via the simplest manipulations to the counter, that is by merely incrementing and decrementing the counter but never having to reset the counter or anything. All we need to do is iterate the array in reverse incrementing the counter if we come across a `1` in the array and stop iterating the array either if we come across a `0` in the array or if we reach the end of the array ([solution 2](./solution-2.js))

  </details>

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) | [:white_check_mark: solution 2](./solution-2.js) |
| :---: | :---: | :---: |
