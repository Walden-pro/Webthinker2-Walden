let bird;
let floor;
let birdMidImg;
let background;
let base;

function preload(){
birdMidImg = loadImage("flappybird/assets/yellowbird-midflap.png");
background = loadImage("flappybird/assets/background-day.png");
base = loadImage("flappybird/assets/base.png");

}
function setup() {
  new Canvas(400, 600);
  background(250);
  bird = new Sprite();
  bird.img = birdMidImg;
  bird.width = 30;
  bird.height = 30;
  
}
function draw() {



}