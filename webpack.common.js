const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
    entry: {
        app: './src/index.ts',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Production',
            template: "./index.html"
        }),
        // new WorkboxPlugin.GenerateSW({
        //     clientsClaim: true,
        //     skipWaiting: true
        // })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            { test: /\.css$/i, use: ["style-loader", "css-loader"] },
            { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource" },
            { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
            { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
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
};