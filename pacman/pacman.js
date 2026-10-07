//Sprite groups
let walls;
let dots;
let powerups;

// Tile map layout
let tilemap = [
    "wwwwwwwwww",
    ""
]

function preload(){

}

function setup(){
    new Canvas(200, 200);
    background(100);

    //Create groups for tilemap
    walls = new Group();
    walls.w = 20;
    walls.h = 20;
    walls.tile = "w";
    walls.color = "blue";
    walls.collider = "static";

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
    new Tiles(tilemap, 0, 0, 20, 20);// (array, x pos, y pos, tile width, tile height)


}

function draw(){

}