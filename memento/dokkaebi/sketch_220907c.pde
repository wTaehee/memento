PImage a;
PImage b;


int num = 150;
float mx[] = new float[num];
float my[] = new float[num];

void setup() {
  size(1920,1080);
  background(127);
  a= loadImage("windows-wallpaper.jpg");
  b= loadImage("folder.png");

  noStroke();
  fill(255, 153); 

}  

void draw(){
  if (mousePressed) {
    image(a,0,0,a.width/2, a.height/2);
  } else {
    stroke(0);
  }
  image(a,0,0,a.width/2, a.height/2);


 
  
   int which = frameCount % num;
  mx[which] = mouseX;
  my[which] = mouseY;
  
  for (int i = 0; i < num; i++) {

    int index = (which+1 + i) % num;
    image(b, mx[index], my[index], i+20, i+20);

}
}
