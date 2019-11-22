const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ["@babel/polyfill",'./src/index.js'],
    output: {
        filename: 'bundle.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      },
    plugins:[
        new MiniCssExtractPlugin({
            filename: 'bundle.min.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ]
                    }
                }
            },
            {
                test: /\.(sc|c|sa)ss$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",//convert css to js
                    {
                        loader: "postcss-loader",//actions on compiled css
                        options:{
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    "sass-loader"//convert scss to css
                ]
            }
        ]
    },
    devServer: {
        port: 9090,
        open: true,
        hot: true,
        publicPath: '/dist/',
        contentBase: [
            path.join(__dirname, 'views'),
        ],
        watchContentBase: true,
    }
};