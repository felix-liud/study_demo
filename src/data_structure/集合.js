/*
 * @Author: liudong
 * @Date: 2021-01-05 09:16:58
 * @Description: 集合结构
 * @FilePath: \typescript-demo\src\data_structure\集合.js
 * @LastEditors: liudong
 * @LastEditTime: 2021-01-05 09:48:54
 */


/**
 * 特点：元素是无序的、元素不可以重复 ===> es6 Set
 * 集合：特殊的数组：不是连续的，没有顺序
 * */  

// 封装集合类
function Set() {
  // 属性
  this.items = {};

  // 方法
  Set.prototype.add = function(value) {
    if (this.has(value)) {
      return false;
    }
    this.items[value] = value;
    return true;
  } 
  
  Set.prototype.remove = function(value) {
    // 判断该集合中是否包含改元素
    if (!this.has(value)) {
      return false;
    }
    delete this.items[value];
    return true;
  }

  Set.prototype.has = function (value) {
    return this.items.hasOwnProperty(value);
  }
  Set.prototype.clear = function () {
    this.items = {};
  }
  Set.prototype.size = function() {
    return Object.keys(this.items).length;
  }
  Set.prototype.values = function() {
    return Object.keys(this.items);
  }
  // 并集
  Set.prototype.union = function(otherSet) {
    let unionSet = new Set();
    this.values().forEach(key => {
      unionSet.add(key);
    });
    otherSet.values().forEach(key => {
      if (!unionSet.has(key)) {
        unionSet.add(key);
      }
    });
    return unionSet;
  }
  // 交集
  Set.prototype.intersection = function(otherSet) {
    let intersectionSet = new Set();
    this.values().forEach(key => {
      if (otherSet.has(key)) {
        intersectionSet.add(key);
      }
    });
    return intersectionSet;
  }
}

let set = new Set();
console.log(set.add('123'));
console.log(set.add('abc'));
console.log(set.add('def'));
let set1 = new Set();
set1.add('123');
set1.add('456');
set1.add('789');
console.log(set.intersection(set1).values(), 'union');