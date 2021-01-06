/*
 * @Author: liudong
 * @Date: 2021-01-05 16:15:17
 * @Description: 树结构
 * @FilePath: \typescript-demo\src\data_structure\树.js
 * @LastEditors: liudong
 * @LastEditTime: 2021-01-06 10:23:05
 */


/**
 * 二叉树：最多只有两个叶子节点的树
 * 二叉树的第n层最多只有2^(n-1)个子节点
 * 深度为k的二叉树有最大节点总数为：2^k - 1; k >= 1;
 * 
 * 完美二叉树（满二叉树）：
 *  在二叉树中，除了最下一层的叶节点外，每层节点都有2个子节点就是完美二叉树
 * 
 * 完全二叉树：
 *  在满足满二叉树的性质后，最后一层的叶子节点均需在最左边
 *  就是所有节点从上往下，从左往右依次排列。
 * 
 * 二叉搜索树（二叉查找树、二叉排序树） BST(binary search tree) 
 **/


// 节点类
class Node {
  constructor(key) {
    this.key = key;
    this.right = null;
    this.left = null;
  }
}
// 二叉搜索树
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(key) {
    let newNode = new Node(key);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }
  insertNode(node, newNode) {
    if (newNode.key < node.key) {
      // 向左插找
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      // 向右查找
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  // 先序遍历二叉树
  preOrderTraversal(handler) {
    this.preOrderTraversalNode(this.root, handler);
  }
  preOrderTraversalNode(node, handler) {
    if (!node) {
      return;
    }
    handler && handler(node.key);
    this.preOrderTraversalNode(node.left, handler);
    this.preOrderTraversalNode(node.right, handler);
  }

  // 中序遍历二叉树
  inOrderTraversal(handler) {
    this.inOrderTraversalNode(this.root, handler);
  }
  inOrderTraversalNode(node, handler) {
    if (!node) {
      return;
    }
    this.inOrderTraversalNode(node.left, handler);
    handler && handler(node.key);
    this.inOrderTraversalNode(node.right, handler);
  }
  // 后序遍历
  postOrderTraversal(handler) {
    this.postOrderTraversalNode(this.root, handler);
  }
  postOrderTraversalNode(node, handler) {
    if (!node) {
      return;
    }
    this.postOrderTraversalNode(node.left, handler);
    this.postOrderTraversalNode(node.right, handler);
    handler && handler(node.key)
  }
  // 最小值
  min() {
    let node = this.root;
    let key = null;
    while(node) {
      key = node.key;
      node = node.left;
    }
    return key;
  }
  // 最大值
  max() {
    let node = this.root;
    let key = null;
    while(node) {
      key = node.key;
      node = node.right;
    }
    return key;
  }
  // 搜索是否存在指定值
  has(key) {
    return this.searchNode(this.root, key)
  }
  // 非递归实现
  // has(key) {
  //   let node = this.root;
  //   while(node) {
  //     if (node.key === key) {
  //       return true;
  //     }
  //     if (node.key > key) {
  //       node = node.left;
  //     } else {
  //       node = node.right;
  //     }
  //   }
  //   return false;
  // }
  searchNode(node, key) {
    if (!node) {
      return false;
    }
    if (node.key === key) {
      return true;
    } else if (node.key > key) {
      return this.searchNode(node.left, key);
    } else {
      return this.searchNode(node.right, key);
    }
  }
  
  // 删除
  /**
   * 
   * 
  */
  remove(key) {
    // 找到要删除的节点，没有就不需要删除
    // 缓存删除的目标节点
    let current = this.root;
    // 删除的目标节点的父节点
    let parent = null;
    let isLeftNode = true;
    while(current.key !== key) {
      parent = current;
      if (current.key > key) {
        current = current.left;
        isLeftNode = true;
      } else {
        current = current.right;
        isLeftNode = false;
      }
      if (current === null) {
        return false;
      }
    }
    if (!current.left && !current.right) {
      if (current === this.root) {
        this.root = null;
      } else {
        // 1 删除的节点是叶子节点
        parent[isLeftNode ? 'left' : 'right'] = null;
      }
      return true;
    }
    // 2 删除的节点只有一个子节点
    else if (!current.right) {
      if (current === this.root) {
        this.root = current.left
      } else {
        parent[isLeftNode ? 'left' : 'right'] = current.left;
      }
    }
    else if (!current.left) {
      if (current === this.root) {
        this.root = current.right
      } else {
        parent[isLeftNode ? 'left' : 'right'] = current.right;
      }
    } else {
      // 3 删除的节点有两个子节点
      const left = current.left;
      const right = current.right;
      // 找到最右侧节点
      const maxNode = this.findMaxNode(current);
      // 删除最右侧节点
      this.remove(maxNode.key);
      if (current === this.root) {
        this.root = maxNode;
        maxNode.left = left;
        maxNode.right = right;
      } else {
        parent[isLeftNode ? 'left' : 'right'] = maxNode;
      }
    }
  }
  findMaxNode(node) {
    let current = node;
    while(current && current.right) {
      current = current.right;
    }
    return current;
  }
}

let t = new BinarySearchTree();
t.insert(9);
t.insert(8);
t.insert(10);
t.insert(7);
t.insert(6);
t.insert(11);
t.insert(17);
t.insert(12);
t.insert(15);
t.insert(13);
t.insert(99);

console.log(t.remove(9));
let arr = [];
t.inOrderTraversal((key) => {
  arr.push(key);
});
console.log(t);