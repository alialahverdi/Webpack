const path = require("path");

const isDevelopment = process.env.NODE_ENV === 'development';

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");


module.exports = {
    mode: isDevelopment ? "development" : "production",
    devServer: {
        /** "open" 
         * opens the browser after server is successfully started
        */
        hot: true,
        /** "hot"
         * enabling and disabling HMR. takes "true", "false" and "only". 
         * "only" is used if enable Hot Module Replacement without page 
         * refresh as a fallback in case of build failures
         */
        open: true
    },
    devtool: isDevelopment ? 'source-map' : undefined,
    entry: path.resolve(__dirname, "src/index.tsx"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.[hash].js"
    },
    resolve: {
        /** "extensions" 
         * If multiple files share the same name but have different extensions, webpack will 
         * resolve the one with the extension listed first in the array and skip the rest. 
         * This is what enables users to leave off the extension when importing
         */
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts", ".json"], // Enable for compinents in react 
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "styles.[hash].css"
        }),
        new CleanWebpackPlugin(),
        isDevelopment && new webpack.HotModuleReplacementPlugin(), // for production remove this line
        isDevelopment && new ReactRefreshWebpackPlugin(), // for production remove this line
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