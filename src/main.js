/*
/!*作为当前项目的入口：最后会把需要用到的模块全部合并打包到这里*!/
import {minus} from './B';
//独立出来
// const $ = require('jquery');
const {plus} = require('./A');
console.log(minus(1,2));
console.log(plus(1,2));
console.log('首页面入口！')*/
/*
真实项目中，入口文件中会引入项目所需要的大部分资源
    样式资源
    JS资源
    各种模块
    .....
最后webpack会把对应类型的资源全部合并然后打包在一起（而且是按照依赖关系处理的）
* */
import './static/css/reset.min.css';
// import './static/css/index.less';或者
require('./static/css/index.less');