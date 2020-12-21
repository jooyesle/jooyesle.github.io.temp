let img;

function setup() {
  createCanvas(540, 540);
  img = loadImage('../assets/people.jpg');
  
  function postRequest() { 
   
  // Do a POST request to the test API 
  let api_url = 'https://cv-api.kakaobrain.com/pose/job'; 
   
  // Example POST data 
  let postData = { Content-Type: multipart/form-data,
                  Authorization: KakaoAK 687ea12e4ef2be02334d085696877d60, 
                  file: ../assets/people.jpg }; 
   
  httpPost(api_url, 'json', postData, function (response) { 
    console.log(response.area); 
  }); 
} 
}

function draw() {
    //image(img, 0, 0);
  
}
