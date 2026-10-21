//Sprite groups
let walls;
let dots;
let powerups;

//Game variables
let pacman;
let blinky, inky, pinky, clyde;
let ghosts;

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
    walls.strokeWeight = 0; //Remove outline

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
    pacman.friction = 0;
    

    //Ghost sprites
    blinky = new Sprite();
    blinky.x = 50;
    blinky.y = 30;
    blinky.color = "red";

    inky = new Sprite();
    inky.x = 70;
    inky.y = 30;
    inky.color = "cyan";


    pinky = new Sprite();
    pinky.x = 90;
    pinky.y = 30;
    pinky.color = "pink";

    clyde = new Sprite();
    clyde.x = 110;
    clyde.y = 30;
    clyde.color = "orange";

    ghosts = [blinky, pinky, inky, clyde];

    for (let ghost of ghosts){
        ghost.diameter = 18;
        ghost.collider = "dynamic";
        ghost.bouciness = 0;
        ghost.friction = 0;
    }

    for (let i = 0; i < ghosts.length; i++){
        //Allow ghost to pass through pacman
        ghosts[i].overlaps(pacman);
        for (let j = i + 1; j < ghosts.length; j++) {
            //Allow ghost to pass through each other
            ghosts[i].overlaps(ghosts[j]);
        }
    }
}

function draw(){
    // Clear canvas
    background(0);
    //Pacman movement
    if (kb.presses("right")){
        pacman.vel.x = 2;
        pacman.vel.y = 0
        setMovement(pacman);
    }else if (kb.presses("left")){
        pacman.vel.x = -2;
        pacman.vel.y = 0
        setMovement(pacman);
    }else if (kb.presses("up")){
        pacman.vel.y = -2;
        pacman.vel.x = 0;
        setMovement(pacman);
    }else if(kb.presses("down")){
        pacman.vel.y = 2;
        pacman.vel.x = 0;
        setMovement(pacman);
    }

    // Check dot collision
    for (let dot of dots){
        if (pacman.overlaps(dot)){
            dot.remove();
            score += 10;
            console.log(score)
        }
    }

    //call ghost movement
    for (let ghost of ghosts){
        if (frameCount % 60 === 0){
            ghostDirection(ghost);
        }
    }

    //Fix sprite movement
    for (let character of [pacman, ...ghosts]){
        //skip sprite that are not moving
        if (character.savedVX === undefined) continue;

        if (character.savedVX !== 0){
            character.y = character.lane;
        }else{
            character.x = character.lane;
        }

        character.vel.x = character.savedVX;
        character.vel.y = character.savedVY;
    }
}

// function for ghosts to move in random directions
function ghostDirection(ghost){
    //random number to choose direction
    let direction = floor(random(1, 5));

    //Ghost movement
    if (direction === 1){
        ghost.vel.x = 1;
        ghost.vel.y = 0
    }else if (direction === 2){
        ghost.vel.x = -1;
        ghost.vel.y = 0
    }else if (direction === 3){
        ghost.vel.y = -1;
        ghost.vel.x = 0;
    }else if(direction === 4){
        ghost.vel.y = 1;
        ghost.vel.x = 0;
    }
    
}

// Center sprite movement
function setMovement(character){
    character.savedVX = character.vel.x;
    character.savedVY = character.vel.y;
    if (character.savedVX !== 0){
        character.lane = round((character.x - 10) / 20) * 20 + 10;
        character.lane = round((character.y - 10) / 20) * 20 + 10;

    }
    
    
}