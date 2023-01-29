const path = require("path");

const isProd = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html")
        }),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/i,
                exclude: /node_module/,
                use: {
                    loader: "babel-loader",
                    options: {
                        preset: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [isProd ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpe?g|svg|gif|eot|ttf|woff|woff2)$/i,
                type: "asset"
            },
        ]
    }
}