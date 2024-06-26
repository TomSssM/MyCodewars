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

- __`Backtracking`__
  <details>

  <summary><i><b><code>Get all unique combinations of values of many arrays in any order</code></b></i></summary>

    <!-- TODO: abstract explanation of the Approach TODO: The Approach is that ... -->
    <!--
    It works in this way:
    1. At the beginning, it is an empty string
    2. A new layer is obtained by adding characters at the end of the previous layer
    3. After the new layer is obtained, the previous layer is not used
    -->

    Think of each button of the phone as an array consisting of 3 elements (for example for button `"2"` the elements of the array are `['a', 'b', 'c']`). As you can see if we have digits `234` then in order to solve the task we need to find all the unique combinations of values of the arrays `['a', 'b', 'c']`, `['d', 'e', 'f']` and `['g', 'h', 'i']`. Thus we can solve the task if we use the Approach _`Get all unique combinations of values of many arrays in any order`_. In order to do this we need to tweak the Approach called _`Merge two Queues of prefixes`_ which we have seen in pure form in [this task](../unpack-ip/task.md)

    Here is a visual representation of the algorithm:

    <img src=./letter-combinations-queue.gif width=400 />

    __Note:__ you can also get all unique combinations of values of many arrays in any order by using the recursive variation of the Approach ([solution 3](./solution-3.js)) but as we have seen in the past using a Queue is more efficient than recursion because with a Queue you don't risk getting a stack overflow error

  </details>

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) | [:white_check_mark: solution 2](./solution-2.js) | [:white_check_mark: solution 3](./solution-3.js) |
| :---: | :---: | :---: | :---: |
