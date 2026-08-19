let background;
let watermelonwhole;
let peachwhole;
function preload(){
    background = loadImage("assets/dojobackground.png");
    watermelonwhole = loadImage("assets/watermelonwhole.png")
    wmelonwhole = loadImage("assets/watermelonwhole.png")
}
function setup(){
  new Canvas(800, 600);
  world.gravity.y = 20;

}
function draw(){
    image(background,0,0,width,height);


}