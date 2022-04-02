const webpack = require('webpack')
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// webpack4.x 不支持使用extract-text-webpack-plugin 使用 mini-css-extract-plugin 代替
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = {
  mode: 'development',
  entry: {
    main: './src/babelTest/index.js',
    test: './src/babelTest/test.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: '8090',
    hot: true,
  },
  // https://blog.csdn.net/weixin_44217741/article/details/111478289?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_paycolumn_v3&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_paycolumn_v3&utm_relevant_index=1
  performance: { hints: false }, //Webpack推荐把单个资源打包后的体积控制在244KiB之下, 如果超出会报异常 此处设置为 取消异常信息
  module: {
    rules: [
      {
        test: /.(png|jpg|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[hash:5].[ext]',
            outputPath: 'images',
            // 此属性配置为true  使用了服务端的 packages 时 无需将文件打包到dist目录中
            // emitFile: true,
            // 使用服务端的 packages 可使用publicPath 指向远程地址目录  项目发版时可以先将文件上传到 比如oss地址上
            // publicPath: 'http://xxx../'
          }
        }]
      },
      {
        test: /.css$/,
        use: ['style-loader',{
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }, 'postcss-loader']
      },
      {
        test: /.less$/,
        use: [MiniCssExtractPlugin.loader,{
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: "hx-[hash:base64:5]-[local]", // 修改class类名 加特定前缀等
              // 支持驼峰 同时存在 {image-test: 'hx-MG8Ww-image-test', imageTest: 'hx-MG8Ww-image-test'}
              exportLocalsConvention: "camelCase",
            }
          }
        },'postcss-loader', 'less-loader']
      },
      {
        test: /.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env',{
                "corejs": '3.21.1', //  这个选项只有在和useBuiltIns: usage或useBuiltIns:entry 一起使用时才有效果
                "useBuiltIns": 'usage' // 如果值为 'entry' 需在项目入口最顶上 注入 import "core-js/stable"; import "regenerator-runtime/runtime" （全部注入使得包变大） 或者手动导入需要的 polyfill  例如 import "core-js/proposals/string-replace-all";
              }]]
            }
          }
        ]
      }
      /*{
        // 在工具/库中使用该配置 需 安装 @babel/plugin-transform-runtime (devDependencies)  和 @babel/runtime-corejs3 (dependencies) ( runtime-corejs 的版本取决于配置中"corejs" 的版本)
        // 避免 使用 @babel/polyfill 或 core-js 污染全局变量
        test: /.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              "plugins": [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    "corejs": 3,
                  }
                ]
              ]
            }
          }
        ]
      }*/
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'htmlWebpackPlugin',
      template: './index.html',
      minify: false // html 是否压缩为一行
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new webpack.HotModuleReplacementPlugin({})
  ]
}
