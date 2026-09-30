let trail;
let background;
let fruitGroup;
let fruitHalves;
let fruitTypes = [];
let score = 0;
let missed = 0;
let gameState = 'start';
let gameStartTime = 0;
let gameTimer = 0;
let gameDuration = 60;
let bgMusic;
let sliceSound;
let vb;
let difficultyLevel = 1;
let difficultyIncrease;

function preload(){
    background = loadImage("assets/dojobackground.png")
    //fruits
    let peach = { 
        whole : loadImage("assets/peachwhole.png"),
        half1: loadImage("assets/peachhalf.png"),
        half2: loadImage("assets/peachhalf2.png"),
        scaleMod:1,

    };
    let watermelon = { 
        whole : loadImage("assets/watermelonwhole.png"),
        half1: loadImage("assets/watermelonhalf.png"),
        half2: loadImage("assets/watermelonhalf.png"),
        scaleMod:1,

    };
    let tomato = {
        whole : loadImage("assets/tomato1.png"),
        half1: loadImage("assets/tomato2.png"),
        half2: loadImage("assets/tomato2.png"),
        scaleMod:2.5,
    }
    let dragonfruit = {
        whole : loadImage("assets/dragonfruit1.png"),
        half1: loadImage("assets/dragonfruit2.png"),
        half2: loadImage("assets/dragonfruit2.png"),
        scaleMod: 2.5,
    }
    let strawberry = {
        whole : loadImage("assets/strawberry1.png"),
        half1: loadImage("assets/strawberry3.png"),
        half2: loadImage("assets/strawberry3.png"),
        scaleMod: 2.5,
    }
    let onion = {
        whole : loadImage("assets/red_onion2.png"),
        half1: loadImage("assets/red_onion3.png"),
        half2: loadImage("assets/red_onion3.png"),
        scaleMod: 2.5,
    }
    let kiwi = {
        whole : loadImage("assets/kiwi1.png"),
        half1: loadImage("assets/kiwi3.png"),
        half2: loadImage("assets/kiwi4.png"),
        scaleMod: 2.5,
    }
    let garlic = {
        whole : loadImage("assets/garlic1.png"),
        half1: loadImage("assets/garlic2.png"),
        half2: loadImage("assets/garlic2.png"),
        scaleMod: 2.5,
    }
    let papaya = {
        whole : loadImage("assets/papaya1.png"),
        half1: loadImage("assets/papaya2.png"),
        half2: loadImage("assets/papaya3.png"),
        scaleMod: 2.5,
    }
    let potato = {
        whole : loadImage("assets/potato1.png"),
        half1: loadImage("assets/potato2.png"),
        half2: loadImage("assets/potato2.png"),
        scaleMod:2.5,
    }
    let starfruit = {
        whole : loadImage("assets/starfruit1.png"),
        half1: loadImage("assets/starfruit2.png"),
        half2: loadImage("assets/starfruit2.png"),
        scaleMod:2.5,
    }
    let coconut = {
        whole : loadImage("assets/coconut1.png"),
        half1: loadImage("assets/coconut3.png"),
        half2: loadImage("assets/coconut3.png"),
        scaleMod:2.25,
    }
    let coconutold = {
        whole : loadImage("assets/coconutold3.png"),
        half1: loadImage("assets/coconutold4.png"),
        half2: loadImage("assets/coconutold4.png"),
        scaleMod:2.25,
    }
    let fig = {
        whole : loadImage("assets/fig1.png"),
        half1: loadImage("assets/fig2.png"),
        half2: loadImage("assets/fig2.png"),
        scaleMod:2.5,
    }
    let tomatogreen = {
        whole : loadImage("assets/tomatogreen1.png"),
        half1: loadImage("assets/tomatogreen2.png"),
        half2: loadImage("assets/tomatogreen2.png"),
        scaleMod:2.5,
    }
    let pumpkin = {
        whole : loadImage("assets/pumpkin1.png"),
        half1: loadImage("assets/pumpkin3.png"),
        half2: loadImage("assets/pumpkin3.png"),
        scaleMod:2.5,
    }
    let pineapple = {
        whole : loadImage("assets/pineapple1.png"),
        half1: loadImage("assets/pineapple2.png"),
        half2: loadImage("assets/pineapple2.png"),
        scaleMod:2.5,
    }
    let peargreen = {
        whole : loadImage("assets/peargreen1.png"),
        half1: loadImage("assets/peargreen4.png"),
        half2: loadImage("assets/peargreen4.png"),
        scaleMod:2.5,
    }
    let pear = {
        whole : loadImage("assets/pear1.png"),
        half1: loadImage("assets/pear3.png"),
        half2: loadImage("assets/pear3.png"),
        scaleMod:2.5,
    }
    let paprikayellow = {
        whole : loadImage("assets/paprikayellow1.png"),
        half1: loadImage("assets/paprikayellow3.png"),
        half2: loadImage("assets/paprikayellow3.png"),
        scaleMod:2.5,
    }
    let paprikagreen = {
        whole : loadImage("assets/paprikagreen1.png"),
        half1: loadImage("assets/paprikagreen3.png"),
        half2: loadImage("assets/paprikagreen3.png"),
        scaleMod:2.5,
    }
    let paprika = {
        whole : loadImage("assets/paprika1.png"),
        half1: loadImage("assets/paprika3.png"),
        half2: loadImage("assets/paprika3.png"),
        scaleMod:2.5,
    }
    let orange = {
        whole : loadImage("assets/orange1.png"),
        half1: loadImage("assets/orange2.png"),
        half2: loadImage("assets/orange2.png"),
        scaleMod:2.5,
    }
    let red_onion = {
        whole : loadImage("assets/red_onion2.png"),
        half1: loadImage("assets/red_onion3.png"),
        half2: loadImage("assets/red_onion3.png"),
        scaleMod:2.5,
    }
    let mangosteen = {
        whole : loadImage("assets/mangosteen1.png"),
        half1: loadImage("assets/mangosteen2.png"),
        half2: loadImage("assets/mangosteen2.png"),
        scaleMod:2.5,
    }
    let mangogreen = {
        whole : loadImage("assets/mangogreen1.png"),
        half1: loadImage("assets/mangogreen3.png"),
        half2: loadImage("assets/mangogreen3.png"),
        scaleMod:2.5,
    }
    let mango = {
        whole : loadImage("assets/mango1.png"),
        half1: loadImage("assets/mango3.png"),
        half2: loadImage("assets/mango3.png"),
        scaleMod:2.5,
    }
    let lime = {
        whole : loadImage("assets/lime1.png"),
        half1: loadImage("assets/lime2.png"),
        half2: loadImage("assets/lime2.png"),
        scaleMod:2.5,
    }
    let lemon = {
        whole : loadImage("assets/lemon1.png"),
        half1: loadImage("assets/lemon2.png"),
        half2: loadImage("assets/lemon2.png"),
        scaleMod:2.5,
    }
    let kiwigreen = {
        whole : loadImage("assets/kiwi5.png"),
        half1: loadImage("assets/kiwi6.png"),
        half2: loadImage("assets/kiwi6.png"),
        scaleMod:2.5,
    }
    let figgreen = {
        whole : loadImage("assets/figgreen3.png"),
        half1: loadImage("assets/figgreen2.png"),
        half2: loadImage("assets/figgreen2.png"),
        scaleMod:2.5,
    }
    let dragonfruityellow = {
        whole : loadImage("assets/dragonfruityellow1.png"),
        half1: loadImage("assets/dragonfruityellow2.png"),
        half2: loadImage("assets/dragonfruityellow2.png"),
        scaleMod:2.5,
    }
    let corn = {
        whole : loadImage("assets/corn2.png"),
        half1: loadImage("assets/corn5.png"),
        half2: loadImage("assets/corn5.png"),
        scaleMod:2.5,
    }
    let cherry = {
        whole : loadImage("assets/cherry2.png"),
        half1: loadImage("assets/cherry1.png"),
        half2: loadImage("assets/cherry1.png"),
        scaleMod:2.5,
    }
    let avocado = {
        whole : loadImage("assets/avocado.png"),
        half1: loadImage("assets/avocado.png"),
        half2: loadImage("assets/avocado.png"),
        scaleMod:2.5,
    }
    //added into fruits
    fruitTypes =[peach,watermelon,tomato,dragonfruit,
        strawberry,onion,kiwi,papaya,
        garlic,potato,starfruit,coconut,
        coconutold,fig,pumpkin,tomatogreen,
        pineapple,peargreen,pear,paprikayellow,
        paprikagreen,paprika,orange,red_onion,
        mangosteen,mangogreen,mango,lime,
        lemon,kiwigreen];

    bgMusic = loadSound("assets/fruit-ninja-bgtrack.mp3");
    bgMusic.volume = 0.5;
    slicesound = loadSound("assets/fruit-ninja-combo.mp3");
    vb = loadSound("assets/bithuh-vine-boom-392646.mp3")

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
    clear();
    image(background,0,0,width,height);
    if (gameState === "start") {
        // start menu
        fill("rgba(60, 240, 24, 0.99)");
        textSize(100);
        textAlign(CENTER, CENTER);
        text("Fruit Ninja", width/2, height/2);

        if(kb.presses(" ")||mouse.presses()){
            gameState = "playing";
            gameStartTime = millis();// returns time in ms since program started
            gameTimer = 0;
            
            if (bgMusic.isPlaying() === false){
                bgMusic.loop();
            }
        }
    

        return;
    }else if (gameState === "playing"){
        // Gameplay
        fill("rgba(60, 240, 24, 0.99)"); // a for alpha means transparency
        textSize(30);
        strokeWeight(3)
        stroke("rgba(10, 13, 9, 0.99)");
        textAlign(LEFT, LEFT);
        text("Score:" + score,10,50);
        fill("rgba(209, 221, 206, 0.99)");
        text("Missed:" + missed,10,100);
        if (frameCount % 180 === 0){                                                              // this is where the framecount is
            for (let i = 0; i < difficultyLevel; i++){
                spawnsFruit();
            }                                                                                              
        }
        if (mouse.pressing()){
            fill("blue")
            strokeWeight(0);
            noStroke();
            trail = new Sprite(mouse.x, mouse.y , 7);
            trail.collider = 'none';
            trail.color = "blue";
            trail.life = 10;
            sliceFruit();
        }
        missedFruit();
        gameTimer = floor((millis() - gameStartTime) / 1000);

        strokeWeight(3)
        stroke("rgba(10, 13, 9, 0.99)");
        fill("rgba(240, 214, 21, 0.99)");
        text("Time: " + (gameDuration - gameTimer) , width / 2, 60);

        //win or lose condition
        if (gameTimer > 0 && gameTimer % 5 === 0){
            if (difficultyIncrease === false){
            difficultyIncrease = true;
            difficultyLevel += 1;
            }
         
        } else {
            difficultyIncrease = false;
        }
        if (score >= 50){
            gameState = "gameOverwin";
        }
          
        if (missed >= 10){
            gameState = "gameOverlose";
            
         }
        return;

    }else if (gameState === "gameOverwin"){
        fill("rgba(60, 240, 24, 0.99)"); 
        textSize(30);
        strokeWeight(3)
        stroke("rgba(10, 13, 9, 0.99)");
        textAlign(LEFT, LEFT);
        text("Score:" + score,10,50);
        fill("rgba(209, 221, 206, 0.99)");
        text("Missed:" + missed,10,100);
        fill("rgba(211, 240, 24, 0.99)");
        textSize(100);
        textAlign(CENTER, CENTER);
        text("Game Over!", width/2, height/2);
        text("You won!☑️", width/2, height/2+100);
        if(bgMusic.isPlaying() === true){
            bgMusic.stop();
            vb.play();
        }
        
        return;
    }else if (gameState === "gameOverlose"){
        
        fill("rgba(60, 240, 24, 0.99)"); 
        textSize(30);
        strokeWeight(3)
        stroke("rgba(10, 13, 9, 0.99)");
        textAlign(LEFT, LEFT);
        text("Score:" + score,10,50);
        fill("rgba(209, 221, 206, 0.99)");
        text("Missed:" + missed,10,100);
        fill("rgba(240, 24, 24, 0.99)");
        textSize(100);
        textAlign(CENTER, CENTER);
        text("Game Over!", width/2, height/2);
        text("You lost!", width/2, height/2+100);
        allSprites.removeAll();
        if(bgMusic.isPlaying() === true){
            bgMusic.stop();
            vb.play();
        }
        return;
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
  fruit.scale = fruitData.scaleMod;
}

function sliceFruit(){
    for (let fruit of fruitGroup){
        if (fruit.sliced){
            continue;
        }
        let d = dist(mouse.x, mouse.y, fruit.x , fruit.y);
        if (d< ((fruit.d / 2 )+ 5)) {
            fruit.sliced = true;
            score += 1;
            const fx = fruit.x;
            const fy = fruit.y;
            fruit.remove();

            splitFruit(fx, fy, fruit.type);

            slicesound.play();
            break;
        }
    }

}

function splitFruit(x,y,fruitData){
    let left = new fruitHalves.Sprite(x - 10,y,40 , 40);
    left.img = fruitData.half1;
    left.scale = fruitData.scaleMod;
    left.vel.x = -3;
    left.vel.y = random(-5 , -2);
    left.rotationSpeed = -5;
    left.life = 60;
    left.collider = 'dynamic';
    left.overlaps(allSprites);
    left.layer = 1;

    let right = new fruitHalves.Sprite(x + 10, y, 40, 40);
    right.img = fruitData.half2;
    right.scale = fruitData.scaleMod;
    right.vel.x = 3;
    right.vel.y = random(-5 , -2);
    right.rotationSpeed = -5;
    right.life = 60;
    right.collider = 'dynamic';
    right.overlaps(allSprites);
    right.layer = 1;


}

function missedFruit(){
    for (let fruit of fruitGroup){
        //check if fruit fell below canvas
        if (fruit.y > height + 50){
            fruit.remove();
            missed += 1;
        }
    }
}

