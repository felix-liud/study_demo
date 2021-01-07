
/*
* @Author: liudong
* @Date: 2021-01-06 15:31:26
* @Description: 文件描述
 * @FilePath: \typescript-demo\src\data_structure\图结构.js
 * @LastEditors: liudong
 * @LastEditTime: 2021-01-07 09:51:19
*/
import Dictionary from "./字典";
import Queue from "./队列";
class Graph {
  constructor() {
    this.vertexes = []; // 顶点
    this.edges = new Dictionary(); // 边
  }
  // 添加顶点
  addVertex(val) {
    this.vertexes.push(val);
    // 设置默认边为空数组
    this.edges.set(val, []);
  }
  // 添加边
  addEdge(v1, v2) {
    const edgesV1 = this.edges.get(v1);
    const edgesV2 = this.edges.get(v2);
    edgesV2.push(v1);
    edgesV1.push(v2);
  }
  toString() {
    // 定义一个字符串来接收所有的字符串
    let resStr = '';
    // 遍历所有的顶点和对应的边
    for(let i = 0; i < this.vertexes.length; i++) {
      resStr += this.vertexes[i] + '->';
      const edges = this.edges.get(this.vertexes[i]);
      resStr += edges.join(' ');
      resStr += '\n';
    }
    return resStr;
  }
  // 初始化状态颜色
  initColor() {
    const color = {};
    this.vertexes.forEach(item => {
      color[item] = 'white';
    });
    return color;
  }

  // 广度优先搜索bfs
  bfs (initV, handler) {
    // 初始化颜色
    const colors = this.initColor();
    // 创建一个队列
    const queue = new Queue();
    // 将顶点加入到队列中
    queue.enqueue(initV);

    while(!queue.isEmpty()) {
      // 取出顶点
      const v = queue.dequeue();
      // 获取与顶点相连的其他顶点
      console.log('this.edges: ', this.edges);
      const list = this.edges.get(v);
      // 将v的颜色设置成灰色
      colors[v] = 'gray';
      // 遍历所有的顶点并且加入到队列中
      list.forEach(item => {
        if (colors[item] === 'white') {
          colors[item] = 'gray';
          queue.enqueue(item);
        }
      });
      // 访问顶点
      handler(v);
      // 访问完成设置成黑色
      colors[v] = 'black';
    }
  }
  // 深度优先搜索(dfs)
  dfs(initV, handler) {
    let colors = this.initColor();
    this.dfsVisit(initV, colors, handler);
  }
  dfsVisit (v, colors, handler) {
    colors[v] = 'gray';
    handler(v);
    const list = this.edges.get(v);
    list.forEach(item => {
      if (colors[item] === 'white') {
        this.dfsVisit(item, colors, handler);
      }
    });
    colors[v] = 'black';
  }
}

let g = new Graph();
var myVertexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
myVertexes.forEach(v => {
  g.addVertex(v);
});
// 添加边
g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('A', 'D');
g.addEdge('C', 'D');
g.addEdge('C', 'G');
g.addEdge('D', 'G');
g.addEdge('D', 'H');
g.addEdge('B', 'E');
g.addEdge('B', 'F');
g.addEdge('E', 'I');

let res = '';
g.dfs(g.vertexes[0], v => {
  console.log('v: ', v);
  res += v;
})
console.log(res);