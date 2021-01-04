let img; // static image (1)

let request1 = new XMLHttpRequest(); // (1)
let done1 = false; // (1)

let kakao_url = "https://cv-api.kakaobrain.com/pose";

function setup() {
  createCanvas(1500, 1500);
  frameRate(10);

  img = loadImage("../assets/friends.jpeg");
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
  stroke(0);
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
  image(img, 0, 0);
  if (done1) {
    let result = JSON.parse(request1.response);
    drawSkeleton(result);
    noLoop();
  }

}
