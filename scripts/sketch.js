let img; // static image (1)
let capture; // camera capture
let saveimg; // saved image from camera (2)

let request1 = new XMLHttpRequest(); // (1)
let request2 = new XMLHttpRequest(); // (2)
let done1 = false; // (1)
let done2 = false; // (2)
let step1 = false; // step1 for (2)
let step2 = false; // step2 for (2)

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
    done1 = true;
  };
}

function draw() {
  /* static photo friends.jpeg*/
  if (done1) {
    image(img, 0, 0);
    let result = JSON.parse(request1.response);
    drawSkeleton(result);
    done1 = false;
  }

  /* from camera */
  push();
  translate(800, 0);
  // instructions
  fill(255, 255, 255, 1.0);
  fill(255, 0, 255, 0.5);
  noStroke();
  rect(0, 0, 600, 70, 20, 20, 20, 20);
  translate(0, 30);
  fill(0, 0, 0);
  textSize(32);
  text(" left click to take a photo", 0, 0);
  text(" press 'r' to reset", 0, 30);
  translate(0, 60);
  // print camera
  if (done2) {
    image(saveimg, 0, 0, saveimg.width, saveimg.height);
    let result = JSON.parse(request2.response);
    drawSkeleton(result);
    done2 = false;
    step2 = true;
  } else if (showVideo) {
    image(capture, 0, 0, 600, (600 * capture.height) / capture.width);
  }
  // show process
  translate(0, 500);
  fill(255, 0, 0);
  if (step1) fill(0, 255, 0);
  ellipse(0, 0, 20, 20);
  fill(255, 0, 0);
  if (step2) fill(0, 255, 0);
  ellipse(0, 50, 20, 20);
  translate(30, 0);
  fill(0, 0, 0);
  text("step1) photo --> image storage(imgbb)", 0, 0);
  text("step2) image storage --> Kakao sdk", 0, 50);
  pop();
}

function mousePressed() {
  if (mouseButton == LEFT && done2 == false) {
    showVideo = false;
    saveimg = capture.get(0, 0, 600, (600 * capture.height) / capture.width);

    let imageHostingRequest = new XMLHttpRequest();
    imageHostingRequest.open(
      "POST",
      "https://api.imgbb.com/1/upload?expiration=3600&key=15c781598b3e34982799db6f86a3819f",
      true
    );
    imageHostingRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
    imageHostingRequest.setRequestHeader(
      "Access-Control-Allow-Methods",
      "POST"
    );
    imageHostingRequest.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    saveimg.loadPixels();
    let b64str = saveimg.canvas.toDataURL("image/png").split(";base64,")[1];
    let sendstr = b64str.replaceAll("+", "%2B");
    imageHostingRequest.send("image=" + sendstr);

    imageHostingRequest.onload = function () {
      step1 = true;
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
        done2 = true;
      };
    };
  }
}

function keyPressed() {
  if (key == "r" && done2 == false) {
    showVideo = true;
    step1 = false;
    step2 = false;
  }
}
