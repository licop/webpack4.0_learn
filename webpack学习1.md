### 什么是 webpack

**核心定义:** webpack 是一个静态模块打包工具(module bundler)

**模块 module:** 在模块化编程中，开发者将程序分解为功能离散的 chunk，并称之*模块*

#### webpack 天生支持的模块

- ES Module import 语句
- commonJS `require()` 语句
- AMD `define`和`require` 语句
- stylesheet url(...) 或者 HTML <img src=...> 文件中的图片链接
- WebAssembly 模块

#### 通过 _loader_ 支持的模块

- CoffeeScript
- TypeScript
- ESNext (Babel)
- Sass
- Less
- Stylus
- Elm

> 当使用 webpack 打包 ES6 模块时，webpack 可以识别`import`和`export`语法，但是注意，如果使用其他的 ES6+ 特性，仍然需要引入 babel。

### webpack 安装

- npm install webpack webpack-cli -g

### webpack 配置

#### mode

- 提供 `mode` 配置选项，告知 webpack 使用相应模式的内置优化。

string = 'production': 'none' | 'development' | 'production'

- 使用`production`会对代码进行压缩，使用`development`不会

#### loader

`webpack` 不能识别非 js 格式文件， 只能使用 loader 用于对模块的源代码进行转换。

webpack 支持使用 loader 对文件进行预处理。你可以构建包括 JavaScript 在内的任何静态资源。并且可以使用 Node.js 轻松编写自己的 loader。

如果一个静态文件不是 js 格式，则需要判断文件的结尾后缀，使用对应的文件格式的`loader`

**常用配置方式**： `module.rules` 允许你在 webpack 配置中指定多个 loader。

##### 打包图片

```
    module: {
        rules: [{
            test: /\.(jpe?g|png|gif)$/i,
            use: {
                loader: 'url-loader', // 'file-loader'
                options: {
                    // 占位符
                    name: 'image/[contenthash].[ext]',
                    limit: 10240
                }
            }
        }]
    }
```

> `url-loader` 与 `file-loader` 类似, 用于打包文件，不过`url-loader`会将文件小于`limit`的值的的图片打包成 base64 格式的文件

#### 打包样式文件

- **style-loader 作用:** 把 CSS 插入到 DOM 中。
- **css-loader 作用** 对 `@import` 和 `url()` 进行处理，就像 js 解析 `import/require()` 一样， 把多个 css 文件合并成一个
- **sass-loader 作用** 把 sass 文件翻译成 css
- **postcss-loader** 用来自动添加 css 浏览器商家前缀，可在`post.config.js`中进行配置

```
    module: {
        rules: [{
            test: /\.scss$/i,
            use: [
                'style-loader',
				'css-loader',
				'sass-loader',
				'postcss-loader'
            ]
        }]
    }
```

> 注：use 数组里编译的顺序是从上到下，从右到左，如果不注意先后顺序打包时可能会报错

更多文件格式的参考 [loader](https://webpack.docschina.org/loaders/)
