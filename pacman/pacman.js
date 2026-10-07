//Sprite groups
let walls;
let dots;
let powerups;


function preload(){

}

function setup(){
    new Canvas(400, 400);
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
    dots.tile = "w";
    dots.color = "white";
    dots.collider = "none";

    powerups = new Group();
    powerups.diameter = 10;
    powerups.tile = "w";
    powerups.color = "white";
    powerups.collider = "none";

    
}

function draw(){

}