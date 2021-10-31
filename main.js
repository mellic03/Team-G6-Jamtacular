
let map;
let mapFile;
let wall;

let player;

let bodies = [];

function preload() {
    mapFile = loadImage("assets/tileMap.png");
    wall = loadImage("assets/tile.png");
}


function setup() {
    createCanvas(800, 600);
    frameRate(60);
    
    map = new Map();
    map.generate(mapFile, wall);

    player = new Player();
    player.generate(100, 100);

    bodies[1] = new Body(500, 500, 50, [10, 100, 100]);
    bodies[2] = new Body(700, 500, 50, [10, 100, 100]);

}
 

function draw() {
    background(0);
    drawSprite(player.sprite);


    map.draw();
    player.control();
    player.sprite.collide(map.blocks);

}
