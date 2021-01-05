/*
 * @Author: liudong
 * @Date: 2020-12-10 10:41:37
 * @Description: 文件描述
 * @FilePath: \typescript-demo\build\webpack.config.js
 * @LastEditors: liudong
 * @LastEditTime: 2020-12-10 17:50:01
 */
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const devConfig = require('./webpack.dev.config');
const proConfig = require('./webpack.pro.config');
console.log('process.NODE_ENV--',process.NODE_ENV);
const config = process.NODE_ENV === 'development' ? devConfig : proConfig;
module.exports = merge(baseConfig, config)