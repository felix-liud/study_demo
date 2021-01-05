/*
 * @Author: liudong
 * @Date: 2020-12-10 10:40:56
 * @Description: 文件描述
 * @FilePath: \typescript-demo\build\webpack.base.config.js
 * @LastEditors: liudong
 * @LastEditTime: 2020-12-10 17:46:02
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // mode: process.NODE_ENV,
  entry: './src/index.ts',
  output: {
    filename: 'app.[hash:8].js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [{ loader: 'ts-loader'}],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/tpl/index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }

}
