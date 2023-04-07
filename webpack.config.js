const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const terserPlugin = require('terser-webpack-plugin');
const { cleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports ={
    entry: {
        index: {
            import: './src/index.js',
            dependOn: 'shared',
            },
        another: {
            import: './src/another-module.js',
            dependOn: 'shared',
            },
            shared: 'lodash',
    },
    mode: "production",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    optimization: {
        runtimeChunk: 'single',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@styles': path.resolve(__dirname, 'src/styles')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.html$/,
                use: { 
                    loader: 'html-loader' 
                } 
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new cleanWebpackPlugin(),
    ],  
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new terserPlugin()
        ]
    }
}