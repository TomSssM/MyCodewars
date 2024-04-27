# Find Peak Element

A peak element is an element that is strictly greater than its neighbors

Given a __0-indexed__ integer array `nums`, find a peak element, and return its index. If the array contains multiple peaks, return the index to __any of the peaks__

You may imagine that `nums[-1] = nums[n] = -∞`. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array

__Example 1:__

```
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2
```

__Example 2:__

```
Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6
```

<details>

<summary>Task Type</summary>

- __`One Pointer One Array`__
  <details>

  <summary><i><b><code>Iterate an array</code></b></i></summary>

    The Approach is that we iterate an array using one pointer. Per itatation we do something with the element of the array knowing its value and its index and so on

    __Note:__ "pointer" is when we save number to a variable like `i` and use `i` as an index of the array to get values of the array and increment or decrement `i` per iteration, the `i` variable is thus called a _pointer_

    __Note:__ just to be clear, "iteration" is the code that runs inside the braces of the for-loop or while-loop (each time the same code is run but with different values of the variable `i` (pointer) for example starting at 0 and ending with the index of the last element of the array)

    __Note:__ just to be clear, when we say "iterate an array" it means go over all the elements of the array (for example in the for-loop)

    In order to solve this Task we need to compare the element the pointer is at to its neighbors. If the element is greater than both its neighbors then we have found a peak element of the array

  </details>

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
