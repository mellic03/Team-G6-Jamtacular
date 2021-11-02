
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
    
    spawn_area.preload();
    area_1.preload();

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

    spawn_area.generate();
    area_1.generate();


    player = new Player(300, -200);

    ui = new UI(player);    // pass in player object into ui class
}
 

function draw() {
    background(50, 20, 20);
    
    spawn_area.draw();
    area_1.draw();

    player.control();
    drawSprite(player.sprite);

    // very bad and very temporary dialogue triggering
    dialogue(player.sprite.position.x, player.sprite.position.y-50);

    // draws ui box
    ui.draw(50, 50);
}


