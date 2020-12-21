let img;

function setup() {
  createCanvas(540, 540);
  img = loadImage('../people.jpg');
}

function draw() {
    image(img, 0, 0);
}
