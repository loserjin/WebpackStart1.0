/*编写自定义的webpack配置项，以后webpack打包编译的时候按照自己配置的内容
* 进行打包编译处理（这个文件放置在项目的根目录下）
*   文件名：webpack.config.js/webpackfile.js
* 1.webpack本身是基于node开发的，所以配置项的模块处理规则参考CommonJS规范来完成*/
const path = require('path');//node自带的查询绝对路径
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} =  require('clean-webpack-plugin');
//配置多页面模板
const htmlPlugins=['index','login'].map(item=>{
    return  new htmlWebpackPlugin({
        //模版的路径
        template: `./public/${item}.html`,
        //编译后生成的文件名
        filename: `${item}.html`,
        //chunks: ['index','jquery'],//指定当前页面的依赖项
        chunks: ['index'],
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
    })
});
// console.log(path.resolve(_dirname,'build);
module.exports = {
    //设定编译的模式：development/production（默认）
    //为production： filename: 'bundle.min.js',
    mode: 'development',
    //设置编译的入口文件(真实项目中一般开发的代码都要放在SRC文件夹下)
    // entry: './src/main.js',//单入口
    //多入口，基于key:value
    entry: {
        index: "./src/main.js",
        login: "./src/login.js",
        //如果不想把JQ合并在其他的JS中，想独立打包出来(多个页面公共的部分我们
        // 可以独立打包出来)
        // jquery: 'jquery'
    },
    //设置编译的出口文件
    output: {
        //编译后的文件名,[hash]编译的时候会随机在文件名中生成一个唯一的哈希值，以此保证每一次编译出来的文件是不一样的
        //[name]：多入口配置的属性名index/login
        filename: '[name].[hash].min.js',//指定页面的依赖
        //输出目录(必须是绝对路径)
        path: path.resolve(__dirname,'build'),
    },
    //配置DEV-SERVER，编译后的结果放在计算机内存中，并不会像之前的webpack命令一样，
    //把编译后的东西放在build下，dev-server仅仅是在开发模式下，随时编译并且预览，项
    // 目要部署的时候，还是需要基于webpack编译打包的
    devServer: {
        //在哪个端口号运行
        port: '3000',
        //开启GZIP压缩
        compress: true,
        //指定资源访问的路径
        contentBase: path.resolve(__dirname, "build"),
        //自动打开浏览器
        open: true,
        //开启热更新
        hot: true,
        //Proxy跨域代理(对象)
        // proxy: {
        //     '/':'127.0.0.1:8000'
        // }

    },
    //在webpack中使用插件
    plugins:[
        /*配置指定的HTML页面模版（后期在编译的时候会把编译好的资源文件自动导入到
        我们的页面模板中）*/
        ...htmlPlugins,
        //每一次打包都把之前打包的清空
        new CleanWebpackPlugin()
    ]
};