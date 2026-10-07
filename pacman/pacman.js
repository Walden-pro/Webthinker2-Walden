//Sprite groups
let walls;
let dots;
let powerups;

//Game variables
let pacman;
let blinky, inky, pinky, clyde;
let score = 0;

// Tile map layout
let tilemap = [
    "wwwwwwwwww",
    "w        w",
    "w  dddd  w",
    "w  dddd  w",
    "w  dddd  w",
    "w  dddd  w",
    "w  dddd  w",
    "w  dddd  w",
    "wp      pw",
    "wwwwwwwwww",
]

function preload(){

}

function setup(){
    new Canvas(200, 200);
    background(0);

    //Create groups for tilemap
    walls = new Group();
    walls.w = 20;
    walls.h = 20;
    walls.tile = "w";
    walls.color = "blue";
    walls.collider = "static";
    walls.bounciness = 0;

    dots = new Group();
    dots.diameter = 5;
    dots.tile = "d";
    dots.color = "white";
    dots.collider = "none";

    powerups = new Group();
    powerups.diameter = 10;
    powerups.tile = "p";
    powerups.color = "white";
    powerups.collider = "none";

    // Create tilemap
    new Tiles(tilemap, 10, 10, 20, 20);// (array, x pos, y pos, tile width, tile height)

    // Pac-Man sprite
    pacman = new Sprite();
    pacman.x = 30;
    pacman.y = 30;
    pacman.diameter = 18;
    pacman.color = "yellow";
    pacman.bounciness = 0;

    //Ghost sprites
    blinky = new Sprite();
    blinky.x = 30;
    blinky.y = 30;
    blinky.diameter = 18;
    blinky.color = "yellow";
    blinky.bounciness = 0;
}

function draw(){
    // Clear canvas
    background(0);
    //Pacman movement
    if (kb.presses("right")){
        pacman.vel.x = 1;
        pacman.vel.y = 0
    }else if (kb.presses("left")){
        pacman.vel.x = -1;
        pacman.vel.y = 0
    }else if (kb.presses("up")){
        pacman.vel.y = -1;
        pacman.vel.x = 0;
    }else if(kb.presses("down")){
        pacman.vel.y = 1;
        pacman.vel.x = 0;
    }

    // Check dot collision
    for (let dot of dots){
        if (pacman.overlaps(dot)){
            dot.remove();
            score += 10;
            console.log(score)
        }
    }
}