const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './docs',
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  },
  plugins: [
    new webpack.DefinePlugin( {
      "process.env": JSON.stringify('DEV')
    } )
  ]
});