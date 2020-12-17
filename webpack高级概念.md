### Tree Shaking

`tree shaking` 就是使得 js 文件中没有被引入的代码不被打包到文件中, `tree shaking` 只在 ES Module 的引入方式下生效， 例如 `import` 和 `export`, 如果使用`commonjs`的打包方式则不生效。

#### 使用

一般来说，需要将`package.json`里添加`sideEffects`属性

```
   {
       "sideEffects": false
   }
```

如果 `mode` 配置为`development` 则 webpack 配置需要添加

```
    mode: 'development',
    optimization: {
     usedExports: true,
    },
```

如果是生成环境 `mode` 配置为`production`，则 webpack 不用添加其他配置，webpack 会自动实现`tree shaking`

[更多关于 Tree Shaking](https://webpack.docschina.org/guides/tree-shaking/)

### development 和 production 区分打包

由于开发模式(development)和生产模式(production) 下对打包需求的不一样，所以 webpack 打包的最佳实践是将两种模式下不同的配置抽离出来

比如`source map`在两种环境下需求不一样; `development`模式需要`热模块替换 HMR`和`Tree Shaking`配置,`production`则不需要。

所以我们需要三个 webpack 配置，`webpack.common.js`， `webpack.dev.js`和`webpack.prod.js`, 然后使用`webpack-merge`插件将其不同环境下的特性和公用的部分合并。

### 代码分割 code splitting

在最开始使用 Webpack 的时候, 都是将所有的 js 文件全部打包到一个 build.js 文件中(文件名取决与在 webpack.config.js 文件中 output.filename), 但是在大型项目中, build.js 可能过大, 导致页面加载时间过长. 这个时候就需要`code splitting`, `code splitting`就是将文件分割成块(chunk), 我们可以定义一些分割点(split point), 根据这些分割点对文件进行分块, 并实现按需加载。

代码分割，也就是 `Code Splitting` 一般需要做这些事情：

- 为 `Vendor` 单独打包（Vendor 指第三方的库或者公共的基础组件，因为 Vendor 的变化比较少，单独打包利于缓存）
- 为 `Manifest` （Webpack 的 Runtime 代码）单独打包
- 为不同入口的业务代码打包，也就是代码分割异步加载（同理，也是为了缓存和加载速度）
- 为异步公共加载的代码打一个的包

Webpack 4 下还有一个大改动，就是废弃了 `CommonsChunkPlugin`，引入了 `optimization.splitChunks` 这个选项。
`optimization.splitChunks` 默认是不用设置的。如果 mode 是 production，那 Webpack 4 就会开启 `Code Splitting`。

> 默认 Webpack 4 只会对按需加载的代码做分割。如果我们需要配置初始加载的代码也加入到代码分割中，可以设置 `splitChunks.chunks` 为 'all'。

```
    optimization: {
		splitChunks: {
			chunks: 'all'
		}
	}
```

Webpack 4 的 `Code Splitting` 最大的特点就是配置简单（0 配置起步），和**基于内置规则自动拆分**。内置的代码切分的规则是这样的：

- 新 bundle 被两个及以上模块引用，或者来自 `node_modules`
- 新 bundle 大于 30kb （压缩之前）
- 异步加载并发加载的 bundle 数不能大于 5 个
- 初始加载的 bundle 数不能大于 3 个

简单的说，Webpack 会把代码中的公共模块自动抽出来，变成一个包，前提是这个包大于 30kb，不然 Webpack 是不会抽出公共代码的，因为增加一次请求的成本是不能忽视的。

**更多参考**

- [SplitChunksPlugin 的文档](https://webpack.js.org/plugins/split-chunks-plugin/)
- [ webpack 4: Code Splitting, chunk graph and the splitChunks optimization ](https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366)
