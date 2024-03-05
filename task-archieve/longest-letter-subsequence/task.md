# Longest sequence of letters

You are given a string of length `L` composed of `N` different letters. Your task is to find the longest substring that would consist of at least `K` different letters

__Example:__
string `'aaccdd'` if `L = 6` and `N = 3` and
- `K=1` then `2`
- `K=2` then `4`
- `K=3` then `6`

```js
longestStr('aaccdd', 1); // L=6 N=3 K=1 result: 2
longestStr('aaccdd', 2); // L=6 N=3 K=2 result: 4
longestStr('aaccdd', 3); // L=6 N=3 K=3 result: 6
longestStr('aabaaccdd', 3); // L=9 N=4 K=3 result: 7
longestStr('ababababccddddddd', 3); // L=17 N=4 K=3 result: 10
```

<details>

<summary>Approach</summary>

- `Sliding Window`
  - `Right is ahead of left but window size is dynamic`
- `Create and use one or more HashMaps as you iterate an array`

</details>

<details>

<summary>Task Type</summary>

We combine the Approaches of "Sliding Window" (right is ahead of left but window size is dynamic) and "Create and use one or more HashMaps as you iterate an array" to solve this Task

It is one of those tasks where you use two pointers (save indexes like `i` and `j` to a variable) to iterate an array _specially_ for example by increasing or decrasing either one or the other or both pointers per iteration. Here is [another task](../most-water/task.md) whose solution uses similar mechanics. But for this particular task you may also need to enable the _power of HashMap_ and the _Sliding Window_ technique

__Note:__ one of the Approaches used in this task is called "_Sliding Window_". The particulars of this Approach are also discussed in [this task](../best-time-to-buy-and-sell-stock/task.md) but you can also read more about the "Sliding Window" Approach in [this article](../literature/sliding-window.md)

__Note:__ in order to find out how to use HashMap to solve tasks, please see [this task](../contiguous-array/task.md) or simply read [this article](../literature/hash-map.md)

</details>

<details>

<summary>Similar Tasks</summary>

- [Longest Substring Without Repeating Characters](../longest-substring-without-repeating-characters/task.md)
- [Fruit Into Baskets](../fruit-into-baskets/task.md)

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
