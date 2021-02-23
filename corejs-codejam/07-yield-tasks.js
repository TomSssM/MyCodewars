'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield        *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Returns the lines sequence of "99 Bottles of Beer" song:
 *
 *  '99 bottles of beer on the wall, 99 bottles of beer.'
 *  'Take one down and pass it around, 98 bottles of beer on the wall.'
 *  '98 bottles of beer on the wall, 98 bottles of beer.'
 *  'Take one down and pass it around, 97 bottles of beer on the wall.'
 *  ...
 *  '1 bottle of beer on the wall, 1 bottle of beer.'
 *  'Take one down and pass it around, no more bottles of beer on the wall.'
 *  'No more bottles of beer on the wall, no more bottles of beer.'
 *  'Go to the store and buy some more, 99 bottles of beer on the wall.'
 *
 * See the full text at
 * http://99-bottles-of-beer.net/lyrics.html
 *
 * @return {Iterable.<string>}
 *
 */
function* get99BottlesOfBeer() {

    function* singAsong(bottCount) {
        while(bottCount > 2) {
            yield `${bottCount} bottles of beer on the wall, ${bottCount--} bottles of beer.`;
            yield `Take one down and pass it around, ${bottCount} bottles of beer on the wall.`;
        }
        yield `2 bottles of beer on the wall, 2 bottles of beer.`;
        yield `Take one down and pass it around, 1 bottle of beer on the wall.`;
        yield `1 bottle of beer on the wall, 1 bottle of beer.`;
        yield 'Take one down and pass it around, no more bottles of beer on the wall.';
        yield 'No more bottles of beer on the wall, no more bottles of beer.';
        yield 'Go to the store and buy some more, 99 bottles of beer on the wall.';
    }

    yield* singAsong(99);
}


/**
 * Returns the Fibonacci sequence:
 *   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...
 *
 * See more at: https://en.wikipedia.org/wiki/Fibonacci_number
 *
 * @return {Iterable.<number>}
 *
 */
function* getFibonacciSequence() {
    let prev = 2;
    let curr;
    let n = 3;

    yield 0;
    yield 1;
    yield 1;
    yield 2;
    yield 3;

    while(true) {
        curr = n + prev;
        yield curr;
        prev = n;
        n = curr;
    }
}


/**
 * Traverses a tree using the depth-first strategy
 * See details: https://en.wikipedia.org/wiki/Depth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in depth-first order
 * @example
 *
 *   var node1 = { n:1 }, node2 = { n:2 }, node3 = { n:3 }, node4 = { n:4 },
 *       node5 = { n:5 }, node6 = { n:6 }, node7 = { n:7 }, node8 = { n:8 };
 *   node1.children = [ node2, node6, node7 ];
 *   node2.children = [ node3, node4 ];
 *   node4.children = [ node5 ];
 *   node7.children = [ node8 ];
 *
 *     source tree (root = 1):
 *            1
 *          / | \
 *         2  6  7
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       3   4     8
 *           |
 *           5
 *
 *  depthTraversalTree(node1) => node1, node2, node3, node4, node5, node6, node7, node8
 *
 */
function* depthTraversalTree(root) {
    let child;
    const stack = [];
    stack.push(root);

    while(stack.length) {
        child = stack.pop();
        if(child.children) stack.push(...child.children.reverse());
        yield child;
    }
}


/**
 * Traverses a tree using the breadth-first strategy
 * See details: https://en.wikipedia.org/wiki/Breadth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in breadth-first order
 * @example
 *     source tree (root = 1):
 *
 *            1
 *          / | \
 *         2  3  4
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       5   6     7
 *           |
 *           8
 *
 */
function* breadthTraversalTree(root) {
    let childs;
    const queue = [];
    queue.push(root.children);

    yield root;
    while(queue.length) {
        childs = queue.shift();
        for(let i = 0; i < childs.length; i++) {
            if(childs[i].children) queue.push(childs[i].children);
            yield childs[i];
        }
    }
}

/**
 * Warning! Now we are going to explore some Binary Search Tree algorithms.
 *
 * Here is a small cheatsheet that helps remember in which order to visit Binary Tree
 * nodes in order to implement different traversal algorithms:
 * 1. in-order: left -> current -> right ( reverse is right -> current -> left )
 * 2. depth-first: current -> left -> right
 * 3. post-order: left -> right -> current
 * 4. breadth-first: N/A
 *
 * Implementing depth-first search iteratively is very simple because all we have to do
 * is push the children of the node we are currently visiting to a stack and then pop them,
 * and because of the nature of how stack works, we will get back all the children in exactly
 * the right order. But the real reason that implementing depth-first search iteratively is
 * easy is because we need to output the value of the node we are currently visiting _before_
 * the values of its children ( see above, current -> left -> right ). As a result, the algorithm
 * can be reduced to simply:
 * 1. yield the value of the current node
 * 2. add children to the stack
 * 3. pop the children
 * 4. repeat
 *
 * But it gets harder when the first value you need to 'yield' is not the value of the current node,
 * but one of its children, like in post-order search for example. In this case, we cannot yield the
 * value of the node we are currently visiting before we add the children to the stack, we have to do
 * it later on and the algorithm becomes:
 * 1. add the value of the current node to the stack without yielding it
 * 2. add children to the stack in a specific order
 * 3. pop everything from the stack, yielding nodes in a specific order
 *
 * As you can see, in order to implement in-order or post-order search, we need to add values to the stack
 * and pop them afterwards in a special way.
 *
 * Note: if you are confused what I mean when I mention all these combinations like 'left -> right -> current',
 * what I mean by that is an order on which we visit the tree nodes. To understand them better, see the recursive
 * traversal methods of the 'BST' class in ./snippets/Data Structures/binary-search-tree.js. Example: 'traversePreOrder'
 * function inside 'preOrder' method.
 */

/**
 * Traverses a binary tree using the in-order strategy
 *
 * Each node has child nodes in 'left' and 'right' properties.
 * The leaf nodes do not have 'left' and 'right' properties.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in breadth-first order
 * @example
 *     source tree (root = 8):
 *
 *            8
 *          /   \
 *         5     11
 *        / \    / \            =>    { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 }
 *       2   7  10  14
 *      / \  /  /  /  \
 *     1   3 6  9 12  15
 *          \       \
 *           4       13
 */
function* inOrderSearch(root, reverse = false) {
    let current = root;
    const stack = [];
    do {
        while (current) {
            stack.push(current);
            current = current[reverse ? 'right' : 'left'];
        }
        current = stack.pop();
        yield current.value;
        current = current[reverse ? 'left' : 'right'];
    } while(stack.length || current);
}

class Node {
    constructor(val) {
        this.value = val;
        this.left = null;
        this.right = null;
    }
}

const root1 = new Node(8);
root1.left = new Node(5);
root1.left.left = new Node(2);
root1.left.right = new Node(7);
root1.left.left.left = new Node(1);
root1.left.left.right = new Node(3);
root1.left.right.left = new Node(6);
root1.left.left.right.right = new Node(4);
root1.right = new Node(11);
root1.right.left = new Node(10);
root1.right.right = new Node(14);
root1.right.left.left = new Node(9);
root1.right.right.left = new Node(12);
root1.right.right.right = new Node(15);
root1.right.right.left.right = new Node(13);

inOrderSearch(root1, true);
inOrderSearch(root1, false);

/**
 * Traverses a binary tree using the post-order strategy
 *
 * Each node has child nodes in 'left' and 'right' properties.
 * The leaf nodes do not have 'left' and 'right' properties.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in breadth-first order
 * @example
 *     source tree (root = 1):
 *
 *            15
 *          /   \
 *         7     14
 *        / \    / \            =>    { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 }
 *       4   6  9   13
 *      / \  /  /  /  \
 *     1   3 5  8 11  12
 *          \       \
 *           2       10
 *
 * postOrderSearch1 - returns an array
 * postOrderSearch2 - does the same using a generator
 */
function postOrderSearch1(root) {
    const stack = [root];
    const result = [];
    while (stack.length) {
        const node = stack.pop();
        result.unshift(node.value);
        node.left && stack.push(node.left);
        node.right && stack.push(node.right);
    }
    return result;
}

const root2 = new Node(15);
root2.left = new Node(7);
root2.right = new Node(14);
root2.left.left = new Node(4);
root2.left.right = new Node(6);
root2.left.left.left = new Node(1);
root2.left.left.right = new Node(3);
root2.left.left.right.right = new Node(2);
root2.left.right.left = new Node(5);
root2.right.left = new Node(9);
root2.right.right = new Node(13);
root2.right.left.left = new Node(8);
root2.right.right.left = new Node(11);
root2.right.right.right = new Node(12);
root2.right.right.left.right = new Node(10);

postOrderSearch1(root2);

function* postOrderSearch2(root) {
    const stack = [];
    let current = root;
    do {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        const topmostNode = stack[stack.length - 1];
        if (topmostNode.right) {
            current = topmostNode.right;
        } else {
            // go up while current node is right child
            let isRightChild = false;
            do {
                if (stack.length === 1) {
                    // we have reached the root
                    yield stack.pop().value;
                    break;
                }
                const topmostNode = stack[stack.length - 1];
                const nextTopmostNode = stack[stack.length - 2];
                isRightChild = nextTopmostNode.right === topmostNode;
                yield stack.pop().value;
            } while(isRightChild);
        }
    } while(stack.length || current);
}
/**
 * Time complexity: O(n)
 * Space complexity: O(m)
 * n - size of the tree
 * m - max height of the tree
 */

postOrderSearch2(root2);

module.exports = {
    get99BottlesOfBeer: get99BottlesOfBeer,
    getFibonacciSequence: getFibonacciSequence,
    depthTraversalTree: depthTraversalTree,
    breadthTraversalTree: breadthTraversalTree,
    inOrderSearch,
    postOrderSearch1,
    postOrderSearch2,
};
