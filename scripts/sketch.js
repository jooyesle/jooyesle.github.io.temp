let img;
let capture;
let saveimg;

function setup() {
  createCanvas(1200, 1200);
  img = loadImage('../assets/people.jpg');
  
  capture = createCapture(VIDEO);
  capture.hide();
}

let skeleton = [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [5, 6], [5, 7], [5, 11], [6, 8],
                [6, 12], [7, 9], [8, 10], [11, 12], [13, 11], [14, 12], [15, 13], [16, 14]];

let request = new XMLHttpRequest();
let sw = false;
let isCaptured = false;

function preload() {
  let url = 'https://cv-api.kakaobrain.com/pose';
  
  request.open('POST', url, true);
  request.setRequestHeader('Access-Control-Allow-Origin', '*');
  request.setRequestHeader('Access-Control-Allow-Methods', 'POST'); 
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.setRequestHeader('Authorization', 'KakaoAK 687ea12e4ef2be02334d085696877d60');
  
  request.send('image_url='+ encodeURI('https://jooyesle.github.io/assets/people.jpg'));
  
  request.onload = function() {
    sw = true;
  }
  
}

function draw() {
  if(isCaptured)
    image(saveimg, 600, 0, 600, 600 * capture.height / capture.width);
  else
    image(capture, 600, 0, 600, 600 * capture.height / capture.width);
  
  if(sw){
    image(img, 0, 0);
  
    let result = JSON.parse(request.response);
    
    for(let key in result){
      fill(random(255), random(255), random(255));
      
      let arr =Object.values(result[key].keypoints);
      
      for(let i = 0 ; i < arr.length/3 ; i++){
        ellipse(arr[3*i], arr[3*i+1], 10, 10);
      }
      
       for(let i = 0 ; i < skeleton.length ; i++){
         line(arr[3 * skeleton[i][0]], arr[3 * skeleton[i][0] + 1],
              arr[3 * skeleton[i][1]], arr[3 * skeleton[i][1] + 1]);
       }
    }
    
    sw = false;
  }
 
}

function mousePressed() {
    saveimg = capture.get(0, 0, 600, 600 * capture.height / capture.width);
    isCaptured = true;
    console.log(canvas.toDataURL());
    //saveimg.save('../assets/photo', 'jpg');
  
  let req = new XMLHttpRequest();
  req.open('POST', 'https://api.imgbb.com/1/upload?expiration=600&key=15c781598b3e34982799db6f86a3819f', true);
  req.setRequestHeader('Access-Control-Allow-Origin', '*');
  req.setRequestHeader('Access-Control-Allow-Methods', 'POST'); 
  req.send('image='+ canvas.toDataURL("image/jpeg").split(';base64,')[1]);
  console.log(canvas.toDataURL("image/jpeg").split(';base64,')[1]);
  
  req.onload = function() {
    console.log(req.response);
  }
}
