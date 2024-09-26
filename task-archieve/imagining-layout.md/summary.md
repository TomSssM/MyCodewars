# __`One Pointer One Array`__

## __*`Iterate an array`*__

> [Algorithm Explanation](./explanations/one-pointer-one-array/iterate-an-array.md)

```js
function algorithm(array) {
    for (let i = 0; i < array.length; i++) {
        logic(array[i], i);
    }
}
```

__Input:__ `[1, 2, 3]`

__Output:__ value: `1`, `2`, `3`, index: `0`, `1`, `2`

---

## __*`Iterate an array in reverse`*__

> [Algorithm Explanation](https://google.com)

```js
function algorithm(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        logic(array[i], i);
    }
}
```

__Input:__ `[1, 2, 3]`

__Output:__ value: `3`, `2`, `1`, index: `2`, `1`, `0`
