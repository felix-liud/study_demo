/*
 * @Author: liudong
 * @Date: 2021-01-07 09:16:38
 * @Description: 队列js
 * @FilePath: \typescript-demo\src\data_structure\队列.js
 * @LastEditors: liudong
 * @LastEditTime: 2021-01-07 09:44:30
 */


export default class Queue {
  constructor() {
    this.items = [];
  }
  // 插入
  enqueue(val) {
    return this.items.push(val);
  }
  // 删除对列表第一个元素
  dequeue() {
    return this.items.shift();
  }
  // 读取第一个元素
  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }
  // 查看队列是否是一个空队列
  isEmpty() {
    return !this.items.length;
  }
  // 清空队列
  clear() {
    this.items = [];
  }
  toString() {
    return this.items.join('\n');
  }
}