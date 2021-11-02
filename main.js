// tilemaps
let bgMap;
let mainTilemap;

// map assets
let brickbg;
let concreteMap;
let concreteImg;
let brickImg;
let doorImg;

// player
let player;
let playerIdle;
let playerWalk;
let idleAnim;
let walkAnim;

// weapons
let pistol;

// ui
let ui;
let hpBarBg;
let hpBarGreen;
let hpBarYellow;
let hpBarRed;


function preload() {
    
    // tilemaps
    bgTilemap = loadImage("assets/img/map/bg_tilemap.png");
    mainTilemap = loadImage("assets/img/map/tileMap.png");

    // map assets
    concreteImg = loadImage("assets/img/map/grey_brick.png");
    grassBrickImg = loadImage("assets/img/map/grass_brick.png");
    doorImg = loadImage("assets/img/map/door.png");
    redBrickImg = loadImage("assets/img/map/red_brick.png");
    brickbg = loadImage("assets/img/map/brickbg.png");

    // player animations
    playerIdle = loadSpriteSheet("assets/img/player/playerIdle.png", 64, 64, 1);
    playerWalk = loadSpriteSheet("assets/img/player/playerWalk.png", 64, 64, 10);
    idleAnim = loadAnimation(playerIdle);
    walkAnim = loadAnimation(playerWalk);

    // weapon assets
    pistol = loadImage("assets/img/weapon/pistol.png");

    // fonts
    myFont = loadFont("assets/fonts/FirstJob.ttf");

    // ui
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

    bgMap.draw();   // draw background tilemap before anything else

    player.sprite.collide(mainMap.allBlocks);   // player collides with mainmap tiles
    drawSprite(player.sprite);  // draw player sprite
    player.control();   // allow control of player sprite

    mainMap.draw(); // draw mainmap after player

    // draws ui box
    ui.draw(50, 50);
}
