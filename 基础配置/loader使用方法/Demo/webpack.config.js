const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.(jpe?g|png|gif)$/i,
            use: {
                loader: 'url-loader',
                options: {
                    // 占位符
                    name: 'image/[contenthash].[ext]',
                }
            }     
        }, {
            test: /\.scss$/i,
            use: [
                'style-loader', 
                {
                    loader: 'css-loader',
                    options: {
                        // 处理scss文件里引入其他scss文件，引入的scss文件也要走两个loader
                        importLoaders: 2
                    }
                },
				'sass-loader',
				'postcss-loader'
            ]
        }]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}