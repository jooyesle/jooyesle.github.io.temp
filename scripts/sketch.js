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
    if (request.status === 200 || request.status === 201) {
    console.log(request.responseText);
  } else {
    console.error(request.responseText);
  }
  }
}

function draw() {
    image(img, 0, 0);
  
}
