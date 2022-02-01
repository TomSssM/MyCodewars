# Construct Binary Tree from Preorder and Inorder Traversal

Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return _the binary tree_.

__Example 1:__

![tree](../../tree.jpg)

```
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
```

__Example 2:__

```
Input: preorder = [-1], inorder = [-1]
Output: [-1]
```

<details>

<summary>A bit of my explanation</summary>

Remember how we can represent a [Heap](../../../../snippets/Data%20Structures/min-heap.js) using array? We can therefore represent
binary tree in the same way: `[parent, left, right, ...children of left, ...children of right, ...ad so on, recursively]`.

Thus your task is to create this same representation as in a Heap except for binary tree and using 2 arrays where in the 1st array
you have all nodes ordered via preorder traversal and in the 2nd array - via inorder traversal. You need to use information from both
arrays in order to construct this 3rd array representation of binrary tree where left child is `i * 2`, right child is `i * 2 + 1`
and parent is `floor(i / 2)`. Note that neither `preorder` not `inorder` give such functionality.

</details>
