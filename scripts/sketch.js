let img;

function setup() {
  createCanvas(540, 540);
  img = loadImage('../assets/people.jpg');
}

let request = new XMLHttpRequest();

function preload() {
  let url = 'https://cv-api.kakaobrain.com/pose';
  
  request.open('POST', url, true);
  request.setRequestHeader('Access-Control-Allow-Origin', '*');
  request.setRequestHeader('Access-Control-Allow-Methods', 'POST'); 
  request.setRequestHeader('Content-Type', 'multipart/form-data');
  request.setRequestHeader('Authorization', 'KakaoAK 687ea12e4ef2be02334d085696877d60');
  
  let formdata = new FormData();
  formdata.append('image', document.getElementById('source_img').files[0], 'people.jpg');
  request.send(formdata);
}


function draw() {
    image(img, 0, 0);
    console.log(request.response);
  
}
