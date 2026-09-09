
let trail;
let background;
let fruitGroup;
let fruitHalves;
let fruitTypes = [];

function preload(){
    background = loadImage("assets/dojobackground.png")
    //fruits
    let peach = { 
        whole : loadImage("assets/peachwhole.png"),
        half1: loadImage("assets/peachhalf.png"),
        half2: loadImage("assets/peachhalf2.png"),

    };
    let watermelon = { 
        whole : loadImage("assets/watermelonwhole.png"),
        half1: loadImage("assets/watermelonhalf.png"),
        half2: loadImage("assets/watermelonhalf.png"),

    };
    let tomato = {
        whole : loadImage("assets/tomato1.png"),
        half1: loadImage("assets/tomato2.png"),
        half2: loadImage("assets/tomato2.png"),
    }
    let dragonfruit = {
        whole : loadImage("assets/dragonfruit1.png"),
        half1: loadImage("assets/dragonfruit2.png"),
        half2: loadImage("assets/dragonfruit2.png"),
    }
    let strawberry = {
        whole : loadImage("assets/strawberry1.png"),
        half1: loadImage("assets/strawberry3.png"),
        half2: loadImage("assets/strawberry3.png"),
    }
    let onion = {
        whole : loadImage("assets/red_onion2.png"),
        half1: loadImage("assets/red_onion3.png"),
        half2: loadImage("assets/red_onion3.png"),
    }
    let kiwi = {
        whole : loadImage("assets/kiwi1.png"),
        half1: loadImage("assets/kiwi3.png"),
        half2: loadImage("assets/kiwi4.png"),
    }
    let garlic = {
        whole : loadImage("assets/garlic1.png"),
        half1: loadImage("assets/garlic2.png"),
        half2: loadImage("assets/garlic2.png"),
    }
    let papaya = {
        whole : loadImage("assets/papaya1.png"),
        half1: loadImage("assets/papaya2.png"),
        half2: loadImage("assets/papaya3.png"),
    }
    let potato = {
        whole : loadImage("assets/potato1.png"),
        half1: loadImage("assets/potato2.png"),
        half2: loadImage("assets/potato2.png"),
    }
    let starfruit = {
        whole : loadImage("assets/starfruit1.png"),
        half1: loadImage("assets/starfruit2.png"),
        half2: loadImage("assets/starfruit2.png"),
    }
    //added into fruits
    fruitTypes =[peach,watermelon,tomato,
        dragonfruit,strawberry,onion,kiwi,
        papaya,garlic,potato,starfruit];

}

function setup(){
    new Canvas(800, 600);
    world.gravity.y = 10;
    fruitGroup = new Group();
    fruitHalves = new Group();
    // fruitGroup.w = 30;
    // fruitGroup.h = 30;
}
function draw(){
    image(background,0,0,width,height);
    fill("#ba0000");
    textSize(50);
    text("framecount:" + frameCount,10,40);
    if (frameCount % 120 == 0){
        spawnsFruit();
    }
    if (mouse.pressing()){
        trail = new Sprite(mouse.x, mouse.y , 7);
        trail.collider = 'none';
        trail.color = "blue";
        trail.life = 10;
        sliceFruit();
    }
}
function spawnsFruit(){
  let fruitData = random(fruitTypes);
  let randomX = random(300,500);
  let fruit = new fruitGroup.Sprite(randomX, height+20, 40);
  fruit.image = fruitData.whole;
  fruit.type = fruitData;
  fruit.vel.y = random(-10, -14);
  fruit.vel.x = random(-2,2);
  fruit.friction = 0;
  fruit.overlaps(allSprites);
  fruit.layer = 2;
}
function sliceFruit(){
    for (let fruit of fruitGroup){
        if (fruit.sliced){
            continue;
        }
   
        let d = dist(mouse.x, mouse.y, fruit.x , fruit.y);
        if (d< ((fruit.d / 2 )+ 5)) {
            fruit.sliced = true;
            const fx = fruit.x;
            const fy = fruit.y;
            fruit.remove();
            splitFruit(fx, fy, fruit.type);
            break;
        }
    }
}
function splitFruit(x,y,fruitData){
    let left = new fruitHalves.Sprite(x - 10,y,40 , 40);
    left.img = fruitData.half1;
    left.vel.x = -3;
    left.vel.y = random(-5 , -2);
    left.rotationSpeed = -5;
    left.life = 60;
    left.collider = 'dynamic';
    left.overlaps(allSprites);
    left.layer = 1;

    let right = new fruitHalves.Sprite(x + 10, y, 40, 40);
    right.img = fruitData.half2;
    right.vel.x = 3;
    right.vel.y = random(-5 , -2);
    right.rotationSpeed = -5;
    right.life = 60;
    right.collider = 'dynamic';
    right.overlaps(allSprites);
    left.layer = 1;

    
    
}


