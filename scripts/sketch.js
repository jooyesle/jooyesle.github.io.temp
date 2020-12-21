let img;

function setup() {
  createCanvas(540, 540);
  img = loadImage('../assets/people.jpg');
}

function preload() {
  let url = 'https://cv-api.kakaobrain.com/pose';
  httpDo(
    url,
    {
      method: 'POST',
      // Other Request options, like special headers for apis
      headers: { 'Content-Type': 'multipart/form-data',
                 'Authorization: KakaoAK 687ea12e4ef2be02334d085696877d60'
               },
      form: {
                'file'='@people.jpg'
            }
    },
    function(res) {
      
    }
  );
}


function draw() {
    //image(img, 0, 0);
  
}
