const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
    console.log(1111111111111, env)
    return {
        mode: "development",
        devtool: "inline-source-map",
        devServer: {
            contentBase: "./dist",
            // hot: true
        },
        entry: {
            index: "./src/index.js",
            print: "./src/print.js"
        },
        output: {
            filename: "[name].[contenthash].js",
            path: path.resolve(__dirname, "dist"),
            clean: true
        },
        module: {
            rules: [
                { test: /\.css$/i, use: ["style-loader", "css-loader"] },
                { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource" }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "development"
            })
        ],
        optimization: {
            splitChunks: {
                // chunks: "all",
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all"
                    }
                }
            },
            runtimeChunk: "single",
            moduleIds: "deterministic"
        }
    }
}