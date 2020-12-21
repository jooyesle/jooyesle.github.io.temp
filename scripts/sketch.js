let img;

function setup() {
  createCanvas(540, 540);
  img = loadImage('../assets/people.jpg');
  
  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest()

  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', 'https://cv-api.kakaobrain.com/pose', true)

  request.onload = function () {
    // Begin accessing JSON data here
    console.log(request.responseText);
  }
}

function draw() {
    image(img, 0, 0);
  
}
