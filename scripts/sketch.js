let img;

function setup() {
  createCanvas(540, 540);
  img = loadImage('../assets/people.jpg');
}

function preload() {
  let request = new XMLHttpRequest();
  let url = 'https://cv-api.kakaobrain.com/pose';
  
  let formData = new FormData();
  
  
  
  request.open('POST', url, true);
  request.setRequestHeader('Content-Type', 'multipart/form-data');
  request.setRequestHeader('Authorization', 'KakaoAK 687ea12e4ef2be02334d085696877d60');
  request.send();
}


function draw() {
    //image(img, 0, 0);
  
}
