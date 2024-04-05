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

<summary>Task Type</summary>

- __`Sliding Window`__ + __`Array and HashMap`__
  <details>

  <summary><i><b><code>Sliding Window. Dynamic size</code></b></i> + <i><b><code>Create and use one or more HashMaps as you iterate an array</code></b></i></summary>

    It is one of those tasks where you use two pointers (save indexes like `i` and `j` to a variable) to iterate an array _specially_ for example by increasing or decrasing either one or the other or both pointers per iteration. Here is [another task](../most-water/task.md) whose solution uses similar mechanics though it doesn't use the _Sliding Window_ technique like we need in this task

    For this particular task we need to use the _Sliding Window_ technique and along with the _Sliding Window_ technique you also need to enable the _power of HashMap_

    __Note:__ like we said one of the Approaches used in this task is called _`Sliding Window. Dynamic size`_. The particulars of this Approach are explained in [this task](../best-time-to-buy-and-sell-stock/task.md)

    __Note:__ in order to find out how to use HashMap to solve tasks, please see [this task](../contiguous-array/task.md) or simply read [this article](../literature/hash-map.md)

  </details>

</details>

<details>

<summary>Similar Tasks</summary>

- [Longest Substring Without Repeating Characters](../longest-substring-without-repeating-characters/task.md)
- [Fruit Into Baskets](../fruit-into-baskets/task.md)

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
