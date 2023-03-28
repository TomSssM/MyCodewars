# Contiguous Array

Given a binary array `nums`, return _the maximum length of a contiguous subarray with an equal number of_ `0` _and_ `1`

__Example 1:__

```
Input: nums = [0,1]
Output: 2
Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1
```

__Example 2:__

```
Input: nums = [0,1,0]
Output: 2
Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1
```

<details>

<summary>Task Type</summary>

It is a One Pointer + Counter + Hashmap type of task

</details>

<details>

<summary>Hint</summary>

In order to find the longest contiguous subarray with equal number of `0` and `1` create a counter that we increment by one if we encounter `1` and decrement by one when we encounter `0` as we loop through the array. If the counter becomes zero it means we have gone thru as many `1`s as there were `0`s

The key point to solving this task is to realize that we don't have to always arrive at counter equal to zero, we will also have a contiguous array with equal number of `0` and `1` if our counter arrives at the same value as it has already been before meaning that it looped through an equal number of `1` and `0`

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js)
| :---: | :---: |
