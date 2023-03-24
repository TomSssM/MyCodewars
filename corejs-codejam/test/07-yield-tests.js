'use strict';

var assert = require('assert');
var tasks = require('../task/07-yield-tasks');
it.optional = require('../extensions/it-optional');

describe('07-yield-tasks', function() {

    it.optional('get99BottlesOfBeer should return the sequence of song lyric lines', () => {

        var expected = [
            '99 bottles of beer on the wall, 99 bottles of beer.',
            'Take one down and pass it around, 98 bottles of beer on the wall.',
            '98 bottles of beer on the wall, 98 bottles of beer.',
            'Take one down and pass it around, 97 bottles of beer on the wall.',
            '97 bottles of beer on the wall, 97 bottles of beer.',
            'Take one down and pass it around, 96 bottles of beer on the wall.',
            '96 bottles of beer on the wall, 96 bottles of beer.',
            'Take one down and pass it around, 95 bottles of beer on the wall.',
            '95 bottles of beer on the wall, 95 bottles of beer.',
            'Take one down and pass it around, 94 bottles of beer on the wall.',
            '94 bottles of beer on the wall, 94 bottles of beer.',
            'Take one down and pass it around, 93 bottles of beer on the wall.',
            '93 bottles of beer on the wall, 93 bottles of beer.',
            'Take one down and pass it around, 92 bottles of beer on the wall.',
            '92 bottles of beer on the wall, 92 bottles of beer.',
            'Take one down and pass it around, 91 bottles of beer on the wall.',
            '91 bottles of beer on the wall, 91 bottles of beer.',
            'Take one down and pass it around, 90 bottles of beer on the wall.',
            '90 bottles of beer on the wall, 90 bottles of beer.',
            'Take one down and pass it around, 89 bottles of beer on the wall.',
            '89 bottles of beer on the wall, 89 bottles of beer.',
            'Take one down and pass it around, 88 bottles of beer on the wall.',
            '88 bottles of beer on the wall, 88 bottles of beer.',
            'Take one down and pass it around, 87 bottles of beer on the wall.',
            '87 bottles of beer on the wall, 87 bottles of beer.',
            'Take one down and pass it around, 86 bottles of beer on the wall.',
            '86 bottles of beer on the wall, 86 bottles of beer.',
            'Take one down and pass it around, 85 bottles of beer on the wall.',
            '85 bottles of beer on the wall, 85 bottles of beer.',
            'Take one down and pass it around, 84 bottles of beer on the wall.',
            '84 bottles of beer on the wall, 84 bottles of beer.',
            'Take one down and pass it around, 83 bottles of beer on the wall.',
            '83 bottles of beer on the wall, 83 bottles of beer.',
            'Take one down and pass it around, 82 bottles of beer on the wall.',
            '82 bottles of beer on the wall, 82 bottles of beer.',
            'Take one down and pass it around, 81 bottles of beer on the wall.',
            '81 bottles of beer on the wall, 81 bottles of beer.',
            'Take one down and pass it around, 80 bottles of beer on the wall.',
            '80 bottles of beer on the wall, 80 bottles of beer.',
            'Take one down and pass it around, 79 bottles of beer on the wall.',
            '79 bottles of beer on the wall, 79 bottles of beer.',
            'Take one down and pass it around, 78 bottles of beer on the wall.',
            '78 bottles of beer on the wall, 78 bottles of beer.',
            'Take one down and pass it around, 77 bottles of beer on the wall.',
            '77 bottles of beer on the wall, 77 bottles of beer.',
            'Take one down and pass it around, 76 bottles of beer on the wall.',
            '76 bottles of beer on the wall, 76 bottles of beer.',
            'Take one down and pass it around, 75 bottles of beer on the wall.',
            '75 bottles of beer on the wall, 75 bottles of beer.',
            'Take one down and pass it around, 74 bottles of beer on the wall.',
            '74 bottles of beer on the wall, 74 bottles of beer.',
            'Take one down and pass it around, 73 bottles of beer on the wall.',
            '73 bottles of beer on the wall, 73 bottles of beer.',
            'Take one down and pass it around, 72 bottles of beer on the wall.',
            '72 bottles of beer on the wall, 72 bottles of beer.',
            'Take one down and pass it around, 71 bottles of beer on the wall.',
            '71 bottles of beer on the wall, 71 bottles of beer.',
            'Take one down and pass it around, 70 bottles of beer on the wall.',
            '70 bottles of beer on the wall, 70 bottles of beer.',
            'Take one down and pass it around, 69 bottles of beer on the wall.',
            '69 bottles of beer on the wall, 69 bottles of beer.',
            'Take one down and pass it around, 68 bottles of beer on the wall.',
            '68 bottles of beer on the wall, 68 bottles of beer.',
            'Take one down and pass it around, 67 bottles of beer on the wall.',
            '67 bottles of beer on the wall, 67 bottles of beer.',
            'Take one down and pass it around, 66 bottles of beer on the wall.',
            '66 bottles of beer on the wall, 66 bottles of beer.',
            'Take one down and pass it around, 65 bottles of beer on the wall.',
            '65 bottles of beer on the wall, 65 bottles of beer.',
            'Take one down and pass it around, 64 bottles of beer on the wall.',
            '64 bottles of beer on the wall, 64 bottles of beer.',
            'Take one down and pass it around, 63 bottles of beer on the wall.',
            '63 bottles of beer on the wall, 63 bottles of beer.',
            'Take one down and pass it around, 62 bottles of beer on the wall.',
            '62 bottles of beer on the wall, 62 bottles of beer.',
            'Take one down and pass it around, 61 bottles of beer on the wall.',
            '61 bottles of beer on the wall, 61 bottles of beer.',
            'Take one down and pass it around, 60 bottles of beer on the wall.',
            '60 bottles of beer on the wall, 60 bottles of beer.',
            'Take one down and pass it around, 59 bottles of beer on the wall.',
            '59 bottles of beer on the wall, 59 bottles of beer.',
            'Take one down and pass it around, 58 bottles of beer on the wall.',
            '58 bottles of beer on the wall, 58 bottles of beer.',
            'Take one down and pass it around, 57 bottles of beer on the wall.',
            '57 bottles of beer on the wall, 57 bottles of beer.',
            'Take one down and pass it around, 56 bottles of beer on the wall.',
            '56 bottles of beer on the wall, 56 bottles of beer.',
            'Take one down and pass it around, 55 bottles of beer on the wall.',
            '55 bottles of beer on the wall, 55 bottles of beer.',
            'Take one down and pass it around, 54 bottles of beer on the wall.',
            '54 bottles of beer on the wall, 54 bottles of beer.',
            'Take one down and pass it around, 53 bottles of beer on the wall.',
            '53 bottles of beer on the wall, 53 bottles of beer.',
            'Take one down and pass it around, 52 bottles of beer on the wall.',
            '52 bottles of beer on the wall, 52 bottles of beer.',
            'Take one down and pass it around, 51 bottles of beer on the wall.',
            '51 bottles of beer on the wall, 51 bottles of beer.',
            'Take one down and pass it around, 50 bottles of beer on the wall.',
            '50 bottles of beer on the wall, 50 bottles of beer.',
            'Take one down and pass it around, 49 bottles of beer on the wall.',
            '49 bottles of beer on the wall, 49 bottles of beer.',
            'Take one down and pass it around, 48 bottles of beer on the wall.',
            '48 bottles of beer on the wall, 48 bottles of beer.',
            'Take one down and pass it around, 47 bottles of beer on the wall.',
            '47 bottles of beer on the wall, 47 bottles of beer.',
            'Take one down and pass it around, 46 bottles of beer on the wall.',
            '46 bottles of beer on the wall, 46 bottles of beer.',
            'Take one down and pass it around, 45 bottles of beer on the wall.',
            '45 bottles of beer on the wall, 45 bottles of beer.',
            'Take one down and pass it around, 44 bottles of beer on the wall.',
            '44 bottles of beer on the wall, 44 bottles of beer.',
            'Take one down and pass it around, 43 bottles of beer on the wall.',
            '43 bottles of beer on the wall, 43 bottles of beer.',
            'Take one down and pass it around, 42 bottles of beer on the wall.',
            '42 bottles of beer on the wall, 42 bottles of beer.',
            'Take one down and pass it around, 41 bottles of beer on the wall.',
            '41 bottles of beer on the wall, 41 bottles of beer.',
            'Take one down and pass it around, 40 bottles of beer on the wall.',
            '40 bottles of beer on the wall, 40 bottles of beer.',
            'Take one down and pass it around, 39 bottles of beer on the wall.',
            '39 bottles of beer on the wall, 39 bottles of beer.',
            'Take one down and pass it around, 38 bottles of beer on the wall.',
            '38 bottles of beer on the wall, 38 bottles of beer.',
            'Take one down and pass it around, 37 bottles of beer on the wall.',
            '37 bottles of beer on the wall, 37 bottles of beer.',
            'Take one down and pass it around, 36 bottles of beer on the wall.',
            '36 bottles of beer on the wall, 36 bottles of beer.',
            'Take one down and pass it around, 35 bottles of beer on the wall.',
            '35 bottles of beer on the wall, 35 bottles of beer.',
            'Take one down and pass it around, 34 bottles of beer on the wall.',
            '34 bottles of beer on the wall, 34 bottles of beer.',
            'Take one down and pass it around, 33 bottles of beer on the wall.',
            '33 bottles of beer on the wall, 33 bottles of beer.',
            'Take one down and pass it around, 32 bottles of beer on the wall.',
            '32 bottles of beer on the wall, 32 bottles of beer.',
            'Take one down and pass it around, 31 bottles of beer on the wall.',
            '31 bottles of beer on the wall, 31 bottles of beer.',
            'Take one down and pass it around, 30 bottles of beer on the wall.',
            '30 bottles of beer on the wall, 30 bottles of beer.',
            'Take one down and pass it around, 29 bottles of beer on the wall.',
            '29 bottles of beer on the wall, 29 bottles of beer.',
            'Take one down and pass it around, 28 bottles of beer on the wall.',
            '28 bottles of beer on the wall, 28 bottles of beer.',
            'Take one down and pass it around, 27 bottles of beer on the wall.',
            '27 bottles of beer on the wall, 27 bottles of beer.',
            'Take one down and pass it around, 26 bottles of beer on the wall.',
            '26 bottles of beer on the wall, 26 bottles of beer.',
            'Take one down and pass it around, 25 bottles of beer on the wall.',
            '25 bottles of beer on the wall, 25 bottles of beer.',
            'Take one down and pass it around, 24 bottles of beer on the wall.',
            '24 bottles of beer on the wall, 24 bottles of beer.',
            'Take one down and pass it around, 23 bottles of beer on the wall.',
            '23 bottles of beer on the wall, 23 bottles of beer.',
            'Take one down and pass it around, 22 bottles of beer on the wall.',
            '22 bottles of beer on the wall, 22 bottles of beer.',
            'Take one down and pass it around, 21 bottles of beer on the wall.',
            '21 bottles of beer on the wall, 21 bottles of beer.',
            'Take one down and pass it around, 20 bottles of beer on the wall.',
            '20 bottles of beer on the wall, 20 bottles of beer.',
            'Take one down and pass it around, 19 bottles of beer on the wall.',
            '19 bottles of beer on the wall, 19 bottles of beer.',
            'Take one down and pass it around, 18 bottles of beer on the wall.',
            '18 bottles of beer on the wall, 18 bottles of beer.',
            'Take one down and pass it around, 17 bottles of beer on the wall.',
            '17 bottles of beer on the wall, 17 bottles of beer.',
            'Take one down and pass it around, 16 bottles of beer on the wall.',
            '16 bottles of beer on the wall, 16 bottles of beer.',
            'Take one down and pass it around, 15 bottles of beer on the wall.',
            '15 bottles of beer on the wall, 15 bottles of beer.',
            'Take one down and pass it around, 14 bottles of beer on the wall.',
            '14 bottles of beer on the wall, 14 bottles of beer.',
            'Take one down and pass it around, 13 bottles of beer on the wall.',
            '13 bottles of beer on the wall, 13 bottles of beer.',
            'Take one down and pass it around, 12 bottles of beer on the wall.',
            '12 bottles of beer on the wall, 12 bottles of beer.',
            'Take one down and pass it around, 11 bottles of beer on the wall.',
            '11 bottles of beer on the wall, 11 bottles of beer.',
            'Take one down and pass it around, 10 bottles of beer on the wall.',
            '10 bottles of beer on the wall, 10 bottles of beer.',
            'Take one down and pass it around, 9 bottles of beer on the wall.',
            '9 bottles of beer on the wall, 9 bottles of beer.',
            'Take one down and pass it around, 8 bottles of beer on the wall.',
            '8 bottles of beer on the wall, 8 bottles of beer.',
            'Take one down and pass it around, 7 bottles of beer on the wall.',
            '7 bottles of beer on the wall, 7 bottles of beer.',
            'Take one down and pass it around, 6 bottles of beer on the wall.',
            '6 bottles of beer on the wall, 6 bottles of beer.',
            'Take one down and pass it around, 5 bottles of beer on the wall.',
            '5 bottles of beer on the wall, 5 bottles of beer.',
            'Take one down and pass it around, 4 bottles of beer on the wall.',
            '4 bottles of beer on the wall, 4 bottles of beer.',
            'Take one down and pass it around, 3 bottles of beer on the wall.',
            '3 bottles of beer on the wall, 3 bottles of beer.',
            'Take one down and pass it around, 2 bottles of beer on the wall.',
            '2 bottles of beer on the wall, 2 bottles of beer.',
            'Take one down and pass it around, 1 bottle of beer on the wall.',
            '1 bottle of beer on the wall, 1 bottle of beer.',
            'Take one down and pass it around, no more bottles of beer on the wall.',
            'No more bottles of beer on the wall, no more bottles of beer.',
            'Go to the store and buy some more, 99 bottles of beer on the wall.'
        ];

        var lineNo = 0;
        for(let line of tasks.get99BottlesOfBeer()) {
            assert.equal(
                line,
                expected[lineNo++],
                `Text mismatch at line no ${lineNo}: `
            );
        }

        assert.equal(
            expected.length,
            lineNo,
            'Lines count is incorrect:'
        );
    });


    it.optional('getFibonacciSequence should return the Fibonacci sequence', () => {

        var expected = [
            0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181,
            6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269,
            2178309, 3524578, 5702887, 9227465, 14930352, 24157817, 39088169
        ];

        var index = 0;
        for(let num of tasks.getFibonacciSequence()) {
            assert.equal(
                num,
                expected[index++],
                `Sequence mismatch at index no ${index}: `
            );
            if (index>=expected.length) break;
        }
        if (index<expected.length) assert.fail(index, expected.length,`sequence length should be equal to ${expected.length}`);

    });


    it.optional('depthTraversalTree should return the sequence of tree nodes in depth-first order', () => {

      /*
       *     source tree (root = 1):
       *
       *            1
       *          / | \
       *         2  6  7
       *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
       *       3   4     8
       *           |
       *           5
       */

        var node1 = { n:1 }, node2 = { n:2 }, node3 = { n:3 }, node4 = { n:4 }, node5 = { n:5 }, node6 = { n:6 }, node7 = { n:7 }, node8 = { n:8 };
        node1.children = [ node2, node6, node7 ];
        node2.children = [ node3, node4 ];
        node4.children = [ node5 ];
        node7.children = [ node8 ];
        var expected = [ node1, node2, node3, node4, node5, node6, node7, node8 ];
        var index = 0;
        for(let num of tasks.depthTraversalTree(node1)) {
            if (index>=expected.length) assert.fail(index, expected.length,`sequence length should be equal to ${expected.length}`);
            assert.equal(
                num.n,
                expected[index++].n,
                `Sequence mismatch at index no ${index}: `
            );
        }
        if (index<expected.length) assert.fail(index, expected.length,`sequence length should be equal to ${expected.length}`);
    });

    const MAX_NODE_COUNT = 100000;

    function createDeepTree() {
        var root = { n: MAX_NODE_COUNT };
        for(var i=MAX_NODE_COUNT-1; i>0; i--) {
            root = { n : i, children : [ root ] };
        }
        return root;
    }

    function createWideTree() {
        var root = { n: 1, children: [] };
        for(var i=2; i<=MAX_NODE_COUNT; i++) {
            root.children.push({ n: i });
        }
        return root;
    }

    it.optional('depthTraversalTree should process a deep tree', () => {
        var root = createDeepTree();
        var index = 1;
        for(let node of tasks.depthTraversalTree(root)) {
            if (index > MAX_NODE_COUNT) assert.fail(index, MAX_NODE_COUNT,`sequence length should be equal to ${MAX_NODE_COUNT}`);
            assert.equal(
                node.n,
                index,
                `Sequence mismatch at index no ${index}: `
            );
            index++;
        }
        if (index-1<MAX_NODE_COUNT) assert.fail(index-1, MAX_NODE_COUNT,`sequence length should be equal to ${MAX_NODE_COUNT}`);
    });

    it.optional('depthTraversalTree should process a wide tree', () => {
        var root = createWideTree();
        var index = 1;
        for(let node of tasks.depthTraversalTree(root)) {
            if (index > MAX_NODE_COUNT) assert.fail(index, MAX_NODE_COUNT,`sequence length should be equal to ${MAX_NODE_COUNT}`);
            assert.equal(
                node.n,
                index,
                `Sequence mismatch at index no ${index}: `
            );
            index++;
        }
        if (index-1<MAX_NODE_COUNT) assert.fail(index-1, MAX_NODE_COUNT,`sequence length should be equal to ${MAX_NODE_COUNT}`);
    });


    it.optional('breadthTraversalTree should return the sequence of tree nodes in depth-first order', () => {

      /*
       *     source tree (root = 1):
       *
       *            1
       *          / | \
       *         2  3  4
       *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
       *       5   6     7
       *           |
       *           8
       */

        var node1 = { n:1 }, node2 = { n:2 }, node3 = { n:3 }, node4 = { n:4 }, node5 = { n:5 }, node6 = { n:6 }, node7 = { n:7 }, node8 = { n:8 };
        node1.children = [ node2, node3, node4 ];
        node2.children = [ node5, node6 ];
        node4.children = [ node7 ];
        node6.children = [ node8 ];
        var expected = [ node1, node2, node3, node4, node5, node6, node7, node8 ];
        var index = 0;
        for(let num of tasks.breadthTraversalTree(node1)) {
            if (index>=expected.length) assert.fail(null,null,`sequence length should be equal to ${expected.length}`);
            assert.equal(
                num.n,
                expected[index++].n,
                `Sequence mismatch at index no ${index}: `
            );
        }
        if (index<expected.length) assert.fail(index, expected.length,`sequence length should be equal to ${expected.length}`);
    });


    it.optional('breadthTraversalTree should process a deep tree', () => {
        var root = createDeepTree();
        var index = 1;
        for(let node of tasks.breadthTraversalTree(root)) {
            if (index > MAX_NODE_COUNT) assert.fail(index, MAX_NODE_COUNT,`sequence length should be equal to ${MAX_NODE_COUNT}`);
            assert.equal(
                node.n,
                index,
                `Sequence mismatch at index no ${index}: `
            );
            index++;
        }
        if (index-1<MAX_NODE_COUNT) assert.fail(index-1, MAX_NODE_COUNT,`sequence length should be equal to ${MAX_NODE_COUNT}`);
    });

    it.optional('breadthTraversalTree should process a wide tree', () => {
        var root = createWideTree();
        var index = 1;
        for(let node of tasks.breadthTraversalTree(root)) {
            if (index > MAX_NODE_COUNT) assert.fail(index, MAX_NODE_COUNT,`sequence length should be equal to ${MAX_NODE_COUNT}`);
            assert.equal(
                node.n,
                index,
                `Sequence mismatch at index no ${index}: `
            );
            index++;
        }
        if (index-1<MAX_NODE_COUNT) assert.fail(index-1, MAX_NODE_COUNT,`sequence length should be equal to ${MAX_NODE_COUNT}`);
    });

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

    it.optional('mergeSortedSequences should merge two sorted sequences into one sorted sequence', () => {
        const ITEMS_COUNT = 500;

        var odds = function* () {
               for(var i=1; true; i+=2) yield i;
            };
        var evens = function* () {
               for(var i=2; true; i+=2) yield i;
            };
        var expected = 1;
        var count = 0;
        for(let value of tasks.mergeSortedSequences(odds, evens)) {
            assert.equal(
                value,
                expected++
            );
            count++;
            if (count==ITEMS_COUNT) break;
        }
        assert.equal(count, ITEMS_COUNT);

        var zero = function* () { yield 0; }
        expected = 0;
        count = 0;
        for(let value of tasks.mergeSortedSequences(zero, evens)) {
            assert.equal(
                value,
                expected
            );
            expected +=2;
            count++;
            if (count == ITEMS_COUNT) break;
        }
        assert.equal(count, ITEMS_COUNT);


        var minus1 = function* () { yield -1; }
        expected = -1;
        count = 0;
        for(let value of tasks.mergeSortedSequences(odds, minus1)) {
            assert.equal(
                value,
                expected
            );
            expected +=2;
            count++;
            if (count == ITEMS_COUNT) break;
        }
        assert.equal(count, ITEMS_COUNT);

    });
});
