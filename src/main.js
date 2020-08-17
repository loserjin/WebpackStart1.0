/*作为当前项目的入口：最后会把需要用到的模块全部合并打包到这里*/
import {minus} from './B';
const {plus} = require('./A');
console.log(minus(1,2));
console.log(plus(1,2));
console.log('首页面入口！')