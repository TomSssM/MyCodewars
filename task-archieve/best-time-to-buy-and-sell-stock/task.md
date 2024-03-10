# Best Time to Buy and Sell Stock

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day

You want to maximize your profit by choosing a __single day__ to buy one stock and choosing a __different day in the future__ to sell that stock

Return _the maximum profit you can achieve from this transaction_. If you cannot achieve any profit, return `0`

__Example 1:__

```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell
```

__Example 2:__

```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0
```

<details>

<summary>Task Type</summary>

- __`Two Pointers One Array`__
  <details>

  <summary><i><b><code>Sliding Window. Right is ahead of left but window size is dynamic</code></b></i></summary>

    This is a task for two pointers, particularly when they both move left to right (like in [this](../longest-letter-subsequence/task.md) task) and _not_ from end or start (like in [this](../most-water/task.md) task). Sometimes two pointers move such that one pointer (left pointer) is always behind the other pointer (right pointer). Such a technique when we have left pointer behind right pointer and per iteration we either increment left pointer or right pointer or per iteration we increment both left and right pointers is called "_Sliding Window_"

    You should also note that with Sliding Window technique you don't have to always increment left pointer by one or right pointer by one: the pointers can be set to any index they want so long as left is behind right. Indeed left pointer may even go to the same position as right pointer while right pointer increments by one to be ahead of left pointer. As you can see this Sliding Window we have been talking about may shrink and expand at will

    __Note:__ [this task](../longest-letter-subsequence/task.md) likewise uses the Sliding Window Approach

    __Note:__ you can read more about the "Sliding Window" approach in [this article](../literature/sliding-window.md)

  </details>

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) | [:white_check_mark: solution 2](./solution-2.js) |
| :---: | :---: | :---: |
