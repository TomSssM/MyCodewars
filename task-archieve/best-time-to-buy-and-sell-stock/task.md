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

- __`Sliding Window`__
  <details>

  <summary><i><b><code>Sliding Window. Dynamic size</code></b></i></summary>

    This is a task for two pointers. Sometimes two pointers move such that one pointer (left pointer) is always behind the other pointer (right pointer). Such a technique when we have the left pointer behind the right pointer and per iteration we either increment the left pointer or the right pointer or per iteration we increment both the left and the right pointers is called "_Sliding Window_"

    In order to learn the basics of the "_Sliding Window_" technique read [this article](../literature/sliding-window.md). We are going to build all further explanation on top of the knowledge from the article

    The size of the Sliding Window is the number of elements of the array between the left and the right pointers. In [the article](../literature/sliding-window.md) the size of the Sliding Window was always the same (we call it "fixed size") because we were always looking at two elements: `i` (right pointer) and `i - m` (`i - WINDOW_SIZE`, left pointer) and the left pointer was always the same distance from the right pointer. Therefore our Window (the elements of the array between the left and the right pointers) always had the same fixed size but for the solution of some "_Sliding Window_" tasks (like this one) we may need to use dynamic (not fixed) size of the Sliding Window

    Dynamic size of the Sliding Window means that whilst the left pointer is always behind the right pointer the distance between the left and the right pointers may change according to some logic. In other words with dynamic size of the Sliding Window both left and right pointers go along the array (left behind right) and they change Window size (the distance between each other) as they go and this is exactly the trick of the Approach we need to implement for the soltuion of this task

    Thus using the _`Sliding Window. Dynamic size`_ Approach you don't have to always increment the left pointer by one or the right pointer by one: the pointers can be set to any index they want so long as the left is behind the right. Indeed the left pointer may even go to the same position as the right pointer while the right pointer increments by one to be ahead of the left pointer. As you can see this Sliding Window we have been talking about may shrink and expand at will

    __Note:__ [this task](../longest-letter-subsequence/task.md) likewise uses the same Sliding Window Approach _`Sliding Window. Dynamic size`_ but combines it with one of the HashMap Approaches

  </details>

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) | [:white_check_mark: solution 2](./solution-2.js) |
| :---: | :---: | :---: |
