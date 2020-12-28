let img;
let capture;
let saveimg;

function setup() {
  createCanvas(1500, 1500);
  img = loadImage('../assets/friends.jpeg');
  
  capture = createCapture(VIDEO);
  capture.hide();
}

let skeleton = [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [5, 6], [5, 7], [5, 11], [6, 8],
                [6, 12], [7, 9], [8, 10], [11, 12], [13, 11], [14, 12], [15, 13], [16, 14]];

function drawSkeleton(Object result){
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
}

let request = new XMLHttpRequest();
let request2 = new XMLHttpRequest();
let sw = false;
let sw2 = false;
let isCaptured = false;

function preload() {
  let url = 'https://cv-api.kakaobrain.com/pose';
  
  request.open('POST', url, true);
  request.setRequestHeader('Access-Control-Allow-Origin', '*');
  request.setRequestHeader('Access-Control-Allow-Methods', 'POST'); 
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.setRequestHeader('Authorization', 'KakaoAK 687ea12e4ef2be02334d085696877d60');
  
  //request.send('image_url='+ encodeURI('https://jooyesle.github.io/assets/people.jpg'));
  request.send('image_url='+ encodeURI('https://jooyesle.github.io/assets/friends.jpeg'));
  
  request.onload = function() {
    sw = true;
  }
  
}

function draw() {
  /*if(isCaptured)
    image(saveimg, 1000, 0, saveimg.width, saveimg.height);
  else
    image(capture, 1000, 0, 600, 600 * capture.height / capture.width);
  */
  if(sw){
    image(img, 0, 0);
  
    let result = JSON.parse(request.response);
    drawSkeleton(result);
    
    
    sw = false;
  }
  
  push();
  translate(800, 0);
  if(sw2){
    image(saveimg, 0, 0, saveimg.width, saveimg.height);

    let result = JSON.parse(request2.response);
     drawSkeleton(result);
    
  }
  else{
    image(capture, 0, 0, 600, 600 * capture.height / capture.width);
  }
  pop();

 
}

function mousePressed() {
  
    if( mouseButton == LEFT) {
      saveimg = capture.get(0, 0, 600, 600 * capture.height / capture.width);
      isCaptured = true;
  
      let req = new XMLHttpRequest();
      req.open('POST', 'https://api.imgbb.com/1/upload?expiration=3600&key=15c781598b3e34982799db6f86a3819f', true);
      req.setRequestHeader('Access-Control-Allow-Origin', '*');
      req.setRequestHeader('Access-Control-Allow-Methods', 'POST');
      req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      saveimg.loadPixels();
      let b64str = saveimg.canvas.toDataURL("image/png").split(';base64,')[1];
      let sendstr = b64str.replaceAll('+', '%2B')
      req.send('image=' + sendstr);
    
      req.onload = function() {
        let result = JSON.parse(req.response);
        console.log(result.data.url);

        let url = 'https://cv-api.kakaobrain.com/pose';
  
        request2.open('POST', url, true);
        request2.setRequestHeader('Access-Control-Allow-Origin', '*');
        request2.setRequestHeader('Access-Control-Allow-Methods', 'POST'); 
        request2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request2.setRequestHeader('Authorization', 'KakaoAK 687ea12e4ef2be02334d085696877d60');
  
        request2.send('image_url='+ encodeURI(result.data.url));
  
        request2.onload = function() {
            sw2 = true;
        }

      }
    }
    
}
