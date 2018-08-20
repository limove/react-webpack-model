const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const port = 7000;

module.exports = {
    devtool: '#source-map',
    entry: {
        bundle: path.resolve(__dirname, 'src/index.jsx')
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        chunkFilename: '[name].chunk.js',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('local')
            }
        }),
        /* new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        }), */
        new OpenBrowserPlugin({
            url: `http://localhost:${port}`
        }),
        new HtmlWebpackPlugin({
            title: "project",
            filename: "./index.html",
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
        new BundleAnalyzerPlugin()
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
    },
    devServer: {
        port: port,
        host: '0.0.0.0',
        inline: true,
        hot: true,
        disableHostCheck: true,
        historyApiFallback: {
            index: 'index.html'
        }
    }
}