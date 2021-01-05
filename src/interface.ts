/*
 * @Author: liudong
 * @Date: 2020-12-10 17:24:41
 * @Description: 文件描述
 * @FilePath: \typescript-demo\src\interface.ts
 * @LastEditors: liudong
 * @LastEditTime: 2020-12-16 14:57:29
 */
let add:(a:number, b:number) => number;
add = (a, b) => a + b;
interface Add {
  (x: number, y: number): number
}
// 函数类型接口1
type AddT = (x:number, y:number) => number;
// 函数类型接口2
let add1: Add = (x, y) => x + y;
// 函数类型接口3
interface Lib {
  (): void;
  version: string;
  log(): void;
}
let lib: Lib = (() => {}) as Lib;
lib.version = '1.0';
lib.log = () => {
  console.log('垃圾');
}
console.dir(lib)