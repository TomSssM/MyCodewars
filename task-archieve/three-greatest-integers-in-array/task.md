# 3 Greatest Integers in Array

Given an array of positive integers return the _3 greatest integers in the array_ in descending order. If an array is empty return `-1`, `-1`, `-1`

__Example 1:__

```
Input: [5,4,3,6,7,8,9,10,1,2]
Output: [10,9,8]
```

__Example 2:__

```
Input: [1,2,2,1,1,3,1,1,1]
Output: [3,2,1]
```

__Example 3:__

```
Input: [2,3,2,1,4,7,3,2,2,1]
Output: [7,4,3]
```

__Example 4:__

```
Input: []
Output: [-1,-1,-1]
```

<details>

<summary>Task Type</summary>

- __`Array and Counter`__
  <details>

  <summary><i><b><code>Iterate an array keeping one or more previous counters</code></b></i></summary>

    The Approach is that we create and keep several counters and whilst iterating the array each time we update the value of one counter we save the previous value of this counter to one of the other counters. For example imagine we have two counters: counter A equal to `2` and counter B equal to `1`. If we update the value of counter A to `3` then we save the previous value `2` of counter A to counter B. Thus counter A becomes `3` and counter `B` becomes `2` (`2` is the previous value of counter A). If we update counter A again we do the same thing. And the same if we had 3 counters: counter A, counter B and counter C. Updating counter A we would set counter C to the value of counter B and counter B would be set to the value of counter A and only after that would counter A be updated. This way we have several counters that hold as if the _history_ of all the values that some counter had while we were iterating the array

    __Note:__ the number of counters you can use this way is obviously not limited to just 2 or 3. You may keep as many counters as you need: the first counter is going to be some value (computed according to some logic) and the other counters are going to be the previous values that the first counter ever had during the entire iteration of the array

    In order to solve this Task we need to create 3 counters (counter A, counter B and counter C) and initialize them to `-1`. Each time we find a value that is greater than the value of counter A we do the following: set counter C to the value of counter B then set counter B to the value of counter A and finally update counter A. The tricky part is the logic of the solution: we also need to update counter B and counter C if the value in the array we are looking at during iteration is greater than counter B but smaller than counter A (counter C is set to the value of counter B and counter B is updated) and the same for counter C: update counter C if the value we are looking at is greater than counter C but smaller than counter A and counter B. Also avoid the situation where the three counters might become equal to one another. This way we get the 3 greatest integers in the array

  </details>

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
