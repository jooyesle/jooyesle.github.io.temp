let img;

function setup() {
  createCanvas(540, 540);
  img = loadImage('../assets/people.jpg');
  
  function postRequest() { 
   
  // Do a POST request to the test API 
  let api_url = 'https://reqres.in/api/users'; 
   
  // Example POST data 
  let postData = { id: 1, name: "Sam", 
                  email: "sam@samcorp.com" }; 
   
  httpPost(api_url, 'json', postData, function (response) { 
    text("Data returned from API", 20, 100); 
   
    text("The ID in the data is: "
         + response.id, 20, 140); 
    text("The Name in the data is: " 
         + response.name, 20, 160); 
    text("The Email in the data is: " 
         + response.email, 20, 180); 
  }); 
} 
}

function draw() {
    //image(img, 0, 0);
  
}
