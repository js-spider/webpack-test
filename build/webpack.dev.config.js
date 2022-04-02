const webpack = require('webpack')
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config')


const devConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: '8090',
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({})
  ]
}

module.exports = merge(baseConfig, devConfig)
