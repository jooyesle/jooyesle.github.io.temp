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
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.setRequestHeader('Authorization', 'KakaoAK 687ea12e4ef2be02334d085696877d60');
  
  request.send('image_url=https%3A%2F%2Fjooyesle.github.io%2Fassets%2Fpeople.jpg');
  
  request.onload = function() {
    console.log(request.response);
    let result = JSON.parse(request.response);
    
    foreach(key in Object.keys){
      console.log(result[key].keypoints);
    }
    
    console.log(Object.values(result));
    console.log(Object.keys(result));
}
  }
}


function draw() {
    image(img, 0, 0);
}
