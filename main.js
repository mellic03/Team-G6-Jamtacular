
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
let rayCast;


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
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    
    map = new Map("");  // change to map = new Map("raycasted") for raycasting
    map.generate(mapFile, wall, door, 0, -200);

    player = new Player();
    player.generate(1200, 100);

    ui = new UI(player);    // pass in player object into ui class
}
 

function draw() {
    background(0);

    map.draw();

    drawSprite(player.sprite);
    
    player.control();
    player.sprite.mirrorX(Math.sign(player.sprite.velocity.x));
    player.sprite.collide(map.blocks);

    // draws ui box
    ui.draw(50, 50);
}
