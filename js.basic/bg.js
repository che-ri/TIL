const body = document.querySelector("body");

const IMG_NUMBER = 4;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function genRandom() { //사진에 적힌 숫자를 랜덤으로 불러오는 역할
  const number = Math.floor(Math.random() * IMG_NUMBER);//숫자를 랜덤으로 불러옴
  return number;//
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();