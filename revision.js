// for (let i = 0; i <5; i++){

// }
//spawn sprite when click
let floor;
function setup(){
    new Canvas(800, 600);
    world.gravity.y = 10;
}
function draw(){
    background(220);
    if(mouse.presses()){
        let ball = new Sprite(mouse.x , mouse.y, 30,"dynamic");
        ball.bounciness = 0.3;
    }
}
// when gravity is 'world.gravity.y = -10' , the sprite will go up