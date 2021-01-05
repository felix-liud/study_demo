/*
 * @Author: liudong
 * @Date: 2020-12-10 10:41:57
 * @Description: 文件描述
 * @FilePath: \typescript-demo\build\webpack.pro.config.js
 * @LastEditors: liudong
 * @LastEditTime: 2020-12-10 11:41:38
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ]
}