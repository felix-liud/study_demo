/*
 * @Author: liudong
 * @Date: 2020-12-11 10:34:43
 * @Description: ts中的函数
 * @FilePath: \typescript-demo\src\function.ts
 * @LastEditors: liudong
 * @LastEditTime: 2020-12-17 16:55:21
 */
// 函数的参数：
// 可选参数
const addFn = (a: number, b?: number): number => {
  return b ? a + b : a;
}
addFn(1);
// 函数重载
function add8(...reset: number[]):number;
function add8(...reset: string[]):string;
function add8(...reset: any[]):any {
  let first = reset[0];
  if (typeof first === 'string') {
    return reset.join();
  }
  if (typeof first === 'number') {
    return reset.reduce((pre: number, cur) => pre + cur, 0);
  }
  return reset;
};
console.log(add8(1,2,3,4,5,6,6,7));
console.log(add8('a', 'b', 'c', 'd'));


class Person {
   constructor() {

  }
  // protected
  protected name = 'test'; // 只能子类和类访问
}

// 抽象类和多态


// 抽象类
abstract class Animal {
  eat() {
    console.log('eating');
  }
  // 抽象方法
  abstract sleep(): void;
}
class Dog extends Animal {
  color: string;
  sleep() {
    console.log('dog is sleep');
  }
  constructor(color: string) {
    super();
    this.color = color;
  }
}
// 无法创建抽象类的示例
// let animal = new Animal();
// 只能被继承
let dog = new Dog('white');
dog.eat();
// console.log(dog.wang('垃圾'));


/**
 * 多态
 * 定义一个抽象方法
 * 在不同的子类去实现
 */
class Cat extends Animal {
  sleep() {
    console.log('cat is sleep');
  }
}
const animals: Animal[] = [new Cat(), new Dog('blue')];
animals.forEach(ani => {
  ani.sleep();
});


class WorkFlow {
  fn1() {
    return this;
  }
  fn2() {
    return this;
  }
}
// 链式调用
new WorkFlow().fn1().fn2();

/**
 * 类和接口的关系
 * interface 无法约束构造函数
 * interface只能约束公有成员
 * interface可以抽离出可重用的接口，也可以把多个接口继承为一个接口
 * 
 */


interface Human {
  name: string;
  eat(): void;
}
class Asian implements Human {
  constructor(name: string) {
    this.name = name;
  }
  name: string
  eat() {}
  sleep() {}
}
//  * interface可以抽离出可重用的接口，也可以把多个接口继承为一个接口
interface Man extends Human {
  run(): void;
}
interface Child {
  cry(): void;
}

interface Boy extends Man, Child {

}
let boy: Boy = {
  name: '',
  run() {},
  eat() {},
  cry() {},
}

// 接口继承类
class Auto {
  state = 1
  private name: string = ''
}
interface AutoInterface extends Auto{

}
// 接口会抽离类的私有属性 所以会提示 错误的实现了AutoInterface
// class Classes implements AutoInterface {
//   // state: number = 1
//   private name:string = 'dsf'
// }
class Bus extends Auto implements AutoInterface{

}



/**
 * 泛型：不需要预先定义的类型，具体的类型需要使用的时候才能确定
 * 
 * */ 

//  使用泛型来实现一个log函数
function log<T>(value: T): T {
  console.log(value)
  return value;
}
log(123); 
// 泛型定义函数
type Log = <T>(value: T) => T;

let myLog: Log = log;

// 泛型定义接口
interface LogInterface {
  <T>(value: T): T;
}

let myLog1: LogInterface = log;
// 也可以吧泛型放在接口名称后面，这样在实现的时候必须传入一种类型
// 也可以设置默认类型
// interface LogInterface2<T=string> {
//   (value: T): T;
// }
interface LogInterface2<T> {
  (value: T): T;
}
let myLog2: LogInterface2<string> = log;


interface Length {
  length: number
}
// 类型约束
function log1<T extends Length>(value: T): T {
  console.log(value);
  return value;
}
log1([123121,123,12,3,2113,2113]);
log1({length: 23123});
log1('123');


/**
 * TS的类型检查机制
 * 
*/

// 类型推断  、从右侧表达式推断类型
let a  = 1; // 推断为number 类型；
let a1; // 推断为any类型;
let a3 = [1]; // 推断为number
let fn = (x = 1) => x + 1; 
// 上下文推断 从左侧推断 // 时间处理中
window.onkeydown = (event: any) => {
  // console.log(event);
  // event.
}

window.onmousedown = function(mouseEvent: any) {
  console.log(mouseEvent.button);  //<- Error
};
interface Foo {
  bar: number;
}
// 类型断言避免滥用  容易丢失一些属性
let foo = {} as Foo;
foo.bar = 1;
// 建议使用
let foo1: Foo = {
  bar: 1
}

// 类型的兼容性  
// string 类型兼容null类型 （需要关闭 "strictNullChecks": false,              /* Enable strict null checks. */）
let s: string = 'a';
// s = null;
interface X {
  a: any;
  b: any;
}
interface Y {
  a: any;
  b: any;
  c: any;
}
let x: X = {
  a: 1,
  b: 2
}
let y: Y = {
  a: 1,
  b: 2, 
  c: 3
}

// x = y;
// 成员少的可以兼容成员多的
// y = x;
// 函数的兼容性
type Handler = (a: number, b: number) => void;

function hof(handler: Handler) {
  return handler;
}
let handler1 = (a: number) => {};
let handler2 = (a: number, b: number) => {};
let handler3 = (a: number, b: number, c:number) => {};
// hof(handler3);

// 类型保护
enum Type {
  Strong, Week
}

class Java {
  helloJava () {
    console.log('Hello Java');
  }
  x: number = 1
}
class JavaScript {
  helloJavaScript() {
    console.log('Hello JavaScript')
  }
  x: string = '11'
}
// 类型保护函数
function isJava(lang: Java | JavaScript): lang is Java {
  return (lang as Java).helloJava !== undefined;
}

function getLanguage(type: Type) {
  let lang = type === Type.Strong ? new Java() : new JavaScript();
  let { x } = lang;
  // if ((lang as Java).helloJava) {
  //   (lang as Java).helloJava(); 
  // } else {
  //   (lang as JavaScript).helloJavaScript();
  // }

  // 1: instanceof
  // if (lang instanceof Java) {
  //   lang.helloJava();
  // } else {
  //   lang.helloJavaScript();
  // }

  // 2: in
  // if ('helloJava' in lang) {
  //   lang.helloJava();
  // } else {
  //   lang.helloJavaScript();
  // }

  // 3 typeof
  if (typeof x === 'string' ) {
    console.log(x.length);
  } else {
    console.log(x.toFixed())
  }

  // 4 使用类型保护函数
  if (isJava(lang)) {
    lang.helloJava();
  } else {
    lang.helloJavaScript();
  }

  return lang;
}
// getLanguage(Type.Strong);


/**
 * ts的高级类型
 * 交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性
 * */ 

interface DogInterface {
  run(): void;
}
interface CatInterface {
  jump(): void
}
// 交叉类型
let pet: DogInterface & CatInterface  = {
  run() {
    console.log('is running');
  },
  jump() {
    console.log('is jumping')
  }
}

// 字面量联合类型
let b: 'b' | 'a' | 'c';
let c: 1 | 2 | 3;


class Dog1 implements DogInterface {
  run() {}
  eat() {}
}
class Cat1 implements CatInterface {
  jump() {}
  eat() {}
}



// 索引类型
let obj = {
  a: 1,
  b: 2,
  c: 2,
}

function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key => obj[key]);
}
console.log(getValues(obj, ['a', 'c']))

// keyof T
interface Obj {
  a: number;
  b: number
}
let key: keyof Obj = 'a';
// T[K]
let value: Obj['a'] = 1;

// T extends U

// 映射类型
interface Obj1 {
  a: string;
  b: number;
  c: boolean;
}
// 只读
type ReadOnlyObj = Readonly<Obj>;
type Readonly1<K> = {
  readonly [T in keyof K]: K[T]
}
type ReadOnlyObj1 = Readonly1<Obj>;
// 可选
type PartialObj = Partial<Obj>;
type Partial1<T> = {
  [P in keyof T]?: T[P];
} 

type PartialObj2 = Partial1<Obj>;
// 属性抽取
type PickObj = Pick<Obj, 'a' | 'b'>;
type Pick1<T, K extends keyof T> = {
  [P in K]: T[P];
} 
type PickObj1 = Pick1<Obj, 'a' | 'b'>;
// Record
type RecordObj = Record<'x' | 'y' | 'z', Obj>;
type Record1<T extends keyof any, K> = {
  [P in T]: K
}

type RecordObj1 = Record1<'x' | 'y' | 'z', Obj>;

// 条件类型
// T extends U ? X : Y;
type TypeName<T> = 
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" : 
  T extends undefined ? "undefined":
  T extends Function ? "function" :
  "object";

type T1 = TypeName<string>;
type T2 = TypeName<string[]>;

// (A | B) extends U ? X : Y; ===> 
// (A extends U ? X : Y) | (B extends U ? X : Y)

type T3 = TypeName<string | string[]>
