// player
let player;

let playerIdleSpritesheet;
let playerWalkSpritesheet;
let playerMeleeSpritesheet;
let playerDeathSpritesheet;

// weapons
let pistol_img;
let pistol_anim;
let grapple_closed;
let grapple_open;

// enemy
let stanky;

let enemy;
let stankyJail;
let goomba;
let angler;
let abAngler;

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
    playerDeathSpritesheet = loadSpriteSheet("assets/img/player/playerDeath.png", 64, 64, 10);
    playerDeathSpritesheet.looping = false;

    // weapon assets
    pistol_img = loadImage("assets/img/weapon/pistol_1.png");
    pistol_anim = loadAnimation("assets/img/weapon/pistol_1.png", "assets/img/weapon/pistol_2.png","assets/img/weapon/pistol_3.png");
    grapple_closed = loadImage("assets/img/weapon/grapple_closed.png");
    grapple_open = loadImage("assets/img/weapon/grapple_open.png");


    // fonts
    myFont = loadFont("assets/fonts/FirstJob.ttf");
    
    
    // enemy
    batImg = loadSpriteSheet("assets/img/enemy/balls/Bat_spritesheet.png", 64, 64, 8);

    // ui
    hpBarBg = loadImage("assets/img/ui/hpBar/hpBg.png");
    hpBarGreen = loadImage("assets/img/ui/hpBar/hpGreen.png");
    hpBarYellow = loadImage("assets/img/ui/hpBar/hpYellow.png");
    hpBarRed = loadImage("assets/img/ui/hpBar/hpRed.png");
}



function setup() {
    createCanvas(800, 600);
    frameRate(60);
    
    allEntities = new Group();

    player = new Player(900, 7500, playerIdleSpritesheet, playerWalkSpritesheet);

    // stanky has to be placed after player because it targets player
    stanky = new Stanky(1450, 7550, player);
    stankyJail = new Blockade(1400, 7400, 200, map3, mapAssets.jail_key);

    map3.generate();

    // bat enemies
    enemy = new Enemy(2400, 10650, 900, 200, true);

    // "goomba" enemy
    goomba = new Goomba(2250, 1600, player);

    // angler enemies
    angler = new Angler(850, 5000, player, "normal");
    abAngler = new Angler(2000, 3100, player, "abnormal");

    ui = new UI(player);
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
    angler.draw();
    abAngler.draw();

    goomba.draw();

}

