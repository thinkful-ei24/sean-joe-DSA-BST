class BinaryTree {
  constructor(key = null, value = null, parent = null) {
    this.parent = parent;
    this.key = key;
    this.value = value;
    this.right = null;
    this.left = null;
  }

  // insert(key, value) {
  //   if(!this.key) {
  //     this.key = key;
  //     this.value = value;
  //   } else if(this.key <= key){
  //     if(!this.right) {
  //       this.right = new BinaryTree(key, value);
  //     } else {
  //     this.right.insert(key, value);
  //     }
  //   } else if(this.key >= key) {
  //     if(!this.left) {
  //       this.left = new BinaryTree(key, value);
  //     } else{
  //     this.left.insert(key, value);
  //     }
  //   }
  // }

  insert(key, value) {
    //if the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
        this.key = key;
        this.value = value;
    }

    //If the tree already exist, then start at the root, 
    //and compare it to the key you want to insert
    // If the new key is less than the node's key 
    //then the new node needs to live in the left-hand branch.
    else if (key < this.key) {
        //if the existing node does not have any left child, 
        //meaning that if the `left` pointer is empty 
        //then we can just instantiate and insert the new node 
        //as the left child of that node, passing `this` as the parent.  
        if (this.left == null) {
            this.left = new BinaryTree(key, value, this);
        }
        //if the node has an existing left child, 
        //then we recursively call the `insert` method 
        //so the node is added further down the tree.
        else {
            this.left.insert(key, value);
        }
    }
    //Similarly, if the new key is greater than the node's key 
    //then you do the same thing, but on the right-hand side.
    else {
        if (this.right == null) {
            this.right = new BinaryTree(key, value, this);
        }
        else {
            this.right.insert(key, value);
        }
    }
  }

  // retrieve(key) {
  //   if(!this.key) {
  //     return null;
  //   } else if (this.key === key) {
  //     return this.value;
  //   } else if (key <= this.key) {
  //     if(!this.left) {
  //       return null;
  //     } else {
  //       return this.left.retrieve(key);
  //     }
  //   } else {
  //     if(!this.right) {
  //       return null;
  //     } else {
  //       return this.right.retrieve(key);
  //     }
  //   }
  // }

  retrieve(key) {
    //if the item is found at the root then return that value
    if (this.key == key) {
        return this.value;
    }
    //if the item you are looking for is less than the root 
    //then follow the left child
    //if there is an existing left child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key < this.key && this.left) {
        return this.left.find(key);
    }
    //if the item you are looking for is greater than the root 
    //then follow the right child
    //if there is an existing right child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key > this.key && this.right) {
        return this.right.find(key);
    }
    //You have search the treen and the item is not in the tree
    else {
        throw new Error('Key Error');
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

  _findMax() {
    if (!this.right) {
        return this;
    }
    return this.right._findMax();
  }

 _findMaxLeft() {
  if (this.left) {
    return this.left._findMax();
  } else if (this.parent.left) {
    return this.parent.left._findMax();
  } else {
    return this.parent;
  }
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
  if(!tree) {
    return -1;
  }

  return Math.max(height(tree.left), height(tree.right)) + 1;
}

function isBST(tree) {
  if(!tree) {
    return false;
  }

  if(!tree.left && !tree.right) {
    return true;
  }

  // check for BST property
  if(tree.left && tree.left.key < tree.key) {
    return isBST(tree.left);
  }

  if(tree.right && tree.right.key > tree.key) {
    return isBST(tree.right);
  }

  console.log(tree);
}

function thirdLargest(tree) {
const maxValue = tree._findMax();

tree.remove(maxValue.key);

const maxValueTwo = tree._findMax();

tree.remove(maxValueTwo.key);

const maxValueThree = tree._findMax();

return maxValueThree.value;
}

function balanced(tree) {
  const left = height(tree.left);
  const right = height(tree.right);

  // return false if the height difference is greater than 1
  if(Math.abs(left - right) > 1) {
    return false;
  }

  if(tree.left) {
    return balanced(tree.left);
  }

  if(tree.right) {
    return balanced(tree.right);
  }

  if(!tree.left && !tree.right) {
    return true;
  }
}

function main() {
  const tree = new BinaryTree();
  const data = [10, 5, 6, 4, 20, 7, 30, 31, 32, 33];
  // tree.insert(3, 3);
  // tree.insert(1, 1);
  // tree.insert(4, 4);
  // tree.insert(6, 6);
  // tree.insert(9, 9);
  // tree.insert(2, 2);
  // tree.insert(5, 5);
  // tree.insert(7, 7);


  for(element of data) {
    tree.insert(element, element);
  }

  console.log(tree);
  
  // console.log(tree);
  // console.log('---------------------------');
  // // tree.remove(2);
  return balanced(tree);
}



console.log(main());