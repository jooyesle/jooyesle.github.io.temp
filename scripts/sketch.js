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
  
  request.send('image_url=https%3A%2F%2Fjooyesle.github.io%2Fassets%2Fpeople.jpg');
  
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
}
