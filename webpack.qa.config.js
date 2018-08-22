const path = require('path');
const webpack = require('webpack');
//配置压缩js
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
//复制html文件到生成目录
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let date = formatTime(new Date(), 'yyyy mm dd hh ff');
date = date.replace(/\s/g, '');

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, 'src/index.jsx'),
        vendor: ['react', 'react-dom', 'react-router', 'react-router-dom']
    },
    output: {
        path: path.join(__dirname, '/dist/chunk'+date),
        publicPath: `./chunk${date}/`,
        chunkFilename: '[name].[chunkhash:5].chunk.js',
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('qa')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        }),
        new uglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }),
        new HtmlWebpackPlugin({
            title: "project",
            filename: "../index.html",
            template: "./public/index.html",
            inject: "body",
            favicon: "",
            minify: {
                caseSensitive: false,
                collapseBooleanAttributes: true,
                collapseWhitespace: true
            },
            hash: true,
            cache: true,
            showErrors: true,
            chunksSortMode: "auto",
            xhtml: false
        }),
        new CopyWebpackPlugin([
          { from: './public', to: '../public' }
        ])
    ],
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader'
            ]
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(gif|jpe?g|png|ico)$/,
            loader: 'url-loader?limit=10000'
        }, {
            test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
            loader: 'url-loader?limit=10000'
        }]
    }
}

function getTime(time, format) {
    const type = format.slice(0, 1);
    let str = '';
    switch (type.toLowerCase()) {
        case 'y':
            str = time.getFullYear();
            break;
        case 'm':
            str = time.getMonth() + 1;
            break;
        case 'd':
            str = time.getDate();
            break;
        case 'h':
            str = time.getHours();
            break;
        case 'f':
            str = time.getMinutes();
            break;
        case 's':
            str = time.getSeconds();
            break;
        default:
            break;
    }
    str = ('0000' + str).slice(-format.length);
    return str;
}

// 格式化时间戳 'yyyy/m-dd hh:ff:ss'
function formatTime(time, format) {
    if (!time) return '';
    time = new Date(time);
    const reg = /[^\w]/g;
    const markArr = format.match(reg);
    const contentArr = format.split(reg);
    let str = [];
    contentArr.forEach((item, index) => {
        index !== 0 && str.push(markArr[index - 1]);
        str.push(getTime(time, contentArr[index]));
    });
    return str.join('');
}
