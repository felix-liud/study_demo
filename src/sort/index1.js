/*
 * @Author: liudong
 * @Date: 2021-01-11 10:23:39
 * @Description: 文件描述
 * @FilePath: \typescript-demo\src\sort\index1.js
 * @LastEditors: liudong
 * @LastEditTime: 2021-01-12 09:57:41
 */
const defaultArr = [
  5, 8, 9, 10, 4, 3, 1, 2, 7, 6
]
console.log(defaultArr);
class Sort {
  constructor(arr = defaultArr) {
    this.arr = arr;
  }
  // 交换数组索引位置
  swap(i1, i2) {
    const temp = this.arr[i1];
    this.arr[i1] = this.arr[i2];
    this.arr[i2] = temp;
  }
  // 冒泡排序
  /**
   * 从头比较相邻的两个元素，前面元素大于后面相邻的元素就交换位置
   * 稳定性： 稳定
   */
  bubbleSort() {
    for(let i = this.arr.length; i > 0 ; i--) {
      // 优化排序完成后就跳出循环
      // 记录已经排好序的索引
      let sortedIndex = 1;
      for(let j = 1; j < i; j++) {
        if (this.arr[j - 1] > this.arr[j]) {
          const temp = this.arr[j];
          this.arr[j] = this.arr[j - 1];
          this.arr[j - 1] = temp;
          sortedIndex = j + 1;
        };
      }
      i = sortedIndex;
    }
  }
  // 选择排序
  /**
   * 从找出最小值放到最前面
   * 稳定性： 不稳定
   * 
  */
  selectionSort() {
    for(let i = 0; i < this.arr.length ; i++) {
      let minIndex = i;
      for(let j = i + 1; j < this.arr.length; j++) {
        if (this.arr[j] < this.arr[minIndex]) {
          minIndex = j;
        };
      }
      if (minIndex !== i) {
        this.swap(minIndex, i);
      }
    }
    console.log(this.arr);
  }
  /**
   * 堆排序：可以认为是选择排序的优化
   * 
   * 
  */

  /**
   * 插入排序
   * 向抓扑克牌一样的方式，往前面一个一个插入；前面就是一个有序的了
   * 
   * 稳定性：稳定
   * 
  */
  insertSort() {
    // 拿到第二个元素开始往前插入
    for(let i = 1; i < this.arr.length; i++) {
      // 通过二分搜索找到应该插入的位置
      const insertIndex = this.searchInsertIndex(i);
      const temp = this.arr[i];
      for(let j = i; j > insertIndex; j--) {
        this.arr[j] = this.arr[j -1];
      }
      this.arr[insertIndex] = temp;
    }
    console.log(this.arr);
  }
  // 二分搜索
  indexOf(val) {
    if (!this.arr || !this.arr.length) {
      return -1;
    }
    let begin = 0;
    let end = this.arr.length;
    while(begin < end) {
      let mid = (begin + end) >> 1;
      if (val < this.arr[mid]) {
        begin = 0;
        end = mid;
      } else if(val > this.arr[mid]) {
        begin = mid;
        end = this.arr.length;

      } else {
        return mid;
      }
      return -1;
    }
  }
  // 查找v在有序数组的插入位置
  searchInsertIndex(index) {
    const val = this.arr[index];
    let begin = 0;
    let end = index;
    while(begin < end) {
      let mid = (begin + end) >> 1;
      if (val < this.arr[mid]) {
        end = mid;
      }  else {
        begin = mid + 1;
      }
    }
    return begin;
  }

  /**
   * 归并排序
   * 不断的分成子序列知道不能再分割（序列中只有一个元素）
   * 然后不断的将2个子序列合并成一个有序序列，知道最终只剩下一个序列
   * 
  */
  mergeSort() {
     
  }
  // 对指定范围内的数据进行归并排序
  mergeSortFn(begin, end) {

  }
}
new Sort().insertSort();

