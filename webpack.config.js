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
    resolve: {
        /** "extensions" 
         * If multiple files share the same name but have different extensions, webpack will 
         * resolve the one with the extension listed first in the array and skip the rest. 
         * This is what enables users to leave off the extension when importing
         */
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html")
        }),
        new MiniCssExtractPlugin(),
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
                use: "babel-loader"
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