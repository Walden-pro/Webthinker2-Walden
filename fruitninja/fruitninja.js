

//Variables
let watermelon;
let peach;

//Preload variables
let background;
let watermelonWhole;
let peachWhole;

function preload(){
    background = loadImage("assets/dojobackground.png");
    watermelonWhole = loadImage("assets/watermelonwhole.png");
    peachWhole = loadImage("assets/peachwhole.png");
}
function setup(){
    fill("#ba0000");
    textSize(50);
    
    new Canvas(800, 600);
    world.gravity.y = 10;


    //Groups
    peachGroup = new Group();
    watermelonGroup = new Group();
}
function draw(){
    image(background,0,0,width,height);
   
    spawnPeach();
    spawnWatermelon();
}
function spawnPeach(){
    peach = new peachGroup.Sprite();
    peach.img = peachWhole;
    peach.width = 150;
    peach.height = 150;
    peach.scale = peach.width / peachWhole.width;
    peach.mass = 2;//How heavy
    peach.drag = 0.02;//Air resistance
    peach.collider = "dynamic";//Collidable,movable,affected by physics
}
function spawnWatermelon(){
    watermelon = new watermelonGroup.Sprite();
    watermelon.img = watermelonWhole;
    watermelon.width = 150;
    watermelon.height = 150;
    watermelon.scale = watermelon.width / watermelonWhole.width;
    watermelon.mass = 2;//How heavy
    watermelon.drag = 0.02;//Air resistance
    watermelon.collider = "dynamic";//Collidable,movable,affected by physics
}