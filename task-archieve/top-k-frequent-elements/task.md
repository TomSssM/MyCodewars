# Top K Frequent Elements

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in __any order__

__Example 1:__

```
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
```

__Example 2:__

```
Input: nums = [1], k = 1
Output: [1]
```

<details>

<summary>Approach</summary>

- `Create one or more HashMaps and iterate the HashMap (the HashMaps) in some way`

</details>

<details>

<summary>Task Type</summary>

It is a "One Pointer One Array and HashMap" Task Type. In order to solve it you need to create HashMap and iterate this HashMap in some way similarly to [this task](../partition-labels/task.md) except here we need to _sort_ this HashMap we get

Just don't be fooled by the mention of "any order" in the task description into thinking it is a Task Type for Backtracking

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
