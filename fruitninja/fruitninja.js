let watermelon;
let peach;


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
    peach = new Sprite();
    bird.img = birdMidImg;
    bird.width = 30;
    bird.height = 30;
    bird.mass = 2;
    bird.bounciness = 0.5;
    bird.drag = 0.02;
    peach.collider = "dynamic";

}
function draw(){
    image(background,0,0,width,height);


}