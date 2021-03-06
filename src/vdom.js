/*
 * @Author: liudong
 * @Date: 2020-12-31 17:06:15
 * @Description: 文件描述
 * @FilePath: \typescript-demo\src\vdom.js
 * @LastEditors: liudong
 * @LastEditTime: 2020-12-31 17:12:26
 */

// 创建虚拟DOM函数
const vNodeTypes = {
  HTML: "HTML",
  TEXT: "TEXT",
  COMPONENT: "COMPONENT",
  CLASS_COMPONENT: "CLASS_COMPONENT"
}
const childTypes = {
  EMPTY: "EMPTY",
  SINGLE: "SINGLE",
  MULTIPLE: "MULTIPLE"
}

function createElement(tag, data, children) {
  // 处理不同的节点类型tag 
  let vNodeType;
  if (typeof tag === "string") {
    //元素是一个普通的html标签
    vNodeType = vNodeTypes.HTML;
  } else if (typeof tag === "function") {
    vNodeType = vNodeTypes.COMPONENT
  } else {
    vNodeType = vNodeTypes.TEXT
  }

  // 处理不同的children类型
  let childType;
  if (children === null) {
    childType = childTypes.EMPTY;
  } else if (Array.isArray(children)) {
    if (children.length === 0) {
      childType = childTypes.EMPTY;
    } else if (children.length >= 1) {
      childType = childTypes.MULTIPLE;
      console.log("childType:", childType)
    }
  } else {
    childType = childTypes.SINGLE;
    children = createTextVNode(children + "")
  }

  return {
    tag,
    vNodeType,
    data,
    children,
    childType
  }
}
// 文本的children，直接处理下
function createTextVNode(text) {
  return {
    vNodeType: vNodeTypes.TEXT,
    tag: null,
    data: null,
    children: text,
    childType: childTypes.EMPTY
  }
}
