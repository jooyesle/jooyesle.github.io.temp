let img;

function setup() {
  createCanvas(540, 540);
  img = loadImage('../assets/people.jpg');
}

function preload() {
  let request = new XMLHttpRequest();
  let url = 'https://cv-api.kakaobrain.com/pose';
  
  request.open('POST', url, true);
  request.setRequestHeader('Access-Control-Allow-Origin', '*');
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.setRequestHeader('Authorization', 'KakaoAK 687ea12e4ef2be02334d085696877d60');
  request.send('image_url=https%3A%2F%2Fi.ytimg.com%2Fvi%2FLXwvSAzEfmQ%2Fmaxresdefault.jpg');
}


function draw() {
    //image(img, 0, 0);
  
}
