# Missing Number in Sorted Array

Given a __sorted__ array `nums` containing `n` distinct numbers in the range `[0, n]`, return _the only number in the range that is missing from the array_

__Example 1:__

```
Input: nums = [0,1,3]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums
```

__Example 2:__

```
Input: nums = [0,1]
Output: 2
Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums
```

__Example 3:__

```
Input: nums = [0,1,2,3,4,5,6,7,9]
Output: 8
Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums
```

<details>

<summary>Approach</summary>

- `Find the relation of the indexes to values of the array`

</details>

<details>

<summary>Task Type</summary>

This is a classic task where you need to look at and analyze the _relation_ between the indexes of the array, or the _relation_ between the values of the array, or the _relation_ of the indexes to the values of the array. Basically it could mean something like this: see what index (or value) the element of the array had and what index (or value) the element of the array should have in the solution and find the relation between these two

To solve this particular task you should merely see the _relation_ of the indexes to the values of the array in that each value in the array should be _equal_ to its index and if it is not then the index of the value is the missing number!

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
