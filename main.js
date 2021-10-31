
let map;
let mapFile;
let wall;

let player;

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
}
 

function draw() {
    background(0);
    
    drawSprites();

    map.draw();
    player.control();
    player.sprite.collide(map.blocks);

}