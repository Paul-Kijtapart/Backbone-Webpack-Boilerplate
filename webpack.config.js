// webpack.common.js
const path = require('path');

// Folders
const SRC = path.join(__dirname, 'src');
const TEST = path.join(__dirname, 'test');

// Tools
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

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
                use: extractSass.extract({
                    fallback: "style-loader", // should be in the fallback only OR ERROR
                    use: [
                        {
                            loader: "css-loader" // translates CSS into CommonJS
                        }, {
                            loader: 'postcss-loader' // autoprefixer
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    fallback: "style-loader", // should be in the fallback only OR ERROR
                    use: [
                        {
                            loader: "css-loader" // translates CSS into CommonJS
                        }, {
                            loader: 'postcss-loader' // autoprefixer
                        }, {
                            loader: "sass-loader" // compiles Sass to CSS
                        }
                    ]
                })
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
        extractSass,
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