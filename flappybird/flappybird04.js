let bird;
let floor;
let birdMidImg;
let background;
let base;
let pipeGroup;
let pipe;
let bottomPipe;
let topPipe;
let gameOverImg;
let gameOverLabel;
let startScreenLabel;
let startScreenImg;
let startGame = false;
let score = 0;
let numberImages = [];
let scoreDigits;

function preload(){
  birdMidImg = loadImage("assets/yellowbird-midflap.png");
  background = loadImage("assets/background-day.png");
  base = loadImage("assets/base.png");
  birdDownImg = loadImage("assets/yellowbird-downflap.png");
  birdUpImg = loadImage("assets/yellowbird-upflap.png");
  pipe = loadImage("assets/pipe-green.png");
  gameOverImg = loadImage("assets/gameover.png");
  startScreenImg = loadImage("assets/message.png");
  for (let i = 0; i <10;i++){
    numberImages[i] = loadImage('assets/' + i + '.png');
  }
}
function setup() {
  
  new Canvas(400, 600);

//gravity
  world.gravity.y = 13;

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
  bird.collider = "static";//collidable, movable and affected by physics

//make floor
  floor = new Sprite();
  floor.img = base;
  floor.width = width;
  floor.height = 125;
  floor.x = width/2;
  floor.y = height - 20;
  floor.collider = "static";//collidable but will not move

  pipeGroup = new Group();
  startScreenLabel = new Sprite(width/2, height/2, 50, 50,'none');
  startScreenLabel.img = startScreenImg;
  bird.visible = false;
//setup group for score
  scoreDigits = new Group();
  scoreDigits.collider = 'none';
  scoreDigits.layer = 1000;
  
  
}
function draw() {
  image(background,0,0,width,height);
  if(kb.presses ("space") || mouse.presses("left")){
    bird.visible = true;
    bird.collider = 'dynamic';
    startGame= true;
    startScreenLabel.visible = false;

    
  }
  if (startGame){
      
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
  bird.x += 3;//make birds move forwards
  camera.x = bird.x;//lock the camera to the bird postion
  floor.x = bird.x;//lock the bird in the position

  if (frameCount % 90 === 0){//change the pipe to spawn slower. 60 frames is one second.
    spawnPipePair();
  }
  for (let pipe of pipeGroup){
    if (pipe.x < -50){
      pipe.remove();
    }
  }
  if (bird.collides(pipeGroup)|| bird.collides(floor)|| bird.y < -30){
    gameOverLabel = new Sprite(width/2,height / 2, 192,42,'none');
    gameOverLabel.img = gameOverImg;
    gameOverLabel.layer = 100;
    gameOverLabel.x = camera.x;
    noLoop();
  }
  for (let pipe of pipeGroup){
    let pipeRightEdge = pipe.x + pipe.w /2;
    let birdLeftEdge = bird.x - bird.w /2;
    if (pipe.passed == false && pipeRightEdge <birdLeftEdge){
      pipe.passed = true;
      score++;
    }
  }
  drawScore(width/2,20,score,24,36);
  }
  


}
function spawnPipePair(){
  let gap = 50;
  let midY = random(250, height - 250);

  bottomPipe = new Sprite(bird.x + 400, midY + gap / 2 + 200, 52,320,'static');
  bottomPipe.img = pipe;

  pipeGroup.add(bottomPipe);
  pipeGroup.layer = 0;

  topPipe = new Sprite (bird.x + 400, midY - gap / 2 - 200,52,320, 'static');
  topPipe.img = pipe;
  topPipe.rotation = 180;
  topPipe.passed = false;
  pipeGroup.add(topPipe);
  

}
function drawScore(x,y,score,digitWidth, digitHeight){
  scoreDigits.removeAll();
  let scoreStr = str(score);
  let totalWidth = scoreStr.length * digitWidth;
  let startX = x - totalWidth/2;
  for(let i = 0;i<scoreStr.length;i++){
    let digit = int(scoreStr[i]);
    let xPos = startX +i * digitWidth;
    let digitSprite = new scoreDigits.Sprite(xPos,y,digitWidth,digitHeight);
    digitSprite.img = numberImages[digit];
  }
  moveGroup(scoreDigits,camera.x,24);
}
function moveGroup(group,targetX,spacing){
  let totalWidth = (group.length -1) * spacing;
  let startX = (targetX - totalWidth/2);
  for (let i = 0; i < group.length; i++){
    group[i].x = startX + i * spacing;
  }
}



