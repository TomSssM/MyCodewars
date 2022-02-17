/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    function findRoot(index) {
        const leftIndex = index + 1;
        const rightIndex = index + 2;

        const value = preorder[index];
        const indexInOrder = inorder.indexOf(value);

        const leftValue = preorder[leftIndex];
        const rightValue = preorder[rightIndex];
        const leftRight = [leftValue, rightValue];

        const leftIndexInOrder = inorder.indexOf(leftValue);
        const rightIndexInOrder = inorder.indexOf(rightValue);

        let leftChildren = [null, null];
        let rightChildren = [null, null];

        if (leftIndex >= preorder.length - 2) {
            leftChildren = []; // last left child node
        } else if (indexInOrder - leftIndexInOrder - 1 !== 0) {
            leftChildren = findRoot(leftIndex);
        }

        if (rightIndex >= preorder.length - 1) {
            rightChildren = []; // last right child node
        } else if (rightIndexInOrder - indexInOrder - 1 !== 0) {
            rightChildren = findRoot(rightIndex);
        }

        if (leftIndex > preorder.length - 2) {
            leftRight.shift(); // left node doesn't exist
        }

        if (rightIndex > preorder.length - 1) {
            leftRight.shift(); // right node doesn't exist
        }

        return [...leftRight, ...leftChildren, ...rightChildren];
    }

    return [preorder[0], ...findRoot(0)];
};

const tree1 = buildTree(
    [3,9,20,15,7],
    [9,3,15,20,7],
);

console.log('tree1');
console.log(tree1); // [3,9,20,null,null,15,7]

const tree2 = buildTree(
    [-1],
    [-1],
);

console.log('tree2');
console.log(tree2); // [-1]
