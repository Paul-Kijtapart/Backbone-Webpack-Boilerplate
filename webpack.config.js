// webpack.common.js
const path = require('path');

// Folders
const SRC = path.join(__dirname, 'src');
const TEST = path.join(__dirname, 'test');

// Tools
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    /**
     * - one entry point per HTML page
     * - Babel-polyfill need to be run before your source code ( allow better work in IE 11)
     * - Only one polyfill is allowed per HTML page
     *
     *  How to use?
     *  e.g. test: path.join(SRC, "styles", "test.scss"), // prefer absolute path
     */
    entry: path.join(SRC, "main.js"),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader', // inject CSS to page
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    }
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader', // inject CSS to page
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': SRC,
        }
    },
    performance: {
        hints: false
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Development',
            template: "./index.html"
        })
    ],
    // Dev,
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        contentBase: "./dist"
    }
};