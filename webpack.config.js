const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const options = {
    //options
};
const { config } = require('webpack');
const dev = process.env.NODE_ENV === 'dev'
const cssLoaders = [
    {
        loader: "css-loader",
        options: {
            importLoaders: 1,
        },
    },
]

if (!dev) {
    cssLoaders.push({
        loader: "postcss-loader",
        options: {
            postcssOptions: {
                plugins: [
                    [
                        "autoprefixer",
                        {
                            // Options
                        },
                    ],
                ],
            },
        },
    })
}

module.exports  = {
    mode: 'development',
    entry: {
        bundle: ['./src/css/main.scss', './src/js/index.js']
    },
    output: {
        filename: dev ? '[name].js' : '[name].[chunkhash:8].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['eslint-loader']
              },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: false,
                }
              },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    ...cssLoaders,
                ]
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    ...cssLoaders,
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpg|gif)$/i,
                ///\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: !dev,
                        }
                    }
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: dev ? '[name].css' : '[name].[contenthash:8].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/public/template.html',
            inject: 'head',
            minify: false,
        })
    ],
};

if (!dev) {
    module.exports.plugins.push(new WebpackManifestPlugin(options))
    module.exports.plugins.push(new CleanWebpackPlugin({
        root: path.resolve('./'),
        dry: false,
        verbose: true,
    }))
}