
### code splitting 代码分割


为什么要有 code splitting ?

拿 lodash.js 举例 

如果我们在我们的项目 lodash.test.js 中使用了 lodash.js 需要在代码中引入

import _ from 'lodash'

然后使用它的 last 方法 并打印

console.log(_.last([1,2,3]))

由于在index.js中引入了lodash webpack 在打包时 会将 lodash 文件的内容 与 lodash.test.js 一起打包到目标文件中 

这样做第一会增大目标文件 第二 如果 业务代码发生变化 还需从新 把两个文件再打包 页面也需要重新加载一下 合并后的 文件 造成缓存失效和资源浪费

我们尝试把 lodash 分离 单独打包 这样在修改业务代码时 lodash 单独打包的文件没有变动不需要更新 页面只更新 业务代码打包后的文件 

如果 配置了 dll  lodash 也不需要打包 提升了打包速度 和 页面更新加载速度


代码分割分两种方式 

1. 手动分割不需要 webpack配合 

例如 在上例中 添加 lodash.js 文件  并在 lodash.js 中 引入lodash

import _ from 'lodash';
window._ = _;

将 lodash 绑定到 window 上  

在 lodash.test.js 中可以 直接使用 _.last([1,2,3])  避免 在lodash.test.js 中引入

在 webpack entry 中 添加 打包入口  便可实现 代码分离 

2. 使用webpack splitChunks 插件

splitChunksPlugin 介绍： 

早起使用 CommonsChunkPlugin， 它的作用是 避免在webpack 依赖关系父子树中重复依赖；比如：
a引入b 和 c , b 中也可以引入 c 和 d 对于c 就属于重复依赖 CommonsChunkPlugin 尽量使用之前引入过的缓存来避免重复
版本4开始 为了优化 删除了 CommonsChunkPlugin 使用 optimization.splitChunk 和 optimization.runtimeChunk

