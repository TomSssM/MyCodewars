# Letter Combinations of a Phone Number

Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in __any order__

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that `1` does not map to any letters

<img src=../letter-combinations-of-a-phone-number/telephone-keypad.png width=300 />

__Example 1:__

```
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

__Example 2:__

```
Input: digits = ""
Output: []
```

__Example 3:__

```
Input: digits = "2"
Output: ["a","b","c"]
```

__Example 4:__

```
Input: digits = "234"
Output:
[
  "adg", "adh", "adi", "aeg",
  "aeh", "aei", "afg", "afh",
  "afi", "bdg", "bdh", "bdi",
  "beg", "beh", "bei", "bfg",
  "bfh", "bfi", "cdg", "cdh",
  "cdi", "ceg", "ceh", "cei",
  "cfg", "cfh", "cfi"
]
```

<details>

<summary>Task Type</summary>

We can solve this task using a queue and a while loop though it is not obvious at first

__Note:__ the techique of using a queue and a while loop was used to perform the breadth-first search of a Binary Tree for example [here](../../corejs-codejam/task/07-yield-tasks.js#L147) or [here](../../snippets/Data%20Structures/binary-search-tree.js#L222)

__Note:__ this task can also be solved using the more obvious approach for this kind of task using __*Depth-first Search of Array*__ or __*Breadth-first Search of Array*__, see [this copy](../letter-combinations-of-a-phone-number/task.md) of this task for more on that

</details>

<details>

<summary>Hint</summary>

Here is a visual representation of the algorithm

<img src=./letter-combinations-queue.gif width=400 />

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
