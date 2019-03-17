const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this._size = 0;
	}

	push(data, priority) {
		this._size++;
		const node = new Node(data, priority);
    this.insertNode(node);
    this.shiftNodeUp(node);
	}

	pop() {
		this._size--;
		if(!this.root) return;
    const root = this.detachRoot();
    this.restoreRootFromLastInsertedNode(root);
    this.shiftNodeDown(this.root);
    return root.data;
	}

  detachRoot() {
    const root = this.root;
    this.root = null;
    for(let i = 0; i < this.parentNodes.length; i++) {
      if(this.parentNodes[i] === root) {
        this.parentNodes.splice(i, 1);
        break;
      }
    }
    return root;
	}

	restoreRootFromLastInsertedNode(detached) {
    const deepestNode = this.parentNodes[this.parentNodes.length - 1];
    if(!deepestNode || !deepestNode.parent) return;
    this.parentNodes.forEach((n, i) => {
      if(n === detached) parentNodes[i] = deepestNode;
    });
    this.parentNodes.pop();
    if(deepestNode.parent !== detached && deepestNode.parent.right === deepestNode) {
      this.parentNodes.unshift(deepestNode.parent);
    }
    deepestNode.remove();
    this.root = deepestNode;
    this.root.left = detached.left;
    this.root.right = detached.right;
    if(this.root.left) this.root.left.parent = this.root;
    if(this.root.right) this.root.right.parent = this.root;
    if(!this.root.right) this.parentNodes.unshift(this.root);
	}

	size() {
		return this._size;
	}

	isEmpty() {
		return this._size === 0;
	}

	clear() {
		this.root = null;
    this.parentNodes = [];
    this._size = 0;
	}

  insertNode(node) {
    if(!this.root) {
      this.root = node;
    } else {
      this.parentNodes[0].appendChild(node);
    }
    this.parentNodes.push(node);
    if(this.parentNodes[0].left && this.parentNodes[0].right) this.parentNodes.shift();
	}

	shiftNodeUp(node) {
		if(node.parent && node.parent.priority < node.priority) {
      let currInd = null;
      let parentInd = null;
      this.parentNodes.forEach((n, i) => {
        if(n === node) currInd = i;
        if(n === node.parent) parentInd = i;
      });
      if(currInd !== null && parentInd !== null) {
        [this.parentNodes[currInd], this.parentNodes[parentInd]] 
          = [this.parentNodes[parentInd], this.parentNodes[currInd]];
      }
      if(currInd !== null && parentInd === null) {
        this.parentNodes[currInd] = node.parent;
      }

      node.swapWithParent();
      if(!node.parent) this.root = node;
      this.shiftNodeUp(node);
    }
	}

	shiftNodeDown(node) {
		if(!node) return;
    let chld;
    if(node.right === null && node.left === null) {
      return;
    } else if(node.left === null) {
      if(node.right.priority > node.priority) {
        chld = node.right;
      } else return;
    } else if(node.right === null) {
      if(node.left.priority > node.priority) {
        chld = node.left;
      } else return;
    } else {
      if(node.right.priority > node.priority || node.left.priority > node.priority) {
        if(node.right.priority > node.left.priority) {
          chld = node.right;
        } else chld = node.left;
      } else return;
    }

    let chldInd = null;
    let currInd = null;

    this.parentNodes.forEach((n, i) => {
      if(n === node) currInd = i;
      if(n === chld) chldInd = i;
    });

    if(chldInd !== null && currInd !== null) {
      [this.parentNodes[currInd], this.parentNodes[chldInd]]
        = [this.parentNodes[chldInd], this.parentNodes[currInd]];
    }
    if(chldInd !== null && currInd === null) {
      this.parentNodes[chldInd] = node;
    }
    
    if(!node.parent) this.root = chld;
    chld.swapWithParent();

    this.shiftNodeDown(node);	
	}
}

module.exports = MaxHeap;