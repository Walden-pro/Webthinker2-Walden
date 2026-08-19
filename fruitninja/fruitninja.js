//Variables
let watermelon;
let peach;

//Preload variables
let background;
let watermelonWhole;
let peachWhole;

function preload(){
    background = loadImage("assets/dojobackground.png");
    watermelonWhole = loadImage("assets/watermelonwhole.png")
    peachWhole = loadImage("assets/peachwhole.png")
}
function setup(){
    new Canvas(800, 600);
    world.gravity.y = 10;

    //Peach
    peach = new Sprite();
    peach.img = peachWhole;
    peach.width = 100;
    peach.height = 600;
    peach.scale = 100/peach.width;
    peach.mass = 2;//How heavy
    peach.drag = 0.02;//Air resistance
    peach.collider = "dynamic";//Collidable,movable,affected by physics

    //Watermelon
    watermelon = new Sprite();
    watermelon.img = watermelonWhole;
    watermelon.width = 100;
    watermelon.height = 100;
    watermelon.scale = 2;
    watermelon.mass = 2;//How heavy
    watermelon.drag = 0.02;//Air resistance
    watermelon.collider = "dynamic";//Collidable,movable,affected by physics
}
function draw(){
    image(background,0,0,width,height);


}