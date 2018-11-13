class BinaryTree {
  constructor(key = null, value = null) {
    this.parent = null;
    this.key = key;
    this.value = value;
    this.right = null;
    this.left = null;
  }

  insert(key, value) {
    if(!this.key) {
      this.key = key;
      this.value = value;
    } else if(this.key <= key){
      if(!this.right) {
        this.right = new BinaryTree(key, value);
      } else {
      this.right.insert(key, value);
      }
    } else if(this.key >= key) {
      if(!this.left) {
        this.left = new BinaryTree(key, value);
      } else{
      this.left.insert(key, value);
      }
    }
  }

  retrieve(key) {
    if(!this.key) {
      return null;
    } else if (this.key === key) {
      return this.value;
    } else if (key <= this.key) {
      if(!this.left) {
        return null;
      } else {
        return this.left.retrieve(key);
      }
    } else {
      if(!this.right) {
        return null;
      } else {
        return this.right.retrieve(key);
      }
    }
  }

  find(key) {
    if(!this.key) {
      return null;
    } else if (this.key === key) {
      return this;
    } else if (key <= this.key) {
      if(!this.left) {
        return null;
      } else {
        return this.left.find(key);
      }
    } else {
      if(!this.right) {
        return null;
      } else {
        return this.right.find(key);
      }
    }
  }

  _replaceWith(node) {
    if (this.parent) {
        if (this == this.parent.left) {
            this.parent.left = node;
        }
        else if (this == this.parent.right) {
            this.parent.right = node;
        }

        if (node) {
            node.parent = this.parent;
        }
    }
    else {
        if (node) {
            this.key = node.key;
            this.value = node.value;
            this.left = node.left;
            this.right = node.right;
        }
        else {
            this.key = null;
            this.value = null;
            this.left = null;
            this.right = null;
        }
    }
  }

  _findMin() {
      if (!this.left) {
          return this;
      }
      return this.left._findMin();
  }

  remove(key) {
    if (this.key == key) {
        if (this.left && this.right) {
            const successor = this.right._findMin();
            this.key = successor.key;
            this.value = successor.value;
            successor.remove(successor.key);
        }
        //If the node only has a left child, 
        //then you replace the node with its left child.  
        else if (this.left) {
            this._replaceWith(this.left);
        }
        //And similarly if the node only has a right child 
        //then you replace it with its right child.
        else if (this.right) {
            this._replaceWith(this.right);
        }
        //If the node has no children then
        //simply remove it and any references to it 
        //by calling "this._replaceWith(null)".
        else {
            this._replaceWith(null);
        }
    }
    else if (key < this.key && this.left) {
        this.left.remove(key);
    }
    else if (key > this.key && this.right) {
        this.right.remove(key);
    }
    else {
        throw new Error('Key Error');
    }
  }
}

function height(tree) {
  if(!tree)
    return -1;

  return Math.max(height(tree.left), height(tree.right)) + 1;
}

function height2(tree) {
  height(tree) - 1
}

function main() {
  const tree = new BinaryTree();

  tree.insert(3, 3);
  tree.insert(1, 1);
  tree.insert(4, 4);
  tree.insert(6, 6);
  tree.insert(9, 9);
  tree.insert(2, 2);
  tree.insert(5, 5);
  tree.insert(7, 7);

  tree.remove(2);

  return height(tree);
}

console.log(main());