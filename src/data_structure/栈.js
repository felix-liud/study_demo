/*
 * @Author: liudong
 * @Date: 2021-01-07 09:16:38
 * @Description: 队列js
 * @FilePath: \typescript-demo\src\data_structure\栈.js
 * @LastEditors: liudong
 * @LastEditTime: 2021-01-07 11:24:24
 */


export default class Stack {
  constructor() {
    this.items = [];
  }
  // 插入
  push(val) {
    return this.items.push(val);
  }
  // 出栈
  pop() {
    return this.items.pop();
  }
  // 读取栈顶的元素
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }
  // 查看队列是否是一个空队列
  isEmpty() {
    return !this.items.length;
  }
  // 栈的大小
  size() {
    return this.items.length;
  }
  toString() {
    return this.items.join('\n');
  }
}

let s = new Stack();
s.push(1)
s.push(2)
s.push(3)
s.pop();
console.log(s);
