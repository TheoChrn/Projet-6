const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const options = {
    //options
};
const { DefinePlugin } = require('webpack');
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

module.exports = {
    mode: 'development',
    entry: {
        bundle: ['./src/css/main.scss', './src/js/index.js'],
        index: ['./src/css/main.scss', './src/js/home.js'],
        photographer: ['./src/css/main.scss', './src/js/photographer.js','./src/js/validateform.js', './src/js/media.js']
    },
    output: {
        filename: dev ? '[name].js' : '[name].[chunkhash:8].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: 'dist',
        port: 3000,
        open: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime'
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
                test: /\.mp4$/i,
                use: 'file-loader?name=videos/[name].[ext]',
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                loader: 'file-loader'
            },
            {
                test: /\.(jpeg|jpg|png|gif|svg)$/i,
                type: 'asset/resource',
                use: [
                    /*{
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            esModule: false,

                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: !dev,
                        }
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: '[name].[ext]',
                            emitFile: true,
                        }
                    },*/
                ],
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
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "./src/public/assets/images/**/*", to: "./",
                },
            ],
        }),

        new DefinePlugin({
            url: JSON.stringify('https://raw.githubusercontent.com/Volturuss/Projet-6/development_photographer_page-factory/data.json')
        }),
        new MiniCssExtractPlugin({
            filename: dev ? '[name].css' : '[name].[contenthash:8].css',
        }),
        new HtmlWebpackPlugin({
            filename: './profil.html',
            template: './src/public/pages/profil.html',
            inject: 'head',
            minify: false,
            chunks: [
                'media',
                'photographer',
                'sort',
                'validateform'
            ]
        }),
        new HtmlWebpackPlugin({
            template: './src/public/template.html',
            inject: 'head',
            minify: false,
            chunks: [
                'index'
            ]
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