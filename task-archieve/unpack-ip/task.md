# Unpack IP

Given a special IP _mask_ (unrelated to the real life IP masking) write a function that unpacks the mask into the IP addresses it covers. The mask has two special patterns:
- `N-M` corresponds to a range of octets from `N` to `M` (where `N` or `M` is any number)
- `N,M` corresponds to a sequence of octets `N` and `M` (where `N` or `M` is any number)

__Example 1:__

```
Input: '1.2.3.4'
Output: ['1.2.3.4']
```

__Example 2:__

```
Input: '1.2.3.4-6'
Output: ['1.2.3.4', '1.2.3.5', '1.2.3.6']
```

__Example 3:__

```
Input: '1.2.3,6.4'
Output: ['1.2.3.4', '1.2.6.4']
```

__Example 4:__

```
Input: '1.2.3.1-3,7'
Output: ['1.2.3.1', '1.2.3.2', '1.2.3.3', '1.2.3.7']
```

<details>

<summary>Task Type</summary>

- __`Stack or Queue`__
  <details>

  <summary><i><b><code>Merge two Queues of prefixes</code></b></i></summary>

    Basically we use one Queue as a Queue of prefixes and each of the prefixes we combine with an array of other values and put into a new Queue. Then the old Queue is disregarded and the new Queue is used as a Queue of prefixes again in the next iteration

    In our task each octet or a series of octets is a prefix. If we encounter a simple octet we append it to the previous octets in the Queue. If we encounter either of the patterns then we append an octet to the previous octets in the Queue several times for each octet of the pattern

    __Note:__ the task also has a recursive solution ([solution 2](./solution-2.js)), which is merely a Variation of the Approach used here, but as we have seen in the past using a Queue is more efficient than recursion because with a Queue you don't risk getting a stack overflow error

    __Note:__ the mechanics of the Approach used here are very much similar to the Approach _`Get all unique combinations of values of many arrays in any order`_ we have seen in [this task](../letter-combinations-of-a-phone-number/task.md)

  </details>

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) | [:white_check_mark: solution 2](./solution-2.js) |
| :---: | :---: | :---: |
