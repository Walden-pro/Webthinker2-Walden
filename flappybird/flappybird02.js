let bird;
let floor;
let birdMidImg;
let background;
let base;
let pipeGroup;
let pipe;
let bottomPipe;

function preload(){
birdMidImg = loadImage("assets/yellowbird-midflap.png");
background = loadImage("assets/background-day.png");
base = loadImage("assets/base.png");
birdDownImg = loadImage("assets/yellowbird-downflap.png");
birdUpImg = loadImage("assets/yellowbird-upflap.png");
pipe = loadImage("assets/pipe-green.png");

}
function setup() {
  
  new Canvas(400, 600);

//gravity
  world.gravity.y = 10;

// debug text
  fill("#fc0303")
  textSize(14)

// make bird
  bird = new Sprite();
  bird.img = birdMidImg;
  bird.width = 30;
  bird.height = 30;
  bird.mass = 2;//heavyness
  bird.bounciness = 0.5;//higher is bouncier
  bird.drag = 0.02;//air resistance
  bird.collider = "dynamic";//collidable, movable and affected by physics

//make floor
  floor = new Sprite();
  floor.img = base;
  floor.width = width;
  floor.height = 125;
  floor.x = width/2;
  floor.y = height - 20;
  floor.collider = "static";//collidable but will not move

  pipeGroup = new Group();
}
function draw() {
  image(background,0,0,width,height);

  if(kb.presses ("space") || mouse.presses("left")){
    bird.sleeping = false;// make sure no sprite is not idle
    bird.vel.y = -5; //Up velocity
  }

  text("vel.y " + bird.vel.y.toFixed(2),10,20); // (text,x,y)
  text("isMoving:" + bird.isMoving,10,40);
  text("Sleeping:" + bird.isMoving,10,60);

  if (bird.vel.y < -1){
    bird.img = birdUpImg;
    bird.rotation = -30;
  }
  else if (bird.vel.y > 1){
    bird.img = birdDownImg;
    bird.rotation = 30;
  }
  else {
    bird.img = birdMidImg;
    bird.rotation = 0;
  }
  if (frameCount === 1){
    spawnPipePair();
  }
}
function spawnPipePair(){
let gap = 50;
let midY = height / 2;

bottomPipe = new Sprite(400, midY + gap / 2 + 200, 52,320,'static')
bottomPipe.img = pipe;

pipeGroup.add(bottomPipe);

}


