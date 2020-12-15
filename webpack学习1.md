### 什么是 webpack

**核心定义:** webpack 是一个静态模块打包工具(module bundler)

**模块 module:** 在模块化编程中，开发者将程序分解为功能离散的 chunk，并称之*模块*。

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

`webpack` 不能识别非 js 格式文件， 只能使用 `loader` 用于对模块的源代码进行转换。webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 `loader`。

webpack 支持使用 `loader` 对文件进行预处理。你可以构建包括 JavaScript 在内的任何静态资源。并且可以使用 Node.js 轻松编写自己的 `loader`。

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
				{
                    loader: 'css-loader',
                    options: {
                        // 处理scss文件里引入其他scss文件，引入的scss文件也要走两个loader
                        importLoaders: 2,
                        // 是否开启css module打包
                        modules: true
                    }
                },
				'sass-loader',
				'postcss-loader'
            ]
        }]
    }
```

在[css-loader](https://webpack.docschina.org/loaders/css-loader/)的`options`将`module`设置成`true`,可以使用`CSS Modules`组织样式，避免 css 全局污染, `CSS Modules`使用方式如下：

```
 import style from './style/index.scss'
```

> 注：use 数组里编译的顺序是从上到下，从右到左，如果不注意先后顺序打包时可能会报错

#### 打包 iconfont 文件

```
  module: {
        rules: [{
            test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			}
        }]
    }
```

更多文件格式的参考 [loader](https://webpack.docschina.org/loaders/)

### plugins

`plugin`可以在 webpack 运行到某个节点，帮你做一些事情，`plugin`目的在于解决 loader 无法实现的其他事。

#### HtmlWebpackPlugin

`HtmlWebpackPlugin` 会在打包结束后自动生成一个 html 文件，并把打包生成 js 自动引入到这个 html 文件中, 在文件被打包之后执行

```
module.exports = {
    entry: 'index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({template: 'src/index.html'})
    ]
};

```

#### CleanWebpackPlugin

`CleanWebpackPlugin` 在打包之前，帮你清理删除某个文件夹

```
    plugins: [
		new CleanWebpackPlugin(['dist'])
	]
```

更多插件参考 [plugin](https://webpack.docschina.org/plugins/)

### entry & output

打包的入口起点和输出， 即使可以存在多个 `entry` 起点，但只能指定一个 `output` 配置

```
 module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
    publicPath: 'http://cdn.com.cn',
  }
};

// 写入到硬盘：./dist/app.js, ./dist/search.js

```

`publicPath` 支持文件路径使用 cdn 地址

### sourceMap
