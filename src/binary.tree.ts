/*
 * @Author: liudong
 * @Date: 2020-12-22 09:02:07
 * @Description: 文件描述
 * @FilePath: \typescript-demo\src\binary.tree.ts
 * @LastEditors: liudong
 * @LastEditTime: 2020-12-22 14:40:59
 */
type CbType<T = number> = (key: T) => void;
class TreeNode {
  key: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(key: number) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  root: TreeNode | null;
  constructor() {
    this.root = null;
  }
  insert(key: number) {
    let newTreeNode: TreeNode = new TreeNode(key);
    this.root === null ? (this.root = newTreeNode) : (this.insertNode(this.root, newTreeNode));
  }
  private insertNode(node: TreeNode, newNode: TreeNode) {
    if (newNode.key < node.key) {
      node.left === null ? (node.left = newNode) : (this.insertNode(node.left, newNode));
    } else {
      node.right === null ? (node.right = newNode) : (this.insertNode(node.right, newNode));
    }
  }
  // 中序排序
  inOrderTraverse(cb: CbType) {
    this.inOrderTraverseNode(<TreeNode>this.root, cb);
  }

  // 中序 左根右
  private inOrderTraverseNode(node: TreeNode | null, cb: CbType) {
    if (node instanceof TreeNode) {
      this.inOrderTraverseNode(node.left, cb);
      cb(node.key);
      this.inOrderTraverseNode(node.right, cb);
    }
  }
  // 先序遍历
  preOrderTraverse(cb: CbType) {
    this.preOrderTraverseNode(this.root, cb);
  }
  // 先序遍历 根左右
  private preOrderTraverseNode(node: TreeNode | null, cb: CbType) {
    if (node instanceof TreeNode) {
      cb(node.key);
      this.preOrderTraverseNode(node.left, cb);
      this.preOrderTraverseNode(node.right, cb);
    }
  }
  // 后序 遍历 --- 先访问后代节点，再访问节点本身  左右根
  postOrderTraverse(cb: CbType) {
    this.postOrderTraverseNode(this.root, cb);
  }
  postOrderTraverseNode(node: TreeNode | null, cb: CbType) {
    if (node instanceof TreeNode) {
      this.postOrderTraverseNode(node.left, cb);
      this.postOrderTraverseNode(node.right, cb);
      cb(node.key);
    }
  }

  // 最小值
  min(): number | null {
    if (!this.root) {
      return null;
    }
    if (this.root.left instanceof TreeNode) {
      let node: TreeNode = this.root.left;
      while (node.left) {
        node = node.left;
      }
      return node.key;
    }

    return this.root.key;
  }

  // 搜索树中某个值
  search(key: number) {
    if (this.root instanceof TreeNode) {
      return this.searchNode(this.root, key);
    }
    return false;
  }
  private searchNode(node: TreeNode, key: number): boolean {
    if (node.key === key) {
      return true;
    }
    if (node.key > key) {
      if (node.left) {
        return this.searchNode(node.left, key);
      }
      return false;
    }
    // node.key < key
    if (node.right) {
      return this.searchNode(node.right, key);
    }
    return false;
  }


  remove(key: number) {
    this.root = this.removeNode(this.root, key);
  }

  // 发现最小节点
  findMinNode(node: TreeNode): TreeNode | null {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node
    }
    return null
  }

  // 移除节点辅助方法
  removeNode(node: TreeNode | null, key: number): TreeNode | null {
    if (node === null) {
      return null
    }

    if (key < node.key) {
      node.left = this.removeNode(node.left, key);
      return node
    } else if (key > node.key) {
      node.right = this.removeNode(node.right, key);
      return node
    } else {
      // 一个页节点
      if (node.left === null && node.right === null) {
        node = null;
        return node
      }

      // 只有一个子节点的节点
      if (node.left === null) {
        node = node.right;
        return node
      } else if (node.right === null) {
        node = node.left;
        return node
      }

      // 有两个子节点的节点
      let aux = this.findMinNode(node.right);
      if (aux instanceof TreeNode) {
        node.key = aux.key;
        node.right = this.removeNode(node.right, aux.key);
      }
      return node
    }
  }
}
let tree: BinarySearchTree = new BinarySearchTree();
tree.insert(20);
tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(5);
tree.insert(212);
tree.insert(20123);
tree.insert(21);
tree.insert(22);
tree.insert(23);
let arr: number[] = [];
console.log(tree);

tree.inOrderTraverse(key => {
  arr.push(key)
});

console.log(arr, tree.search(20124));

