# Find Peak Element

A peak element is an element that is strictly greater than its neighbors

Given a __0-indexed__ integer array `nums`, find a peak element, and return its index. If the array contains multiple peaks, return the index to __any of the peaks__

You may imagine that `nums[-1] = nums[n] = -∞`. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array

__Example 1:__

```
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2
```

__Example 2:__

```
Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6
```

<details>

<summary>Task Type</summary>

This is simply a type of task where we iterate an array using one pointer and get the solution

__Note:__ "pointer" is when we save number to variable like `i` and use `i` as an index of the array and increment or decrement `i` per iteration, the `i` variable is thus called a _pointer_

__Note:__ just to be clear, "iteration" is the code that runs inside the braces of the for-loop (each time the same code is run but with different values of the variable `i` (pointer) for example starting at 0 and ending with the index of the last element of the array)

__Note:__ just to be clear, when we say "iterate an array" it means go over all the elements of the array (for example in the for-loop)

We have already seen a similar task called [Love Triangle](../../cheatsheet/love-triangles.js). To solve that task we also simply iterate an array (and do certain things as we iterate it of course)

__Note:__ in the Love Triangle task as we iterate the array we also employ a technique where we use _values_ of elements of the array as _indexes_ (in order to check if there is a cycle)

__Note:__ we have already seen a lot of tasks of the One Pointer One Array type:
- [Palindrome](../../1\)%20Task%20Challanges.md#3-palindrome)
- [Stringo Reverso](../../1\)%20Task%20Challanges.md#17-stringo-reverso)
- [Reverse Word Order](../../1\)%20Task%20Challanges.md#18-reverse-word-order)
- [Reverse Words In Place](../../1\)%20Task%20Challanges.md#19-reverse-words-in-place)

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
