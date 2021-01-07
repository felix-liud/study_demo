/*
 * @Author: liudong
 * @Date: 2021-01-07 11:53:39
 * @Description: 文件描述
 * @FilePath: \typescript-demo\src\sort\index.js
 * @LastEditors: liudong
 * @LastEditTime: 2021-01-07 15:14:01
 */
class ArrayList {
  constructor() {
    this.array = [];
  }
  insert(val) {
    this.array.push(val);
  }
  toString() {
    return this.array.join();
  }
  // 交换位置
  swap(m, n) {
    const temp = this.array[m];
    this.array[m] = this.array[n];
    this.array[n] = temp;
  }
  // 冒泡排序
  bubbleSort() {
    const length = this.array.length;
    for(let i = 0; i < length - 1; i++) {
      for(let j = i + 1; j < length - 1 - i; j++) {
        if (this.array[i] > this.array[j]) {
          this.swap(i, j);
        }
      }
    }
    return this.array;
  }
  // 选择排序
  selectionSort() {
    for(let i = 0; i < this.array.length; i++) {
      let minIndex = i;
      for(let j = i + 1; j < this.array.length; j++) {
        if (this.array[minIndex] > this.array[j]) {
          minIndex = j;
        }
      }
      this.swap(minIndex, i);
    }
    
    return this.array;
  }
  // 插入排序
  insertSort() {
    let len = this.array.length;
    let preIndex, current;
    for(let i = 1; i < len; i++) {
        preIndex = i - 1;
        current = this.array[i];
        while(preIndex >= 0 && this.array[preIndex] > current) {
            this.array[preIndex + 1] = this.array[preIndex];
            preIndex--;
        }
        this.array[preIndex + 1] = current;
    }
    return this.array;
  }
}

const arr = new ArrayList();
arr.array = [10, 12, 91, 1, 4, 6, 7, 23, 56, 74, 99];
// console.log(arr.bubbleSort());
console.log(arr.insertSort());


