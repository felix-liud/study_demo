/*
 * @Author: liudong
 * @Date: 2021-01-04 10:32:54
 * @Description: 数据结构-数组
 * @FilePath: \typescript-demo\src\data_structure\数组.js
 * @LastEditors: liudong
 * @LastEditTime: 2021-01-05 09:31:51
 */

//  数组： 数组（Array）是一种线性表数据结构。它用一组连续的内存空间，来存储一组具有相同类型的数据。

/**
 *  链表：LRU缓存淘汰算法
 *  
 * 先进先出策略 FIFO（First In，First Out）
 * 最少使用策略 LFU（Least Frequently Used）
 * 最近最少使用策略 LRU（Least Recently Used）
 * 三种最常见的链表结构：
 *  单链表、双向链表、循环链表
 * */


 
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

var removeNthFromEnd = function(head, n) {
  if(!head) {
    return null;
  }
  function listNodeToArray(nodeHead) {
    let arr = [];
    let temp = head;
    while(temp) {
      arr.push(temp);
      temp = temp.next;
    }
    return arr;
  };
  const arr = listNodeToArray(head);
  const currentNode = arr[arr.length - n];
  const prevNode = arr[arr.length - n -1];
  const nextNode = currentNode.next;

  if (currentNode) {
    if (prevNode) {
      prevNode.next = nextNode;
      return head;
    } else {
      return nextNode;
    }
  }
  return null;
};

