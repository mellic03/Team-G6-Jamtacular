let bgMap;
let brickbg;

let concreteMap;
let mainTilemap;
let concreteImg;
let brickImg;
let doorImg;

let player;
let playerIdle;
let playerWalk;

let pistol;

let idleAnim;
let walkAnim;

// ui stuff -------
let ui;
let hpBarBg;
let hpBarGreen;
let hpBarYellow;
let hpBarRed;
// -----------------

let rayCast;


function preload() {
    
    // tilemaps
    bgTilemap = loadImage("assets/img/map/bg_tilemap.png");
    mainTilemap = loadImage("assets/img/map/tileMap.png");

    // tile images
    concreteImg = loadImage("assets/img/map/grey_brick.png");
    grassBrickImg = loadImage("assets/img/map/grass_brick.png");
    doorImg = loadImage("assets/img/map/door.png");
    redBrickImg = loadImage("assets/img/map/red_brick.png");
    brickbg = loadImage("assets/img/map/brickbg.png");


    playerIdle = loadSpriteSheet("assets/img/player/playerIdle.png", 64, 64, 1);
    playerWalk = loadSpriteSheet("assets/img/player/playerWalk.png", 64, 64, 10);
    pistol = loadImage("assets/img/weapon/pistol.png");
    idleAnim = loadAnimation(playerIdle);
    walkAnim = loadAnimation(playerWalk);

    // fonts
    myFont = loadFont("assets/fonts/FirstJob.ttf");

    // hp bar
    hpBarBg = loadImage("assets/img/ui/hpBar/hpBg.png");
    hpBarGreen = loadImage("assets/img/ui/hpBar/hpGreen.png");
    hpBarYellow = loadImage("assets/img/ui/hpBar/hpYellow.png");
    hpBarRed = loadImage("assets/img/ui/hpBar/hpRed.png");
}


function setup() {
    createCanvas(800, 600);
    frameRate(60);
    

    bgMap = new Map(false);     // background tilemap
    bgMap.generate(0, 0, bgTilemap, brickbg);

    mainMap = new Map(true);  // change to map = new Map(true) for raycasting
    mainMap.generate(0, 0, mainTilemap, concreteImg, grassBrickImg, redBrickImg);


    player = new Player(1200, 100);

    ui = new UI(player);    // pass in player object into ui class
}
 

function draw() {
    background(0);

    bgMap.draw();

    player.sprite.collide(mainMap.allBlocks);
    drawSprite(player.sprite);
    player.control();

    mainMap.draw();

    // draws ui box
    ui.draw(50, 50);
}