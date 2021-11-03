
// player
let player;

let playerIdleSpritesheet;
let playerWalkSpritesheet;


// weapons
let pistol;

// ui
let ui;
let hpBarBg;
let hpBarGreen;
let hpBarYellow;
let hpBarRed;


function preload() {
    
    for (let map of allMaps) {
        map.preload();
    }


    // player animations
    playerIdleSpritesheet = loadSpriteSheet("assets/img/player/playerIdle.png", 64, 64, 1);
    playerWalkSpritesheet = loadSpriteSheet("assets/img/player/playerWalk.png", 64, 64, 10);

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

    map1.generate();

    player = new Player(300, 600, playerIdleSpritesheet, playerWalkSpritesheet);   // player x, player y, idle animation, walking animation

    ui = new UI(player);    // pass in player object into ui class
}
 

function draw() {
    background(0);

    for (let map of allMaps) {
        map.draw();
        map.transitions();
    }

    player.control();

    console.log(player.controllable);

    // very bad and very temporary event triggering
    events(player.sprite.position.x, player.sprite.position.y-50);

    // draws ui box
    ui.draw(50, 50);
}


