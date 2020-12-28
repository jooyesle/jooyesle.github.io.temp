let img;
let capture;
let saveimg;
let request1 = new XMLHttpRequest();
let request2 = new XMLHttpRequest();
let sw1 = false;
let sw2 = false;
let showVideo = true;
let kakao_url = "https://cv-api.kakaobrain.com/pose";

function setup() {
  createCanvas(1500, 1500);
  img = loadImage("../assets/friends.jpeg");

  capture = createCapture(VIDEO);
  capture.hide();
}

function drawSkeleton(result) {
  let skeleton = [
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 3],
    [2, 4],
    [5, 6],
    [5, 7],
    [5, 11],
    [6, 8],
    [6, 12],
    [7, 9],
    [8, 10],
    [11, 12],
    [13, 11],
    [14, 12],
    [15, 13],
    [16, 14],
  ];
  for (let key in result) {
    fill(random(255), random(255), random(255));
    let arr = Object.values(result[key].keypoints);

    for (let i = 0; i < arr.length / 3; i++) {
      ellipse(arr[3 * i], arr[3 * i + 1], 10, 10);
    }

    for (let i = 0; i < skeleton.length; i++) {
      line(
        arr[3 * skeleton[i][0]],
        arr[3 * skeleton[i][0] + 1],
        arr[3 * skeleton[i][1]],
        arr[3 * skeleton[i][1] + 1]
      );
    }
  }
}

function preload() {
  request1.open("POST", kakao_url, true);
  request1.setRequestHeader("Access-Control-Allow-Origin", "*");
  request1.setRequestHeader("Access-Control-Allow-Methods", "POST");
  request1.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  request1.setRequestHeader(
    "Authorization",
    "KakaoAK 687ea12e4ef2be02334d085696877d60"
  );

  request1.send(
    "image_url=" + encodeURI("https://jooyesle.github.io/assets/friends.jpeg")
  );

  request1.onload = function () {
    sw1 = true;
  };
}

function draw() {
  if (sw1) {
    image(img, 0, 0);
    let result = JSON.parse(request1.response);
    drawSkeleton(result);
    sw1 = false;
  }

  push();
  translate(800, 0);
  if (sw2) {
    image(saveimg, 0, 0, saveimg.width, saveimg.height);
    let result = JSON.parse(request2.response);
    drawSkeleton(result);
    sw2 = false;
  } else if (showVideo) {
    image(capture, 0, 0, 600, (600 * capture.height) / capture.width);
  }
  
  translate(0, 600);
  ellipse(0, 0, 20, 20);
  ellipse(0, 50, 20, 20);
  
  translate(50, 0);
  fill(255, 255, 255);
  textSize(32);
  text('sending photo to database', 0, 0);
  text('sending image from database to Kakao sdk', 0, 50);
  pop();
}

function mousePressed() {
    if (mouseButton == LEFT) {
        showVideo = false;
        saveimg = capture.get(0, 0, 600, (600 * capture.height) / capture.width);

        let imageHostingRequest = new XMLHttpRequest();
        imageHostingRequest.open(
        "POST",
        "https://api.imgbb.com/1/upload?expiration=3600&key=15c781598b3e34982799db6f86a3819f",
        true
        );
        imageHostingRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
        imageHostingRequest.setRequestHeader("Access-Control-Allow-Methods", "POST");
        imageHostingRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        saveimg.loadPixels();
        let b64str = saveimg.canvas.toDataURL("image/png").split(";base64,")[1];
        let sendstr = b64str.replaceAll("+", "%2B");
        imageHostingRequest.send("image=" + sendstr);

        imageHostingRequest.onload = function () {
            request2.open("POST", kakao_url, true);
            request2.setRequestHeader("Access-Control-Allow-Origin", "*");
            request2.setRequestHeader("Access-Control-Allow-Methods", "POST");
            request2.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
            );
            request2.setRequestHeader(
                "Authorization",
                "KakaoAK 687ea12e4ef2be02334d085696877d60"
            );
        let result = JSON.parse(imageHostingRequest.response);
        request2.send("image_url=" + encodeURI(result.data.url));

        request2.onload = function () {
            sw2 = true;
        };
        };
    }
    if(mouseButton == RIGHT){
        showVideo = true;
  }
}
