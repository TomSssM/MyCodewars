# Valid Parentheses

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid

An input string is valid if:
1. Open brackets must be closed by the same type of brackets
2. Open brackets must be closed in the correct order
3. Every closed bracket has a corresponding open bracket of the same type

__Example 1:__

```
Input: s = "()"
Output: true
```

__Example 2:__

```
Input: s = "()[]{}"
Output: true
```

__Example 3:__

```
Input: s = "(]"
Output: false
```

<details>

<summary>Task Type</summary>

- __`Array and Stack or Queue`__
  <details>

  <summary><i><b><code>Create and use one or more Stacks as you iterate an array</code></b></i></summary>

    So you need to iterate a string as an array and use a Stack in order to solve the task

    If you encounter an opening bracket then you need to push it to the Stack. If you encounter a closing bracket then you need to pop the opening bracket off the Stack (only make sure that you pop off the same type of opening bracket as you found a closing bracket for otherwise the brackets are placed incorrectly)

    __Note:__ we have already given a try to solving this task [here](../../cheatsheet/brackets/README.md)

  </details>

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
