/*
 * @Author: liudong
 * @Date: 2021-01-05 09:47:08
 * @Description: 字典结构
 * @FilePath: \typescript-demo\src\data_structure\字典.js
 * @LastEditors: liudong
 * @LastEditTime: 2021-01-06 15:39:10
 */
export default class Dictionary {
  constructor() {
    this.items = {};
  }
  set(key, value) {
    this.items[key] = value;
  }
  has(key) {
    return this.items.hasOwnProperty(key);
  }
  remove(key) {
    if (this.has(key)) {
      delete this.items[key];
      return true;
    }
    return false;
  }
  get(key) {
    return this.has(key) ? this.items[key] : undefined;
  }
  keys() {
    return Object.keys(this.items);
  }
  values() {
    return Object.values(this.items);
  }
}