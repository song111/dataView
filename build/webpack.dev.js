const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const devConfig = {
    mode: 'development',
    output: {
        filename: 'js/[name].js', // 打包后的文件名称
        path: path.resolve('dist'), // 打包后的目录，必须是绝对路径
        publicPath: '/', // 打包的根目录下
    },
    //srouce里面能看到我们写的代码，也能打断点调试代码
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()  // 热更新，热更新不是刷新
    ],
    devServer: {
        contentBase: './dist',  // 开启服务的文件夹
        port: 4000,             // 端口
        open: true,             // 自动打开浏览器
        hot: true,               // 开启热更新
        overlay: true, // 浏览器页面上显示错误
        historyApiFallback: true,
        proxy: { //通过代理解决本地跨域
            '/source': {
                target: 'http://localhost:3003', // 服务端
                changeOrigin: true,
                ws: true
            },
            '/images': {
                target: 'http://localhost:3003', // 服务端
                changeOrigin: true,
                ws: true
            }
        }
    }
}

module.exports = merge(baseConfig, devConfig);