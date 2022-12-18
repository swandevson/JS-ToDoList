const body = document.querySelector('body');

function getRandNum(IMG_NUM) {
  const number = Math.floor(Math.random() * IMG_NUM);

  return number;
}

function handleImgLoad(event) {
  console.log("Background Image is loaded successfully!");

  const imgTag = event.target;
  const IMG_CN = 'bgImg';
  
  imgTag.classList.add(IMG_CN);
  body.prepend(imgTag);
}

function paintBG(num) {
  const img = new Image();
  img.src = `./Background/bg${num + 1}.jfif`;

  img.addEventListener('load', handleImgLoad);
}

function init() {
  const IMG_NUMBER = 3;
  const randNum = getRandNum(IMG_NUMBER);
  
  paintBG(randNum);
}


init();