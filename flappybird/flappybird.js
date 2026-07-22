let bird;
let floor;
let birdMidImg;
let background;
let base;

function preload(){
birdMidImg = loadImage("assets/yellowbird-midflap.png");
background = loadImage("assets/background-day.png");
base = loadImage("assets/base.png");

}
function setup() {
  //gravity
  world.gravity.y = 10;
  new Canvas(400, 600);
// make bird
  bird = new Sprite();
  bird.img = birdMidImg;
  bird.width = 30;
  bird.height = 30;
  bird.mass = 2;
  bird.bounciness = 0.5;
  bird.drag = 0.02;
  bird.collider = "dynamic";


  floor = new Sprite();
  floor.img = base;
  floor.width = width;
  floor.height = 125;
  floor.x = width/2;
  floor.y = height - 20;
  floor.collider = "static";


}
function draw() {
  image(background,0,0,width,height);


}