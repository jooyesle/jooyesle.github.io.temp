let img;

function setup() {
  createCanvas(540, 540);
  img = loadImage('../assets/people.jpg');
}

let skeleton = [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 6], [5, 7], [5, 11], [6, 8],
                             [6, 12], [7, 9], [8, 10], [11, 12], [13, 11], [14, 12], [15, 13], [16, 14]];

let request = new XMLHttpRequest();
let sw = false;

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
    sw = true;
  }
  
}

function draw() {
    image(img, 0, 0);
  
  if(sw){
    let result = JSON.parse(request.response);
    
    for(let key in result){
      fill(random(255), random(255), random(255));
      
      let arr =[];
      for(let val in Object.values(result[key].keypoints)){
        arr.push(val);
      }

      for(let i = 0 ; i < 17 ; i++){
        ellipse(arr[3*i], arr[3*i+1], 10, 10);
        //console.log(arr[3*i]);
      }
      
       for(let i = 0 ; i < 19 ; i++){
         line(arr[3 * skeleton[i][0]], arr[3 * skeleton[i][0] + 1],
              arr[3 * skeleton[i][1]], arr[3 * skeleton[i][1] + 1]);
       }
    }
  }
  
 
 
}
