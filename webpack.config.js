const path = require('path');
// 抽取CSS为单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩CSS
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩JS
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//HTML动态引用打包后的文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//清理插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {

    entry: './src/main.js', //入口文件

    mode: 'development',

    output: { //输出

        filename: 'index.js', //输出文件

        path: path.resolve(__dirname, 'dist') //路径

    },
    module: {
        //noParse: function(content) { return /jquery|lodash/.test(content); },
        rules: [{
            test: /\.(c|sc)ss$/, //test:需要匹配的模块后缀名
            use: [MiniCssExtractPlugin.loader,
                    "css-loader", {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: loader => [
                                require('autoprefixer')()
                            ]
                        }
                    }
                ] //对用处理的loader插件名称（顺序从右往左）
        }, {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            include: [path.resolve(__dirname, 'src/')],
            use: ["file-loader", {
                loader: "image-webpack-loader",
                options: {
                    mozjpeg: { progressive: true, quality: 65 },

                    optipng: { enabled: false },

                    pngquant: { quality: '65-90', speed: 4 },

                    gifsicle: { interlaced: false },

                    webp: { quality: 75 }
                }
            }],
        }, {
            test: /.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }],
            exclude: /(node_modules|bower_components)/
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
        new OptimizeCssAssetsPlugin({}), //压缩CSS
        new UglifyJsPlugin({ //压缩JS
            cache: true, //当JS没有变化不压缩
            parallel: true, //是否启动并行压缩
            sourceMap: true //是否启用sourceMap
        }),
        new HtmlWebpackPlugin({
            title: "leo study", //生成文件标题
            filename: "main.html", //最终生成的文件名
            minify: { //压缩选项
                collapseWhitespace: true, //移除空格
                removeComments: true, //移除注释
                removeAttributeQuotes: true //移除双引号
            }
        }),
        new CleanWebpackPlugin()

    ]

}