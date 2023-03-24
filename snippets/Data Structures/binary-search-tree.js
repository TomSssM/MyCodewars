/* Binary Search Tree */

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  add(data) {
    const node = this.root;
    if (node === null) {
      this.root = new Node(data);
      return;
    } else {
      const searchTree = function(node) {
        if (data < node.data) {
          if (node.left === null) {
            node.left = new Node(data);
            return;
          } else if (node.left !== null) {
            return searchTree(node.left);
          }
        } else if (data > node.data) {
          if (node.right === null) {
            node.right = new Node(data);
            return;
          } else if (node.right !== null) {
            return searchTree(node.right);
          }
        } else {
          return null;
        }
      };
      return searchTree(node);
    }
  }

  findMin() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  findMax() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }

  find(data) {
    let current = this.root;
    while (current.data !== data) {
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }

      if (current === null) {
        return null;
      }
    }
    return current;
  }

  isPresent(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) {
        return true;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  remove(data) {
    const removeNode = function(node, data) {
      // if the root was empty
      if (node === null) {
        return null;
      }

      if (data === node.data) {
        // node has no children
        if (node.left === null && node.right === null) {
          return null;
        }
        // node has no left child
        if (node.left === null) {
          return node.right;
        }
        // node has no right child
        if (node.right === null) {
          return node.left;
        }
        // node has two children
        var tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        // do note that we have to return the node that was
        // passed in order not to orphan, say, the root node
        // via implicitly returning undefined
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    }
    this.root = removeNode(this.root, data);
  }

  isBalanced() {
    return (this.findMinHeight() >= this.findMaxHeight() - 1)
  }

  findMinHeight(node = this.root) {
      if (node === null) {
          return -1;
      }
      let left = this.findMinHeight(node.left);
      let right = this.findMinHeight(node.right);

      // here we are going to do +1 to the lesser value so that
      // if at least one returns -1 we don't count it as a step
      if (left < right) {
          return left + 1;
      } else {
          return right + 1;
      };
      // or
      // return Math.min(left, right) + 1;
  }

  findMaxHeight(node = this.root) {
      if (node === null) {
          return -1;
      }
      let left = this.findMaxHeight(node.left);
      let right = this.findMaxHeight(node.right);

      // this here we are going to do +1 to the greater value so that
      // so long as there is at least one child we count it as a step
      if (left > right) {
          return left + 1;
      } else {
          return right + 1;
      };
      // or
      // return Math.max(left, right) + 1;
  }

  inOrder() {
    if (this.root === null) {
      return null;
    } else {
      const result = [];
      function traverseInOrder(node) {
        node.left && traverseInOrder(node.left);
        result.push(node.data);
        node.right && traverseInOrder(node.right);
      }
      traverseInOrder(this.root);
      return result;
    };
  }

  preOrder() {
    if (this.root === null) {
      return null;
    } else {
      const result = [];
      function traversePreOrder(node) {
        result.push(node.data);
        node.left && traversePreOrder(node.left);
        node.right && traversePreOrder(node.right);
      };
      traversePreOrder(this.root);
      return result;
    };
  }

  postOrder() {
    if (this.root === null) {
      return null;
    } else {
      const result = [];
      function traversePostOrder(node) {
        node.left && traversePostOrder(node.left);
        node.right && traversePostOrder(node.right);
        result.push(node.data);
      };
      traversePostOrder(this.root);
      return result;
    }
  }

  // there could also probably be a traversal
  // method to output the values in a reverse order
  // the pseudocode would be: push right, push value, push left

  levelOrder() {
      let result = [];
      let Q = [];
      if (this.root != null) {
          Q.push(this.root);
          while(Q.length > 0) {
              let node = Q.shift();
              result.push(node.data);
              if (node.left != null) {
                  Q.push(node.left);
              };
              if (node.right != null) {
                  Q.push(node.right);
              };
          };
          return result;
      } else {
          return null;
      };
  };

  reverseLevelOrder() {

    // it logs left-to-right (exactly that) all the values first
    // of max height, then of height above that and so on
    if(this.root === null) return null;

    const q = [this.root];
    const res = [];
    while(q.length) {
        const node = q.shift();
        res.push(node.data);

        // do note that we push the right node first
        // so that when we reverse res, the values of
        // each height follow left-to-right as opposed
        // to right-to-left if we were to apply the
        // usual levelOrder function and simply reverse
        // the array it returns
        node.right && q.push(node.right);
        node.left && q.push(node.left);
    }

    return res.reverse();
  }

  invert() {
    // this function turns Tree A into a such Tree B
    // that the inOrder traversal for Tree B is going
    // to return the same array as for Tree A except with
    // numbers in the reversed order
    // this way if the inorder traversal for Tree A is [10, 12, 22, 34], the
    // inOrder Traversal for Tree B is going to be [34, 22, 12, 10]

    if(!this.root) return null;

    const swap = function(node) {
      // all we gotta do is swap the left and right
      // pointers for every node

      if(!node.right && !node.left) return node;
      if(!node.right) {
        node.right = node.left;
        node.left = null;
        node.right = swap(node.right);
      } else if(!node.left) {
        node.left = node.right;
        node.right = null;
        node.left = swap(node.left);
      } else {
        let left = node.left;
        node.left = node.right;
        node.right = left;
        node.left = swap(node.left);
        node.right = swap(node.right);
      }
      return node;
    };

    this.root = swap(this.root);
  }
}

const bst = new BST();

bst.add(9);
bst.add(4);
bst.add(17);
bst.add(3);
bst.add(6);
bst.add(22);
bst.add(5);
bst.add(7);
bst.add(20);

console.log(bst.findMin()); // => 3
bst.remove(3);
console.log(bst.find(7)); // => Node(7)
console.log(bst.findMin()); // => 4
console.log(bst.findMax()); // => 22

bst.add(3);
console.log(bst.isPresent(3)); // true
console.log(bst.findMinHeight()); // => 1
console.log(bst.findMaxHeight()); // => 3
console.log(bst.isBalanced()); // false

bst.add(10);
console.log(bst.findMinHeight()); // => 2
console.log(bst.findMaxHeight()); // => 3
console.log(bst.isBalanced()); // => true

console.log('inOrder: ' + bst.inOrder()); // 3,4,5,6,7,9,10,17,20,22
console.log('preOrder: ' + bst.preOrder()); // 9,4,3,6,5,7,17,10,22,20
console.log('postOrder: ' + bst.postOrder()); // 3,5,7,6,4,10,20,22,17,9

console.log('levelOrder: ' + bst.levelOrder()); // 9,4,17,3,6,10,22,5,7,20
console.log('levelOrder from bottom: ' + bst.reverseLevelOrder()); // 5,7,20,3,6,10,22,4,17,9

bst.invert(); // invert
console.log('inOrder for Inverted: ' + bst.inOrder()); // 22,20,17,10,9,7,6,5,4,3

/**
 * Note: there are also:
 * 1. pre-order ( depth-first )
 * 2. post-order
 * 3. level-order ( breadth-first )
 * 4. in-order ( default & reversed )
 * traversal methods implemented iteratively as generators in ./corejs-codejam/task/07-yield-tasks.js
 * */