# Zigzag Conversion

The string `"PAYPALISHIRING"` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

```
P   A   H   N
A P L S I I G
Y   I   R
```

And then read line by line: `"PAHNAPLSIIGYIR"`

Write the code that will take a string and make this conversion given a number of rows:

```
string convert(string s, int numRows);
```

__Example 1:__

__Input:__ `s = "PAYPALISHIRING", numRows = 3`

__Output:__ `"PAHNAPLSIIGYIR"`

__Example 2:__

__Input:__ `s = "PAYPALISHIRING", numRows = 4`

__Output:__ `"PINALSIGYAHRPI"`

__Explanation:__

```
P     I    N
A   L S  I G
Y A   H R
P     I
```

__Example 3:__

__Input:__ `s = "A", numRows = 1`

__Output:__ `"A"`

<details>

<summary>Task Type</summary>

- __`Array Relation of Indexes or Values or Indexes to Values`__
  <details>

  <summary><i><b><code>Find the relation between the indexes of the array</code></b></i></summary>

    To solve this Task you need to analyze the _relation_ between the indexes of the characters of the string treating the string as an array

    The spoiler below entitled "Pseudo code" has some of the logic of that _relation_ depicted in a form that suggests the idea of the solution

  </details>

</details>

<details>

<summary>Pseudo code</summary>

```
// SPOILER ALERT

/**

// NUMBER OF VERTICAL DIGITS = n - 2 (used below)
// KEY = 6 (n + (n - 2), n = 4)

0     6      12  // 0 + 6, ... OR   6 - 0 + 6 ...
1   5 7   11 13  // 1 + 6, ... AND  6 - 1 + 6 ...
2 4   8 10   14  // 2 + 6, ... AND  6 - 2 + 6 ...
3     9      15  // 3 + 6, ... OR   6 - 3 + 6 ...

0, 6, 12, 1, 5, 7, 11, 13, 2, 3, 8, 10, 14, 3, 9, 15

/**

/**
0      8
1    7 9
2  6   10
3 5    11
4      12
**/
```

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
