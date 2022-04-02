import img from '../image/pic1.png'
import desk from '../image/zhuomian.png'
import addImage from './addImage'
import '../iconfont/iconfont.css'


addImage(img);
addImage(desk);

const app = document.getElementById('app')

const div = document.createElement('div')

div.innerHTML = '<div style="color: red"><span class="iconfont icon-bangonglou"></span></div>'

const p = new Promise((res) => {
  setTimeout(()=>{
    console.log('index.js: 17 >>>>> ', 123)
    res()
  }, 2000)
})

p.then(()=>{
  console.log('index.js: 24 >>>>> ', 456)
})

const abc = [1,2,3,4,5,6,7,8]

if(abc.includes(3)){
  console.log('index.js: 29 >>>>> ', 'abd is includes 3')
}

function* foo() {
  console.log('index.js: 34 >>>>> ', 'foo*')
}

const fo = foo()
fo.next()

app.appendChild(div)
