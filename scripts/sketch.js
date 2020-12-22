let img;

function setup() {
  createCanvas(540, 540);
  img = loadImage('../assets/people.jpg');
}

function preload() {
  let request = new XMLHttpRequest();
  let url = 'https://cv-api.kakaobrain.com/pose';
  request.open('POST', url, true);
  
  request.setRequestHeader('Content-Type', 'multipart/form-data');
  request.setRequestHeader('Authorization', 'KakaoAK 687ea12e4ef2be02334d085696877d60');

}


function draw() {
    //image(img, 0, 0);
  
}
