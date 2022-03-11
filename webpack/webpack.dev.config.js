var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var parentDir = path.join(__dirname, '../')
var appDir = path.join(__dirname, '../src/')

module.exports = {
    mode: "development",
    devtool: "#eval-source-map",
    entry: [
        path.join(__dirname, '../src/index.js'),
    ],
    module: {
        rules: [
            {
                test:/\.jsx?$/,
                include: appDir,
                exclude: /node_modules/,
                use: [{loader: 'babel-loader'}]
            },
            {
                test: /\.css$/,
                include: appDir,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: appDir,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new webpack.LoaderOptionsPlugin({debug: true})
    ]
}
