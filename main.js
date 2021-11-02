
let rayCastOn = false;

let map;
let mapFile;
let wall;
let brickImg;
let door;

let player;
let playerIdle;
let playerWalk;

let pistol;

let idleAnim;
let walkAnim;

let ui;
let rayCast;


function preload() {
    mapFile = loadImage("assets/img/map/tileMap.png");
    wall = loadImage("assets/img/map/tile.png");
    brickImg = loadImage("assets/img/map/brick.png");
    door = loadImage("assets/img/map/door.png");

    playerIdle = loadSpriteSheet("assets/img/player/playerIdle.png", 64, 64, 1);
    playerWalk = loadSpriteSheet("assets/img/player/playerWalk.png", 64, 64, 10);
    pistol = loadImage("assets/img/weapon/pistol.png");
    idleAnim = loadAnimation(playerIdle);
    walkAnim = loadAnimation(playerWalk);
}


function setup() {
    createCanvas(800, 600);
    frameRate(60);
    
    map = new Map("");  // change to map = new Map("raycasted") for raycasting
    map.generate(mapFile, wall, brickImg, door, 0, -200);
    player = new Player(1200, 100);

    ui = new UI(player);    // pass in player object into ui class
}
 

function draw() {
    background(0);

    player.control();
    player.sprite.collide(map.blocks);
    drawSprites();
    // draws ui box
    ui.draw(50, 50);



}
