/*编写自定义的webpack配置项，以后webpack打包编译的时候按照自己配置的内容
* 进行打包编译处理（这个文件放置在项目的根目录下）
*   文件名：webpack.config.js/webpackfile.js
* 1.webpack本身是基于node开发的，所以配置项的模块处理规则参考CommonJS规范来完成*/
const path = require('path');//node自带的查询绝对路径
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} =  require('clean-webpack-plugin');
// console.log(path.resolve(_dirname,'build);
module.exports = {
    //设定编译的模式：development/production（默认）
    //为production： filename: 'bundle.min.js',
    mode: 'production',
    //设置编译的入口文件(真实项目中一般开发的代码都要放在SRC文件夹下)
    entry: './src/main.js',
    //设置编译的出口文件
    output: {
        //编译后的文件名,[hash]编译的时候会随机在文件名中生成一个唯一的哈希值，以此保证每一次编译出来的文件是不一样的
        filename: 'bundle.[hash].min.js',
        //输出目录(必须是绝对路径)
        path: path.resolve(__dirname,'build'),
    },
    //在webpack中使用插件
    plugins:[
        /*配置指定的HTML页面模版（后期在编译的时候会把编译好的资源文件自动导入到
        我们的页面模板中）*/
        new htmlWebpackPlugin({
            //模版的路径
            template: "./public/index.html",
            //编译后生成的文件名
            filename: "index.html",
            //是否把编译的资源文件导入到页面中，
            // 设置HASH值（清强缓存，和output设置HSASH值是一样的）
            hash: true,
            //把模版中的HTML代码也进行压缩编译（配置规则）
            minify: {
                //把所有的空格去掉
                collapseWhitespace: true,
                //去掉注释
                removeComments: true,
                //把所有的索引号去掉
                removeAttributeQuotes: true,
                //去除空的属性
                removeEmptyAttributes: true
            }
        }),
        //每一次打包都把之前打包的清空
        // new CleanWebpackPlugin()
    ]
};