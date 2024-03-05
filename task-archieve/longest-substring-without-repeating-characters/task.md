# Longest Substring Without Repeating Characters

Given a string `s`, find the length of the __longest substring__ without repeating characters

__Example 1:__

```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3
```

__Example 2:__

```
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1
```

__Example 3:__

```
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring
```

<details>

<summary>Approach</summary>

- `Sliding Window`
  - `Right is ahead of left but window size is dynamic`
- `Create and use one or more HashMaps as you iterate an array`

</details>

<details>

<summary>Task Type</summary>

We combine the Approaches of "Sliding Window" (right is ahead of left but window size is dynamic) and "Create and use one or more HashMaps as you iterate an array" to solve this Task just like [this task](../longest-letter-subsequence/task.md)

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
