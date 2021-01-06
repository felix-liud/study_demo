/*
 * @Author: liudong
 * @Date: 2021-01-05 16:15:17
 * @Description: 树结构
 * @FilePath: \typescript-demo\src\data_structure\树.js
 * @LastEditors: liudong
 * @LastEditTime: 2021-01-06 14:21:50
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


/**
 * 红黑树 除了符合二叉搜索树的基本规则外，还添加了一下特性：
 *  1.节点是红色或黑色；
 *  2.根节点是黑色；
 *  3.每个叶子节点都是黑色的空节点（NIL节点）；
 *  4.每个红色节点的两个子节点都是黑色。（从每个叶子到根的所有路径上不能有两个连续的红色节点）
 *  5.从任一节点到其每个叶子节点的所有路径都包含相同数目的黑色节点。
 * 
 * 前面的约束，确保了红黑树的关键特性：
 *  1.从根节点到叶子节点的最长路径不会超过最短路劲的两倍。
 *  2.结果就是这个树的基本是平衡的。
 *  3.虽然没有做到绝对的平衡，但是可以保证咋最坏的情况下，依然是高效的。
 * 
 * 应用
 * 广泛用于C++的STL中,map和set都是用红黑树实现的.
 * 著名的linux进程调度Completely Fair Scheduler,用红黑树管理进程控制块,进程的虚拟内存区域都存储在一颗红黑树上,每个虚拟地址区域都对应红黑树的一个节点,左指针指向相邻的地址虚拟存储区域,右指针指向相邻的高地址虚拟地址空间.
 * IO多路复用epoll的实现采用红黑树组织管理sockfd，以支持快速的增删改查.
 * ngnix中,用红黑树管理timer,因为红黑树是有序的,可以很快的得到距离当前最小的定时器.
 * java中TreeMap的实现.
 *  
 * 
 * 
 * 
*/


/**
 * AVL树
 * AVL树是带有平衡条件的二叉查找树,,一般是用平衡因子差值判断是否平衡并通过旋转来实现平衡,
 * 左右子树树高不超过1,
 * 和红黑树相比,它是严格的平衡二叉树,平衡条件必须满足(所有节点的左右子树高度差不超过1).
 * 不管我们是执行插入还是删除操作,只要不满足上面的条件,就要通过旋转来保持平衡,而旋转是非常耗时的,
 * 由此我们可以知道AVL树适合用于插入删除次数比较少，但查找多的情况。
 * 
 * 局限性：
 *  由于维护这种高度平衡所付出的代价比从中获得的效率收益还大,故而实际的应用不多，
 *  更多的地方是用追求局部而不是非常严格整体平衡的红黑树.当然,如果应用场景中对插入删除不频繁,
 *  只是对查找要求较高,那么AVL还是较优于红黑树.
 * 应用
 *  Windows NT内核中广泛存在.
*/
/**
 * B/B+树:
 * B/B+树是为了磁盘或其它存储设备而设计的一种平衡多路查找树(相对于二叉,B树每个内节点有多个分支),
 * 与红黑树相比,在相同的的节点的情况下,
 * 一颗B/B+树的高度远远小于红黑树的高度(在下面B/B+树的性能分析中会提到).
 * B/B+树上操作的时间通常由存取磁盘的时间和CPU计算时间这两部分构成,而CPU的速度非常快,
 * 所以B树的操作效率取决于访问磁盘的次数,关键字总数相同的情况下B树的高度越小，磁盘I/O所花的时间越少.
 * 
*/