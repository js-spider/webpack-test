const webpack = require('webpack')
const { merge } = require('webpack-merge');
const emptyConfig = require('./webpack.empty.config')


/**
 * 代码分离 （code spliting）
 * 手动分离 配置
 *
 * */

/*const splitChunksConfig = {
  entry: {
    lodash: './src/splitChunks/lodash.js',
    main: './src/splitChunks/lodash.test.js'
  },
}*/


/**
 * webpack 配置分离
 * */


function fName(name){
  return function(file){
    if(file.resourceResolveData){
      return `${name}~${file.resourceResolveData.descriptionFileData.name}`
    }else{
      return `${name}.js`
    }
  }
}

const splitChunksConfig = {
  entry: {
    main: './src/splitChunks/index.js'
  },
  optimization: {
    splitChunks: {
      // 'all' 、 'initial'、'async' :
      // all 两者兼顾 满足条件就单独打包
      // initial 针对同步代码 引入 如： import xx from xx, 同步时 需配合 cacheGroup 配置来确认是否单独打包
      // async 针对 异步代码引入 import(xx).then() 将异步引入的单独打包
      chunks: 'initial',
      minSize: 100, // 只有当文件超过 minSize 时 才单独打包 一般配置为30K
      maxSize: 20000, // 当单独打出的包超过 maxSize 时 会将打出的包拆分出多个小于 maxSize 的包 有的包无法拆分时 则不拆分
      minChunks: 1, // 被引入次数小于 minChunks 不单独打包
      maxAsyncRequests: 5, // 按需加载时的最大并行请求数
      maxInitialRequests: 3, // 在一个入口点并行请求的最大数量
      automaticNameDelimiter: '~',
      // name: tt,
      // cacheGroups 定义缓存规则组  凡是符合某一个规则的 都缓存在当前规则组内 最后再根据细则 生成包文件 比如 jquery,lodash 都来自第三方
      // 所以 都归入到 vendors 组内 如果 合成的包 超过了 maxSize则会拆成多个 vendors ~ xxx.js 的包
      // 当所有条件都满足时，来自相同块和缓存组的模块将形成一个新的块。
      cacheGroups: {
        vendors: {
          // 当 chunks : initial 或者 all  时 检测匹配 如果引入的包是第三方包文件 则将文件打包到该规格限制组内
          test: /[\\/]node_modules[\\/]/,
          priority: -10,  // 当同时满足多个 组条件时 会落入 priority 值比较大的组中
          // name: fName('vend')
          name: 'vend'
        },
        tst: {
          test: /.test.js$/,
          priority: -15,
          name: fName('tst')
        },
        default: { // 如果其他组没有匹配上 则进入 default 组中
          minChunks: 2, // 被引入2次及以上时 单独打包  外面 minChunks 配置1 是为了 实现第三方包即使被引入一次也单独打包
          priority: -20,
          reuseExistingChunk: true,
          filename: fName('common') // 当前组可自定义名称
        }
      }
    }
  }
}

module.exports = merge(splitChunksConfig, emptyConfig)
