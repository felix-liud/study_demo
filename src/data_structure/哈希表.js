/*
 * @Author: liudong
 * @Date: 2021-01-05 10:12:32
 * @Description: 哈希表结构
 * @FilePath: \typescript-demo\src\data_structure\哈希表.js
 * @LastEditors: liudong
 * @LastEditTime: 2021-01-05 16:12:14
 */

/**
 * 1、数组进行插入操作时效率比较低
 * 2、数组进行查找操作效率
 *  1)如果是基于索引进行查找：效率非常高
 *  2)如果是居于内容去查找（属性值） O(n）
 * 3、数组进行删除操作效率也不高
 * 4、修改操作跟查询操作一样
 * 为了解决数组的缺点 才延伸出哈希表
 * 
 * 哈希表： 无序， 属性名不可以重复
 * 哈希表到底是一个什么样的东西呢？
 * 1.它的结构就是一个数组
 *  下标就是一个哈希函数生成的hashCode
 * 哈希化： 将大数字转化成数组范围内下标的过程，就是哈希化
 * 哈希函数： 通常我们会把单词转化成大数字，大数字在进行哈希化的代码实现在进行哈希化的代码实现放在一个
 * 函数中，这个函数就是我们的哈希函数
 * 哈希表：最终将数据插入到这个数字，对整个结构的封装，我们就称之为哈希表
 * 哈希冲突：
 *  1.链地址法（拉链法）
 *  2.开放地址法
 * */
/**
 * 优秀的哈希函数
 * 1.快速的计算
 * 2.均匀的分布
*/

// 哈希函数
// 字符串转数组，2.将大的数字压缩到数组(大小)索引范围内
function hashFunc(str, size) {
  // 定义hashCode变量
  let hashCode = 0;
  // 2 霍纳法则，来计算hashCode的值
  // cats => unicode编码
  for(let i = 0; i < str.length; i++) {
    hashCode = 37 * hashCode + str.charCodeAt(i);
  };
  const index = hashCode % size;
  return index;
};


// 判断一个数是否为质数
function isPrime(num) {
  let temp = parseInt(Math.sqrt(num));
  for(let i = 2; i < temp; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

// 哈希表
class HashTable {
  constructor() {
    // 属性
    this.storage = [];
    // 当前存放的元素
    this.count = 0; 
    // 哈希表初始大小
    this.limit = 7;
    // 扩容倍数
    this.resizeTimes = 2;
    // 比率填充因子比率多大时进行扩容
    this.maxRatio = 0.75;
    // 比率填充因子比率多小时进行缩小容器
    this.minRatio = 0.25;
  }
  // 哈希函数
  hashFunc(str) {
    // 定义hashCode变量
    let hashCode = 0;
    // 2 霍纳法则，来计算hashCode的值
    // cats => unicode编码
    for(let i = 0; i < str.length; i++) {
      hashCode = 37 * hashCode + str.charCodeAt(i);
    };
    const index = hashCode % this.limit;
    return index;
  };
  // 插入/修改
  put(key, value) {
    // 根据key获取索引值
    const index = this.hashFunc(key);
    let bucket = this.storage[index];
    if (!bucket) {
      bucket = [];
      this.storage[index] = bucket;
    }
    // 判断是新增还是修改原来的值
    for (let i = 0; i < bucket.length; i++) {
      const element = bucket[i];
      if (element[0] === key) {
        element[1] = value;
        return;
      }
    }
    
    bucket.push([key, value]);
    this.count++;
    // 判断是否需要扩容 大于75%就进行扩容
    if (this.count > this.limit * this.maxRatio) {
      let size = this.getPrime(this.limit * this.resizeTimes);
      this.resize(size);
    }
  }
  // 获取
  get(key) {
    // 根据key获取索引值
    const index = this.hashFunc(key);
    const bucket = this.storage[index];
    if (!bucket) {
      return null;
    }
    for(let i = 0; i < bucket.length; i++) {
      const element = bucket[i];
      if (element[0] === key) {
        return element[1];
      }
    }
    return null;
  }
  // 删除
  remove(key) {
    // 根据key获取索引值
    const index = this.hashFunc(key);
    const bucket = this.storage[index];
    if (!bucket) {
      return null;
    }
    for(let i = 0; i < bucket.length; i++) {
      const element = bucket[i];
      if (element[0] === key) {
        element.splice(i, 1);
        this.count--;
        if (this.count < 7 && this.limit < this.limit * this.minRatio) {
          let size = this.getPrime(Math.floor(this.limit / 2));
          this.resize(size);
        }
        return element[1];
      }
    }
    return null;
  }
  // 判断哈希表是否为空
  isEmpty() {
    return !!this.count;
  }
  // 获取哈希表中元素的个数
  size() {
    return this.count;
  }
  // 哈希表的扩容
  resize(newLimit) {
    // 缓存之前的所有数据
    const oldStorage = this.storage;
    // 重置数据
    this.storage = [];
    // 重新设置limit
    this.limit = newLimit;
    // 遍历所有的bucket
    for(let i = 0; i < oldStorage.length; i++) {
      const bucket = oldStorage[i];
      if (!bucket) {
        continue;
      }
      for(let j = 0; j < bucket.length; j++) {
        const element = bucket[j];
        this.put(element[0], element[1]);
      }
    }
  }
  // 判断一个数字是否是一个质数
  isPrime(num) {
    let temp = parseInt(Math.sqrt(num));
    for(let i = 2; i <= temp; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
  // 获取质数
  getPrime(num) {
    while (!this.isPrime(num)) {
      num++;
    }
    return num;
  }
}


let ht = new HashTable();
ht.put('abc', '123');
console.log(ht.get('abc'));
ht.put('abc', '111');
console.log(ht.get('abc'));
ht.remove('abc');
console.log(ht.get('abc'));

