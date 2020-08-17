/*生产环境下的配置项*/

const path = require('path');//node自带的查询绝对路径
module.exports = {
    //设定编译的模式：development/production（默认）
    mode: 'production',
    //设置编译的入口文件(真实项目中一般开发的代码都要放在SRC文件夹下)
    entry: './src/main.js',
    //设置编译的出口文件
    output: {
        //编译后的文件名,[hash]编译的时候会随机在文件名中生成一个唯一的哈希值，以此保证每一次编译出来的文件是不一样的
        filename: 'bundle.[hash].min.js',
        //输出目录(必须是绝对路径)
        path: path.resolve(__dirname, 'build'),
    }
};