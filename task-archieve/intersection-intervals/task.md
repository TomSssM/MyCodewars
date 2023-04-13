# Intersection of intervals

We have two sorted lists of intervals indicating from which hour until which two users were online (1st array is 1st user and 2nd array is 2nd user). The start of each interval is always less than the end

We need to calculate and return a new list of intervals indicating the intervals when both users were online

_Examples:_

```
user1 [(8, 12), (17, 22)]
user2 [(5, 11), (14, 18), (20, 23), (42, 55)]
  =>  [(8, 11), (17, 18), (20, 22)]

user1 [(9, 15), (18, 21)]
user2 [(10, 14), (21, 22)]
  => [(10, 14)]
```

<details>

<summary>Task Type</summary>

It is one of those tasks where you use two pointers (save indexes like `i` and `j` to a variable, `i` is for the 1st array and `j` is for the 2nd array) to iterate __two__ arrays _specially_ for example by increasing / decrasing either one or the other or both pointers per iteration. The part of the "Merge Sort" algorithm that checks two sub-arrays uses similar mechanics ([link](../../snippets/algorithms/merge-sort.js#L12))

__Note:__ ["Merge Two Sorted Arrays" task](../../1\)%20Task%20Challanges.md#15-merge-two-sorted-arrays) is the most classic example of a task that uses the approach of solving tasks that has been showcased in this particular task (where we have two pointers that point to two arrays and we increment either one pointer or the other, read above)

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) | [:white_check_mark: solution 2](./solution-2.js) |
| :---: | :---: | :---: |
