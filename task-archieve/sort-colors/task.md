# Sort Colors

Given an array `nums` with `n` objects colored red, white, or blue, sort them _in-place_ so that objects of the same color are adjacent, with the colors in the order: red, white, and blue

We will use the integers `0`, `1` and `2` to represent the color red, white, and blue, respectively

You must solve this problem without using the library's `sort` function

__Example 1:__

```
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
```

__Example 2:__

```
Input: nums = [2,0,1]
Output: [0,1,2]
```

<details>

<summary>Hint</summary>

This is a Task Type for in-place swap and overwrite of the array. We have already seen an example where we need to do in-place _swap_ [here](../sort-letters-two-arrays/task.md) and an example where we need to do in-place _overwrite_ [here](../remove-duplicates-sorted-array/task.md)

The beauty of this task is that it can be solved _both_ ways either by _swapping_ elements or _overwriting_ elements of the array

The solution that entails overwriting is less optimized than the swapping type of solution but the swapping type of solution is less obvious because it uses the "Dutch National Flag" algorithm

You can find the overwriting type of solution and the swapping type of solution by studying the corresponding Approaches in the "Task Type" spoiler

</details>

<details>

<summary>Task Type</summary>

- __`In-Place Swap and Overwrite`__
  <details>

  <summary><i><b><code>Overwrite elements of one or more arrays. Iterate the array and get some information. Then based on this information iterate the array again overwriting its values</code></b></i></summary>

    The solution that entails overwriting elements of the array is a two-pass algorithm using counting sort

    Iterate the array counting number of `0`s, `1`s, and `2`s

    Overwrite the array with the _total_ number of `0`s, then `1`s and followed by `2`s

  </details>

  ---

  <details>

  <summary><i><b><code>Swap elements of one or more arrays. Dutch National Flag algorithm</code></b></i></summary>

    The solution that entails swapping elements of the array is a famous Dutch National Flag alogrithm. The Dutch National Flag algorithm is a sorting algorithm that partitions an array containing elements of three distinct values (for example, `0`s, `1`s, and `2`s) into three parts, in a single traversal of the array. The algorithm is named after the Dutch national flag, which has three horizontal stripes of red, white, and blue

    The algorithm uses three pointers (let's call them `s`, `e` and `n` respectively) to partition the array into three sections:

    1. `A[0...s-1]` contains all elements that are smaller than the middle value (in the example above, the `0`s)

    2. `A[s...e]` contains all elements that are equal to the middle value (in the example above, the `1`s)

    3. `A[e+1...n-1]` contains all elements that are larger than the middle value (in the example above, the `2`s)

    Initially, the pointer `s` points to the beginning of the array, and the pointer `e` points to the end of the array. A third pointer, `i`, starts at the beginning of the array and moves forward one element at a time

    The algorithm continues until the `i` pointer reaches the end of the array. If the element at `A[i]` is smaller than the middle value, it is swapped with the element at `A[s]`, and both pointers `i` and `s` are incremented. If the element at `A[i]` is larger than the middle value, it is swapped with the element at `A[e]`, and the pointer `e` is decremented. If the element at `A[i]` is equal to the middle value, the pointer `i` is incremented

    This algorithm works because, at any point in time during the while loop, the following invariants hold true:

    1. All elements before `s` are smaller than the middle value
    2. All elements after `e` are larger than the middle value
    3. All elements between `s` and `i-1` are equal to the middle value
    4. All elements between `i` and `e` are unprocessed

  </details>

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) | [:white_check_mark: solution 2](./solution-2.js) |
| :---: | :---: | :---: |
