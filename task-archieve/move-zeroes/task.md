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

<summary>Approach</summary>

- `Overwrite elements of one or more arrays`
  - `The first pointer goes through the array and upon some condition does two things at once: overwrites the value at the second pointer and increments the second pointer`

</details>

<details>

<summary>Task Type</summary>

It is a "In-Place Swap and Overwrite" Task Type. In order to solve the Task you should apply the Approach "Overwrite elements of one or more arrays" (The first pointer goes through the array and upon some condition does two things at once: overwrites the value at the second pointer and increments the second pointer) just like [this task](../remove-duplicates-v2/task.md)

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
