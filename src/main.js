/*
/!*
/!*作为当前项目的入口：最后会把需要用到的模块全部合并打包到这里*!/
import {minus} from './B';
//独立出来
// const $ = require('jquery');
const {plus} = require('./A');
console.log(minus(1,2));
console.log(plus(1,2));
console.log('首页面入口！')*!/
/!*
真实项目中，入口文件中会引入项目所需要的大部分资源
    样式资源
    JS资源
    各种模块
    .....
最后webpack会把对应类型的资源全部合并然后打包在一起（而且是按照依赖关系处理的）
* *!/
import './static/css/reset.min.css';
// import './static/css/iconfont.css';
// import './static/css/index.less';或者
require('./static/css/index.less');
//在JS中动态创建图片
//如果地址是一个外网的绝对地址直接使用即可（编译后地址还是外网地址）
//如果需要设置的是相对地址，则需要基于require把图片导入进来再使用，否则编译后地址是找不到的
let A = require('./images/icon.png');
let image = new Image();
image.src = A;
document.activeElement.appendChild(image);
*/
/*
默认情况下，webpack只是把各板块的代码合并压缩，对于JS并没有做其他的处理
如果代码需要兼容一些低版本浏览器，我们写的代码都ES6代码都需要
* */
/*
@bable/polyfill和其他的webpack加载器和插件不一样，其他的是编译时（编译代码的时候处理），
而ployfill是运行时，是在代码运行的时候，把一些ES7等特殊的语法进行兼容性处理
1.需要安装在生产环境下，因为上线代码运行时也是需要的
    @babel/runtime
    @babel/ployfill
2.需要一个插件的支持
    @babel/plugin-transform-runtime
*
* */
require('@bable/polyfill');
let [a, b] = [10, 20];
console.log(a, b);
