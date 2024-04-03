# Move Zeroes

Given an integer array `nums`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements

__Note__ that you must do this in-place without making a copy of the array

__Example 1:__

```
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
```

__Example 2:__

```
Input: nums = [0]
Output: [0]
```

<details>

<summary>Task Type</summary>

- __`In-Place Swap and Overwrite`__
  <details>

  <summary><i><b><code>Overwrite elements of one or more arrays. The first pointer goes through the array and upon some condition does two things at once: overwrites the value at the second pointer and increments the second pointer</code></b></i></summary>

    Just like [this task](../remove-duplicates-sorted-array/task.md)

  </details>

  ---

  <details>

  <summary><i><b><code>Swap elements of one or more arrays. The first pointer goes through the array and upon some condition does two things at once: swaps the value at the first pointer with the value at the second pointer and increments the second pointer</code></b></i></summary>

    Just like [this task](../remove-duplicates-sorted-array/task.md)

    Swapping solution is kind of more interesting because it doesn't need to fill array with zeros after the second pointer once the first pointer has finished its pass of the array

  </details>

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) | [:white_check_mark: solution 2](./solution-2.js) |
| :---: | :---: | :---: |
