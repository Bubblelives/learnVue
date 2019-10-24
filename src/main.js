import ob from './main2.js';
import _ from 'lodash';
import './style/style.css'; // 引入样式文件
import './style/leo.scss';

console.log(ob.name);

function changeColor() {

    document.getElementById('wp').className = "box";
    document.getElementById('scss').className = 'box2';
}
changeColor();