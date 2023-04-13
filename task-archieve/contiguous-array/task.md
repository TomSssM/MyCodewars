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

It is a "One Pointer One Array and HashMap" Task Type. We can use HashMap to solve this one (except it is not so obvious at first)

__Note:__ the solution to the ["Remove Duplicate From An Array" task](../../1\)%20Task%20Challanges.md#14-remove-duplicate-from-an-array) is perhaps one of the most classic example of using HashMap to solve a task in `O(n)` time complexity instead of using nested for-loops (therefore "Remove Duplicate From An Array" task is the most classic example of the "One Pointer One Array and HashMap" Task Type, so make sure you understand how it works first before trying to solve this task, it is very crucial!). However _this_ "Contiguous Array" task is more like "One Pointer One Array and HashMap + Counter" Task Type though we can say that it is still "One Pointer One Array and HashMap" Task Type because we use HashMap to solve this task just like in the "Remove Duplicate From An Array" task

__Note:__ you can read more about using HashMap to solve tasks in [this article](../literature/hash-map.md) as this and many other tasks requires this knowledge

__Note:__ we have likewise seen lots of other HashMap tasks before:
- [First Non Repeating Char in a String](../../1\)%20Task%20Challanges.md#20-first-non-repeating-char-in-a-string)
- [Remove Duplicate Chars from a String](../../2\)%20Task%20Challanges.md#21-remove-duplicate-chars-from-a-string)
- [Sum of two equal to a number](../../2\)%20Task%20Challanges.md#24-sum-of-two-equal-to-a-number)
- [Largest Sum of Two](../../2\)%20Task%20Challanges.md#25-largest-sum-of-two)
- [Cash Exchange](../../cheatsheet/cash-exchange.js)
- [Longest Consequtive Sequence](../../cheatsheet/longest-cons-sequence.js)

</details>

<details>

<summary>Hint</summary>

In order to find the longest contiguous subarray with equal number of `0` and `1` create a counter that we increment by one if we encounter `1` and decrement by one when we encounter `0` as we loop through the array. If the counter becomes zero it means we have gone thru as many `1`s as there were `0`s

The key point to solving this task is to realize that we don't have to always arrive at counter equal to zero, we will also have a contiguous array with equal number of `0` and `1` if our counter arrives at the same value as it has already been before meaning that it looped through an equal number of `1` and `0` (and that is where HashMap comes in as well)

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
