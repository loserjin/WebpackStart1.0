const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} =  require('clean-webpack-plugin');
//配置多页面模板
const htmlPlugins=['index','login'].map(item=>{
    return  new htmlWebpackPlugin({
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
        path: path.resolve(__dirname,'build'),
    },
    devServer: {
        port: '3000',
        compress: true,
        contentBase: path.resolve(__dirname, "build"),
        open: true,
        hot: true,
    },
    //配置webpack的插件
    plugins:[
        ...htmlPlugins,
        new CleanWebpackPlugin()
    ],
    //配置webpack的加载器loader
    module: {
        //设置规则和处理方案：默认执行顺序：从右到左，从下向上
        rules: [{
            //匹配哪些文件基于正则处理（此处是处理css/less文件）
            test: /\.(css|less)$/i,
            use: [
                "style-loader",//把处理好的CSS插入到页面中
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
            ]
        }],
    }
};