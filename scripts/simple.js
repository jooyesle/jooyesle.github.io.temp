
let x, y;
let img;
function setup() {
  createCanvas(1000, 1000);
  frameRate(10);
  img = loadImage("../assets/friends.jpeg");
  x = width / 2;
  y = height;
}

function draw() {
  //background(200);
  image(img, 0, 0); 
  stroke(50);
  ellipse(x, y, 24, 24);

  x = x + random(-1, 1);
  y = y - 1;
  
  if (y < 0) {
    y = height;
  }
}
