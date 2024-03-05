# Partition Labels

You are given a string `s`. We want to partition the string into as many parts as possible so that each letter appears in at most one part

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be `s`

Return _a list of integers representing the size of these parts_

__Example 1:__

```
Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij"
This is a partition so that each letter appears in at most one part
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts
```

__Example 2:__

```
Input: s = "eccbbbbdec"
Output: [10]
```

<details>

<summary>Approach</summary>

- `Create one or more HashMaps and iterate the HashMap (the HashMaps) in some way`
- _or_ `Create one or more HashMaps and iterate the array again using the HashMap (the HashMaps)`

</details>

<details>

<summary>Task Type</summary>

This is a "One Pointer One Array and HashMap" Task Type

We have already seen an example of this Task Type when we were solving the ["Contiguous Array" task](../contiguous-array/task.md). But this task is a tar bit more complicated because in the ["Contiguous Array" task](../contiguous-array/task.md) we simply created a HashMap and it helped us solve the task even while we were iterating the input array (or the input data, to be precise) but in _this_ task we need to use a different and a bit more complex but very similar Approach to attain the solution. Here are supposed to _create one or more HashMaps and then do something with all the new data_. Now what does this mean? It means that we need to iterate the array for the first time to create one or more HashMaps and then there are exactly two things that we can do:

1. iterate in some way the one or more HashMaps that we created during the first pass ( __Approach 1__ )

2. iterate the input array once again using the knowledge from the one or more HashMaps that we created during the first pass ( __Approach 2__ )

And thus the solution should be revealed

This Task is kind of interesting in that we can solve this Task using either one or the other of the two Approaches mentioned above! In other words we can solve this task _either_ by iterating the HashMap that we create _or_ by iterating the input array once again using the HashMap

See the Hints below if you get stuck

__Note:__ we say "array" here while the function accepts a string. The logic behind this is that we iterate the string the same way as an array and therefore the input string is like an array for us

</details>

<details>

<summary>Hint 1</summary>

One thing is for sure, we need to create a HashMap where we map the letters to the indexes in the string at which those letters were encountered

<img src=image.png width=550 />

Then follow one of the two Approaches of the "One Pointer One Array and HashMap" Task Type that we learned in the Task Type spoiler above

</details>

<details>

<summary>Hint 2</summary>

As we said there are two Approaches that we can use to solve this Task

__Create HashMap and iterate it ( Approach 1 )__

We need to create a HashMap like we have seen in Hint 1 above

Then if you take a look at the _values_ of the HashMap we can see that the values represent _intervals_ indicating the first and last index where each letter can be found in the input string (in the arrays that make up the values of the HashMap the first value is the first index where the letter can be found and can be treated as the start of the _interval_ and the last value is the last index where the letter can be found and therefore can be treated as the end of the _interval_)

In order to solve the task we need to iterate the values of the HashMap and calculate the start and end of the contiguous interval that several letters make up when the intervals of several letter overlap and then find the intervals that don't overlap (start of the next non-overlapping interval should be greater than the end of the previous non-overlapping interval). The start of each non-overlapping interval determines the group of letters which we can separate from the rest as per the requirements of the task

For example the first 3 letters `a`, `b` and `c` form 3 intervals that do overlap: their intervals `[0,8]`, `[1,5]` and `[4,7]` respectively form a contiguous interval of __`[0,8]`__ (smallest letter index and greatest letter index). And if you look further the next four letters `d`, `e`, `f`, and `g` form 4 intervals that do overlap: their intervals `[9,14]`, `[10,15]`, `[11]` and `[13]` respectively form a contiguous interval of __`[9,15]`__ (smallest letter index and greatest letter index). And we can clearly see that the contiguous interval `[0,8]` of `a`, `b`, `c` does _not_ overlap with the contiguous interval `[9,15]` of `d`, `e`, `f`, `g` and therefore we can separate the letters `a`, `b`, `c` into one group and the letters `d`, `e`, `f`, `g` into another group. The lengths of their groups can be determined by the start and end of their contiguous intervals: from `0` to `8` = 9 letters for the first group, from `9` to `15` = 7 letters for the second group, and so on until we have counted all the letters

__Create HashMap and iterate the input array once again ( Approach 2 )__

This solution is a bit less obvious than the first one

First of all we need to create a HashMap like we have seen in Hint 1 above

Then we need to iterate the input array once again and as we do that this time we should be able to get from the HashMap the _last_ index where any given letter we are looking at has been encountered. As we iterate we should thus keep a counter of the greatest _last_ index where the letters we have already iterated have been encountered. What is crucial to notice for solving this task in this way is that if we are able to find a letter whose index equals to the greatest _last_ index we have seen thus far then we can separate all the letters that we have seen before into a group as per the requirements of the task. Then it should likewise be somewhat trivial to calculate the _length_ of the group we have thus separated

</details>

<details>

<summary>Similar Tasks</summary>

- [Top K Frequent Elements](../top-k-frequent-elements/task.md)

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) | [:white_check_mark: solution 2](./solution-2.js) |
| :---: | :---: | :---: |
