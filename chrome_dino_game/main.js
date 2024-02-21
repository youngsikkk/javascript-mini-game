const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
let animation;

let jumping = false;
let isCollision = false;

let dinoImage = new Image();
dinoImage.src = "dinosaur.png";
let cactusImage = new Image();
cactusImage.src = "cactus.png";

// 등장 캐릭터 속성
const dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.drawImage(dinoImage, this.x, this.y, this.width, this.height);
  }
}

const checkCollision = function (dino, cactus) {
  const xDifferent = cactus.x - (dino.x + dino.width);
  const yDifferent = cactus.y - (dino.y + dino.height);
  if (xDifferent < 0 && yDifferent < 0) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    cancelAnimationFrame(animation);
  }
}

class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.drawImage(cactusImage, this.x, this.y, this.width, this.height);
  }
}

const cactuses = [];
// https://inpa.tistory.com/entry/%F0%9F%8C%90-requestAnimationFrame-%EA%B0%80%EC%9D%B4%EB%93%9C
let timer = 0;
function moveDino() {
  animation = requestAnimationFrame(moveDino);
  timer += 1;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if (timer%144 === 0) {
    const cactus = new Cactus();
    cactuses.push(cactus);
  }
  cactuses.map((item,idx,arr) => {
    if (item.x < 0) {
      arr.splice(idx,1);
    }
    item.x -= 5;
    item.draw();
    checkCollision(dino, item);
  })
  
  if (jumping) {
     dino.y-=5;
  }
  if (!jumping && dino.y < 200) {
    dino.y += 5;
  }
  if (dino.y < 30) {
    jumping = false;
    dino.y += 5;
  }

  dino.draw();
}

moveDino();

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") jumping = true;
})