
// player
let player;

let playerIdleSpritesheet;
let playerWalkSpritesheet;
let playerMeleeSpritesheet;


// weapons
let pistol_img;
let pistol_anim;
let grapple_closed;
let grapple_open;

// enemy
let stanky;
let enemy;

// ui
let ui;
let hpBarBg;
let hpBarGreen;
let hpBarYellow;
let hpBarRed;

function preload() {
    
    mapAssets.preload();

    // player animations
    playerIdleSpritesheet = loadSpriteSheet("assets/img/player/playerIdle.png", 64, 64, 1);
    playerWalkSpritesheet = loadSpriteSheet("assets/img/player/playerWalk.png", 64, 64, 10);
    playerMeleeSpritesheet = loadSpriteSheet("assets/img/player/playerMelee.png", 64, 64, 10);


    // weapon assets
    pistol_img = loadImage("assets/img/weapon/pistol_1.png");
    pistol_anim = loadAnimation("assets/img/weapon/pistol_1.png", "assets/img/weapon/pistol_2.png","assets/img/weapon/pistol_3.png");
    grapple_closed = loadImage("assets/img/weapon/grapple_closed.png");
    grapple_open = loadImage("assets/img/weapon/grapple_open.png");


    // fonts
    myFont = loadFont("assets/fonts/FirstJob.ttf");
    

    // ui
    hpBarBg = loadImage("assets/img/ui/hpBar/hpBg.png");
    hpBarGreen = loadImage("assets/img/ui/hpBar/hpGreen.png");
    hpBarYellow = loadImage("assets/img/ui/hpBar/hpYellow.png");
    hpBarRed = loadImage("assets/img/ui/hpBar/hpRed.png");
}


let notE;

function setup() {
    createCanvas(800, 600);
    frameRate(60);

    map4.generate();    // generate only the first map

    player = new Player(1800, 10673, playerIdleSpritesheet, playerWalkSpritesheet);   // player x, player y, idle animation, walking animation

    stanky = new Stanky(1450, 7550, player);    // create new boss stanky with target as player, this is for testing

    ui = new UI(player);    // pass in player object into ui class

    enemy = new Enemy(2400, 10650, 900, 200, true);
    notE = new notEnemy(1600, 10700);
}


function draw() {
    background(0);

    mapHandler();   // handles map events and interactivity (collision, transitions, raycasting)
    
    stanky.draw();  // this is for testing
    player.draw();

    events();

    // draws ui box
    ui.draw(50, 50, player);

    enemy.update();

    notE.logic(player);
}