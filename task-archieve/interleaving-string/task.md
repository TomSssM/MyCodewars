# Interleaving String

Given strings `s1`, `s2`, and `s3`, find whether `s3` can be formed by __interleaving__ `s1` and `s2`

__Example 1:__

<img src=./interleave.jpg width=300 />

```
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
Explanation: One way to obtain s3 is:
  Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a"
  Interleaving the two splits we get "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac"
  Since s3 can be obtained by interleaving s1 and s2 we return true
```

__Example 2:__

```
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false
Explanation: It is impossible to interleave s2 with s1 in order to obtain s3
```

__Example 3:__

```
Input: s1 = "", s2 = "", s3 = ""
Output: true
```

<details>

<summary>Task Type</summary>

- __`TODO: Task Type`__
  <details>

  <summary><i><b><code>TODO: Approach</code></b></i></summary>

    <!-- TODO: write the Approach using One Pointer One Array and recursion -->

    <!-- TODO: write Tabulation: use 2D array to hold value of whether it interleaves or not then iterate this 2D array decreasing the area to look at to match the index of the letter and see if in this area in at lease one cell the letters have overlapped -->

    TODO: explanation of Approach

    TODO: optional: example of Approach

    TODO: optional: how to apply the Approach to the Task

  </details>

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) | [:white_check_mark: solution 2](./solution-2.js) |
| :---: | :---: | :---: |
