

### babel

需安装 babel-core  babel-loader

```shell script
$ npm install babel-core babel-loader --save-dev
```
在使用babel 时 一般会通过 @babel/preset-env 来配置他的预设 来告诉babel该如何转译 再结合 browserslist 参考浏览器支持的映射更有针对性的去转译代码

babel在转译时 可以将 箭头函数 let const 等特性直接转译为 ES5 代码  但像 Promise 或者 新方法 Array.map 等依然无法直接转译 只能 把 Promise 或 map 等函数打包到目标文件去
这事低版本的 浏览器无法识别

此时就需要在项目内引入  @babel/polyfill (从 Babel 7.4.0 开始，这个包已经被弃用，取而代之的是直接包含core-js/stable（以填充 ECMAScript 特性）和regenerator-runtime/runtime)；

@babel/polyfill 中定义了 例如 Promise map 等方法 在项目中 import '@babel/polyfill' 时 会将 polyfill 中定义的方法 注册到window 全局环境上去 会污染全局环境变量

而且 import '@babel/polyfill' 会将 所有内容都引入到项目中 所以导致 打包文件 变大 如果想只引用 使用到的 polyfill 需要 配置 'useBuiltIns': 'usage' 如下： 

```javascript
  {
      test: /.js$/,
      use: [
        {
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: [['@babel/preset-env',{
              "useBuiltIns": 'usage'
            }]]
          }
        }
      ]
    }
```

由于 @babel/polyfill 是要引入到项目中的所以 需要它是一个 dependency，而不是一个 devDependency

在babel新版本中 使用 core-js 时 注意

请注意，corejs: 2只支持全局变量(如Promise)和静态属性(如Array.from)，而corejs: 3也支持实例属性(如[].includes)。 配置如下

```javascript
{
        test: /.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env',{
                "corejs": 3, // 指定使用corejs 3版本
                "useBuiltIns": 'usage' // 自动引入已使用的新属性
              }]]
            }
          }
        ]
      }
```


由于 @babel/polyfill 会污染全局环境变量 所以它比较适合在应用中使用  如果你想在工具/库中使用 ，请使用@babel/plugin-transform-runtime插件。


