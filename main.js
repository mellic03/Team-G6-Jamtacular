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
let red_key_img;
let blue_key_img;
let eye_img;

// pickups
let health_pickup;

// audio
let darkMapSound;
let stanky_fight_loop;
let player_shoot_sound;
let player_walk_sound;

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

    red_key_img = loadImage("assets/img/weapon/key_red.png");
    blue_key_img = loadImage("assets/img/weapon/key_blue.png");
    gold_key_img = loadImage("assets/img/weapon/key_gold.png");
    
    eye_img = loadImage("assets/img/weapon/eye.png");


    // pickups
    health_pickup = loadImage("assets/img/player/healthPickup.png");

    // audio
    
    darkMapSound = loadSound("assets/audio/ambience/dark.mp3");
    stanky_fight_loop = loadSound("assets/audio/stanky/fight.wav");
    player_shoot_sound = loadSound("assets/audio/gun/fire.wav");
    player_walk_sound = loadSound("assets/audio/step_cloth2.ogg");

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
    createCanvas(1000, 700);
    frameRate(60);

    player = new Player(300, 600, playerIdleSpritesheet, playerWalkSpritesheet);

    createEntities();

    map1.generate();

    ui = new UI(player);
}



function draw() {
    background(0);

    mapHandler();   // handles map events and interactivity (collision, transitions, raycasting)
    
    player.draw();

    stanky.draw();

    events();
    
    // draws ui box
    ui.draw(50, 50, player);

    drawEnemies()


    // invincibility and all items
    if (keyIsDown(13))
    {
        //player.maxHealth = Infinity;
        //player.health = Infinity;
        //player.rangedWeapon.maxAmmo = Infinity;
        //player.rangedWeapon.ammo = Infinity;
        player.CAN_GRAPPLE = true
        player.CAN_RANGED = true
        player.CAN_RED_KEY = true;
        player.CAN_BLUE_KEY = true;
        player.CAN_NIGHTVISION = false;
    }

    if (keyIsDown(98)) {
        player.health--;
    }
}













