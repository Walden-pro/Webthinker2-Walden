

//Variables


//Preload variables
let background;
let fruitGroup;
let fruitTypes = [];

function preload(){
    background = loadImage("assets/dojobackground.png")
    
    let peach = {
        whole : loadImage("assets/peachwhole.png")
    };
    let watermelon = {
        whole : loadImage("assets/watermelonwhole.png")
    };
    fruitTypes =[peach,watermelon];
}
function setup(){

    new Canvas(800, 600);
    world.gravity.y = 10;


    //Groups
    peachGroup = new Group();
    watermelonGroup = new Group();
}
function draw(){
    image(background,0,0,800,height);
    fill("#ba0000");
    textSize(50);
    text("framecount:" + frameCount,10,40);

    if (frameCount % 120 == 0){
        spawnFruit();
        
    }

}
// function spawnPeach(){
//     peach = new peachGroup.Sprite();
//     peach.img = peachWhole;
//     peach.width = 150;
//     peach.height = 150;
//     peach.scale = peach.width / peachWhole.width;
//     peach.mass = 2;//How heavy
//     peach.drag = 0.02;//Air resistance
//     peach.collider = "dynamic";//Collidable,movable,affected by physics
// }
// function spawnWatermelon(){
//     watermelon = new watermelonGroup.Sprite();
//     watermelon.img = watermelonWhole;
//     watermelon.width = 150;
//     watermelon.height = 150;
//     watermelon.scale = watermelon.width / watermelonWhole.width;
//     watermelon.mass = 2;//How heavy
//     watermelon.drag = 0.02;//Air resistance
//     watermelon.collider = "dynamic";//Collidable,movable,affected by physics
// }
function spawnFruit(){
  let fruitData = random(fruitTypes);
  let randomX = random(300,500);
  let fruit = new fruitGroup.Sprite(randomX, height+20, 40);
  fruit.image = fruitData.whole;
  fruit.type = fruitData;
  fruit.vel.y = random(-10, -14);
  fruit.vel.x = random(-2,2);
  fruit.friction = 0;
}