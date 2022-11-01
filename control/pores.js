let video;
// Previous Frame
let prevFrame;
// How different must a pixel be to be a "motion" pixel
let cap;
let threshold = 100;
let distances = [];
let maxDistance;
let spacer;

var canvas;


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  
  
  maxDistance = dist(width / 2, height / 2, width, height);
  for (let x = 0; x < width; x++) {
    distances[x] = []; // create nested array
    for (let y = 0; y < height; y++) {
      let distance = dist(width / 2, height / 2, x, y);
      distances[x][y] = (distance / maxDistance) * 300;
    }
  }

  spacer = 15;
  
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  // Create an empty image the same size as the video
  prevFrame = createImage(video.width, video.height, RGB);

  cap= createCapture(VIDEO);
  cap.hide();
  imageMode (CENTER);
}

function mousePressed(){
  createP("you are scarying me a bit.");
}
function draw() {
  //background(214,165,135);
  clear();
  video.loadPixels();
  prevFrame.loadPixels();

  let totalMotion = 0;
    // Begin loop to walk through every pixel
    for (let x = 0; x < video.width; x++) {
      for (let y = 0; y < video.height; y++) {
  
        // Step 1, what is the location into the array
        let loc = (x + y * video.width);
        
        // Step 2, what is the previous color
        let r1 = prevFrame.pixels[loc   ]; 
        let g1 = prevFrame.pixels[loc + 1];
        let b1 = prevFrame.pixels[loc + 2];
  
        // Step 3, what is the current color
        let r2 = video.pixels[loc   ]; 
        let g2 = video.pixels[loc + 1];
        let b2 = video.pixels[loc + 2];
  
        // Step 4, compare colors (previous vs. current)
        let diff = dist(r1, g1, b1, r2, g2, b2);
  
        totalMotion += diff;
      }
    }
  
    // Save frame for the next cycle
    if (video.canvas) {
      prevFrame.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height); // Before we read the new frame, we always save the previous frame for comparison!
    }
  
  
    // averageMotion is total motion divided by the number of pixels analyzed.
    let avgMotion = totalMotion / (video.width * video.height); 

  for (let x = 0; x < width; x += spacer) {
    for (let y = 0; y < height; y += spacer) {
      stroke(distances[x][y]);
      fill(59,38,25);
      let r = avgMotion/40;
      
      ellipse(x - spacer/ 2, y - spacer/ 2, r, r/3);
      line (x - spacer/ 2, y - spacer/ 2, (x - spacer/ 2),(y - spacer/ 2)-r*3);
    }
  }
image (cap, mouseX, mouseY, 160, 120);
filter (GRAY);



  // Draw a circle based on average motion
  //noStroke();
  //fill(59,38,25);
  //let r = avgMotion * 2;
 // ellipse(width/2, height/2, r, r);

}