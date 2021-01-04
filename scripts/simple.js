
let x, y;

function setup() {
  createCanvas(720, 400);
  background(200);
  x = width / 2;
  y = height;
}

function draw() {
  stroke(50);
  ellipse(x, y, 24, 24);

  x = x + random(-1, 1);
  y = y - 1;
  
  if (y < 0) {
    y = height;
  }
}
