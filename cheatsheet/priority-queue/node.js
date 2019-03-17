class Node {
	constructor(data, priority) {
		this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
	}

	appendChild(node) {
		if(!this.left) {
			this.left = node;
			node.parent = this;
    } else if(!this.right) {
			this.right = node;
			node.parent = this;
    }
	}

	removeChild(node) {
		if(this.left === node) {
      this.left = null;
    } else if(this.right === node) {
      this.right = null;
    } else {
      throw new Error('tar-tar sauce!');
    }
    node.parent = null;
	}

  remove() {
    if(this.parent) {
      this.parent.removeChild(this);
    }
	}

	swapWithParent() {
    if(!this.parent) return;
    const thisCpy = this;
    const leftCpy = this.left;
    const rightCpy = this.right;
    const parentCpy = this.parent;

    if(this.parent.left === this) {
      this.left = this.parent;
      this.right = this.parent.right;
      if(this.right) this.right.parent = thisCpy;
    } else {
      this.right = this.parent;
      this.left = this.parent.left;
      this.left.parent = thisCpy;
    }

    this.parent.left = leftCpy;
    this.parent.right = rightCpy;
    if(this.parent.left) this.parent.left.parent = this.parent;
    if(this.parent.right) this.parent.right.parent = this.parent;
    if(this.parent.parent) {
      if(this.parent.parent.left === parentCpy) {
        this.parent.parent.left = thisCpy;
      } else {
        this.parent.parent.right = thisCpy;
      }
    }
    this.parent = this.parent.parent;
    if(this.left === parentCpy) {
      this.left.parent = thisCpy;
    } else {
      this.right.parent = thisCpy;
    }
	}
}

module.exports = Node;