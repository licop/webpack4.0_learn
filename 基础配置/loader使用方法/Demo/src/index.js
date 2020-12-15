import avatar from './op.jpeg';
import './index.scss'

var img = new Image();
img.src = avatar;
img.classList.add('avatar');

var root = document.getElementById('root');
root.append(img);
