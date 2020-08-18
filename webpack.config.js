const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//配置多页面模板
const htmlPlugins = ['index', 'login'].map(item => {
    return new htmlWebpackPlugin({
        template: `./public/${item}.html`,
        filename: `${item}.html`,
        chunks: ['index'],
        hash: true,
        minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true
        }
    })
});
module.exports = {
    mode: 'development',
    entry: {
        index: "./src/main.js",
        login: "./src/login.js",
    },
    //设置编译的出口文件
    output: {
        filename: '[name].[hash].min.js',
        path: path.resolve(__dirname, 'build'),
    },
    devServer: {
        port: '3000',
        compress: true,
        contentBase: path.resolve(__dirname, "build"),
        open: true,
        hot: true,
    },
    //配置WEBPACK的优化项
    optimization: {
        //设置压缩方式
        minimizer: [
            new OptizeCssAssetsWebpackPlugin(),
            new TerserPlugin(),
        ]
    },
    //配置webpack的插件
    plugins: [
        ...htmlPlugins,
        new CleanWebpackPlugin(),
        //抽离CSS到单独的文件
        new MiniCssExtractPlugin({
            filename: '[name].[hash].min.css',
        })
    ],
    //配置webpack的加载器loader
    module: {
        //设置规则和处理方案：默认执行顺序：从右到左，从下向上
        rules: [{
            //匹配哪些文件基于正则处理（此处是处理css/less文件）
            test: /\.(css|less)$/i,
            use: [
                // "style-loader",//把处理好的CSS插入到页面中(内嵌式插入)
                MiniCssExtractPlugin.loader, //(外联CSS文件)
                "css-loader",//处理@import/URL这种语法
                "postcss-loader",//设置css前缀（处理兼容，需要搭配autoprofixer一起使
                // 用，需要额外再配置一些信息）
                "less-loader",//把less编译为CSS
                //也可以像下面那样用
                // {
                //     loader: "less-loader",
                //     options: {
                //         //加载器额外的配置
                //     }
                // }
            ],
            //指定哪些目录下的css我们才处理
            include: path.resolve(__dirname, 'src'),
            //忽略哪些目录下的css我们不处理
            exclude: /node_modules/
        },
            /*    {
                test: /\.(png|jpe?g|gif|icon|bmp)$/i,
                use: [{
                    //把指定大小范围内的图片进行base64处理
                    //不在指定范围内的采用file-loader进行处理
                    loader: 'url-loader',
                    options: {
                        limit: 200*1024,
                        outputPath: '/images',
                        // name: '[name].[ext]'
                    }
                }],
            },*/
            //像下面这样用file-loader处理也可以
            {
                //图片处理 file-loader就是编译图片的加载器
                test: /\.(png|jpe?g|gif|icon|bmp)$/i,
                use: [{
                    //url-loader在编译的时候会把符合条件的图片进行base64处理，
                    //对于不符合条件的还是继续使用file-loader处理
                    loader: 'url-loader',
                    options: {
                        limit: 200 * 1024,
                        //在编译的时候把图片都放在统一的images文件夹下
                        outputPath: '/images',
                        //
                        name: '[name].[hash].[ext]',
                        //忽略esmodule語法
                        esModule: false
                    }
                }]
            },
            {
                //字体图标的处理
                test: /\.(svg|eot|ttf|woff|woff2)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        //放在images下，这样可以不写outputPath
                        name: 'images/[name].[hash].[ext]',
                        esModule: false
                    }
                }]
            }, {
                //处理编译html页面中的图片，把其按照上述图片的处理机制处理：html-withimg-loader
                test: /\.html$/i,
                use: ['html-withimg-loader']
            }, {
                test: /\.(js)$/i,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            //把ES6转为ES5
                            "@babel/preset-env"
                        ],
                        //基于插件处理ES6/ES7中的特殊语法
                        plugins: [
                            //类的装饰器，ES7中的语法
                            ["@babel/plugin-proposal-decorators",{
                                "legacy": true
                            }],
                            //类中设置属性的
                            ["@babel/plugin-proposal-class-properties",{
                            "loose": true
                            }],
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                },"eslint-loader"],//"eslint-loader"开启语法检测
                include: path.resolve(__dirname, 'src'),
                exclude: '/node_modules/'
            }],
    }
};