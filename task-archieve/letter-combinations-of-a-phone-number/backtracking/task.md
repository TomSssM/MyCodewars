# Letter Combinations of a Phone Number

Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in __any order__

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that `1` does not map to any letters

<img src=./telephone-keypad.png width=300 />

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

We can solve this task using __*Depth-first Search of Array*__ (solution 1) exactly in the same way as [Combinations task](../../combinations/task.md)

The point of this task is that it can also be solved using the __*Breadth-first Search of Array*__ (solution 2). It works in this way:
1. At the beginning, it is an empty string
2. The new layer is obtained by adding characters at the end of the previous layer
3. After the new layer is obtained, the previous layer is not used

It is probably best to see the actual [solution 2](./solution-2.js) to understand exactly how it works

__Note:__ this task can also be solved using a Queue and a while loop, see [this copy](../while-loop-and-stack-or-queue/task.md) of this task for how to solve this task if we treat it as "While Loop and Stack or Queue" Task Type

</details>

---

| [:arrow_left: back](../../task-type.md) | [:white_check_mark: solution](./solution.js) | [:white_check_mark: solution 2](./solution-2.js) |
| :---: | :---: | :---: |
