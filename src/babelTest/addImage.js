import style from "./index.less";

console.log('addImage.js: 3 >>>>> ', style)

const appNode = document.getElementById('app')


export default function addImage(img){
  const Img = document.createElement('img')

  Img.src = img

  Img.classList.add(style['image-test'])

  appNode.appendChild(Img)

}
