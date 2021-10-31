
let map;
let mapFile;
let wall;
let door;

let player;
let playerIdle;
let playerWalk;

let idleAnim;
let walkAnim;

let ui;

function preload() {
    mapFile = loadImage("assets/tileMap.png");
    wall = loadImage("assets/tile.png");
    door = loadImage("assets/door.png");

    playerIdle = loadSpriteSheet("assets/playerIdle.png", 64, 64, 1);
    playerWalk = loadSpriteSheet("assets/playerWalk.png", 64, 64, 10);
    idleAnim = loadAnimation(playerIdle);
    walkAnim = loadAnimation(playerWalk);

}


function setup() {
    createCanvas(800, 600);
    frameRate(60);
    
    map = new Map();
    map.generate(mapFile, wall, door, 0, -200);

    player = new Player();
    player.generate(1200, 0);

    ui = new UI();

}
 

function draw() {
    background(0);

    drawSprite(player.sprite);
    drawSprites();
    
    map.draw();
    player.control();
    player.sprite.collide(map.blocks);

    // no idea why a rectangle isn't showing up on the canvas?
    ui.all(100, 100);

}

function keyPressed() {
    //requestPointerLock();
}