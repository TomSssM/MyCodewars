# Summary Ranges

You are given a __sorted unique__ integer array `nums`

A __range__ `[a,b]` is the set of all integers from `a` to `b` (inclusive)

Return _the **smallest sorted** list of ranges that **cover all the numbers in the array exactly**_. That is, each element of `nums` is covered by exactly one of the ranges, and there is no integer `x` such that `x` is in one of the ranges but not in `nums`

Each range `[a,b]` in the list should be output as:

- `"a->b"` if `a != b`
- `"a"` if `a == b`

__Example 1:__

```
Input: nums = [0, 1, 2, 4, 5, 7]
Output: ["0->2", "4->5", "7"]
Explanation: The ranges are:
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"
```

__Example 2:__

```
Input: nums = [0, 2, 3, 4, 6, 8, 9]
Output: ["0", "2->4", "6", "8->9"]
Explanation: The ranges are:
[0,0] --> "0"
[2,4] --> "2->4"
[6,6] --> "6"
[8,9] --> "8->9"
```

<details>

<summary>Task Type</summary>

- __`Two Pointers One Array`__
  <details>

  <summary><i><b><code>Sliding Window. Right is ahead of left but window size is dynamic and right meets left sometimes (they both look at the same element)</code></b></i></summary>

    In order to solve the Task you should apply the Approach _`Sliding Window. Right is ahead of left but window size is dynamic and right meets left sometimes (they both look at the same element)`_. Except one rather crucial difference of the Approach used here from the Sliding Window Approach we have seen in [this Task](../best-time-to-buy-and-sell-stock/task.md) is that the right and the left pointers may be looking at _the same element_ of the array. This intricacy is utilized here somewhat to get a really elegant solution

    __Note:__ read more about Sliding Window in [this article](../literature/sliding-window.md)

  </details>

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
