
// player
let player;

let playerIdleSpritesheet;
let playerWalkSpritesheet;


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

    player = new Player(2500, 1600, playerIdleSpritesheet, playerWalkSpritesheet);   // player x, player y, idle animation, walking animation

    ui = new UI(player.sprite);    // pass in player object into ui class

    stanky = new Stanky(800, 500, player);
}
 

function draw() {
    background(0);

    // all maps are ready to be drawn and transitioned to
    for (let map of allMaps) {
        
        if (!keyIsDown(16)) {   // if the player isn't holding shift for the raycast mechanic
            map.draw();
            map.transitions();
        }
        
        map.collisions();   // always detect collisions
    }


    player.control();


    stanky.draw();

    
    // very bad and very temporary event triggering
    events(player.sprite.position.x, player.sprite.position.y-50);

    // draws ui box
    ui.draw(50, 50, player);

}