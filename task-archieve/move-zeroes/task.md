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

It is In-Place Swap and Overwrite Task Type where we overwrite elements of the array. To solve it we need to use 2 pointers: the first pointer goes through the array and if the value is not `0` then it writes this value to where the second pointer is and increments the second pointer. In the end start at the second pointer and write zeroes after it until the end of the array. This task uses the same approach as [this task](../remove-duplicates-v2/task.md)

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
