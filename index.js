/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
let mouse = {
  x: 0,
  y: 0,
  pressed: false,
};
let movers = [];
let canvasPos = canvas.getBoundingClientRect();

// for (let i = 0; i < 60; i++) {
//   let x = Math.random() * canvas.width;
//   let y = Math.random() * canvas.height;
//   let m = 20;
//   let vx = 0;
//   let vy = 0;

//   movers[i] = new Mover(x, y, m, vx, vy);
// }

movers[0] = new Mover(50, 200, 5, 0.9, -0.9);
movers[1] = new Mover(200, 50, 5, 0.9, 0.9);
movers[2] = new Mover(200, 350, 5, -0.9, -0.9);
movers[3] = new Mover(350, 200, 5, -0.9, 0.9);
movers[4] = new Mover(200, 200, 8, 0, 0);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "rgba(0,0,0, 0.01)";
  // ctx.rect(0, 0, canvas.width, canvas.height);
  // ctx.fill();
  

  for (let mover of movers) {
    for (let other of movers) {
      if (mover != other) {
        mover.attract(other);
      }
    }
  }

  for (let mover of movers) {
    mover.update();
    mover.draw();

    //mover.edges()
  }

  requestAnimationFrame(animate);
  //console.log(mouse.pressed);
}
animate();

canvas.addEventListener("mousedown", (e) => {
  // console.log(mouse.x, mouse.y);
  mouse.pressed = true;
  // mouse.x = e.x - canvasPos.left;
  // mouse.y = e.y - canvasPos.top;
});
canvas.addEventListener("mouseup", (e) => {
  // console.log(mouse.x, mouse.y);
  mouse.pressed = false;
  // mouse.x = e.x - canvasPos.left;
  // mouse.y = e.y - canvasPos.top;
});

window.addEventListener("resize", (e) => {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
  mouse.x = e.x - canvasPos.left;
  mouse.y = e.y - canvasPos.top;
});
