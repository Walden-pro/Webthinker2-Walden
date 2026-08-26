

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

