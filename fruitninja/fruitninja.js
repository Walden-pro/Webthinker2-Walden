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

}
function draw(){
    image(background,0,0,width,height);


}