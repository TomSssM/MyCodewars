# Remove Duplicates from Sorted Array v2

Given an integer array `nums` sorted in __non-decreasing order__, remove some duplicates __in-place__ such that each unique element appears __at most twice__. The __relative order__ of the elements should be kept the __same__

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the __first part__ of the array `nums`. More formally, if there are `k` elements after removing the duplicates, then the first `k` elements of `nums` should hold the final result. It does not matter what you leave beyond the first `k` elements

Return `k` _after placing the final result in the first_ `k` _slots of_ `nums`

Do __not__ allocate extra space for another array. You must do this by __modifying the input array in-place__ with `O(1)` extra memory

__Example 1:__

```
Input: nums = [1,1,1,2,2,3]
Output: 5, nums = [1,1,2,2,3,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

__Example 2:__

```
Input: nums = [0,0,1,1,1,1,2,3,3]
Output: 7, nums = [0,0,1,1,2,3,3,_,_]
Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

<details>

<summary>Task Type</summary>

This is an in-place algorithm just like we have seen in [that task](../sort-letters-two-arrays/task.md) except instead of swapping the elements we are going to be _overwriting_ the elements of the array with new values

So in other words it is the same algorithm type as [that task](../sort-letters-two-arrays/task.md) except in this task we can see its counterpart type where we are overwriting elements of an array instead of swapping elements of an array

There are only two types of in-place algorithms: swapping and overwriting. Here is a quote from Wikipedia to prove my point:

"""

_In computer science, an in-place algorithm is an algorithm which transforms input using no auxiliary data structure. However, a small amount of extra storage space is allowed for auxiliary variables. The input is usually overwritten by the output as the algorithm executes. An in-place algorithm updates its input sequence only through replacement or swapping of elements. An algorithm which is not in-place is sometimes called not-in-place or out-of-place._

"""

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
