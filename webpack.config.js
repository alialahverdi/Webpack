const path = require("path");

const isDevelopment = process.env.NODE_ENV === 'development';

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");


module.exports = {
    mode: isDevelopment ? "development" : "production",
    devServer: {
        hot: true,
        open: true
    },
    target: "web",
    entry: path.resolve(__dirname, "src/index.tsx"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.[hash].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "bundle.[hash].css"
        }),
        // isDevelopment && new webpack.HotModuleReplacementPlugin(), // for production remove this line
        // isDevelopment && new ReactRefreshWebpackPlugin(), // for production remove this line
    ],
    module: {
        /** "rules"
         * This says - "Hey webpack compiler, when you come across a path that resolves to a '.js or .jsx' 
         * file inside of a require()/import statement, use the babel-loader to transform it before you 
         * add it to the bundle. And in this process, kindly make sure to exclude node_modules folder from 
         * being searched"
         */
        rules: [
            {
                test: /\.(js|ts)x?$/i,
                exclude: /node_module/,
                use: {
                    loader: require.resolve("babel-loader"),
                    options: {
                        plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader, {
                    loader: "css-loader",
                    options: { modules: true }
                }]
            },
            {
                test: /\.(png|jpe?g|svg|gif|eot|ttf|woff|woff2)$/i,
                type: "asset"
            },
        ]
    }
}