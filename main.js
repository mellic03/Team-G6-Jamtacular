
// player
let player;

let playerIdleSpritesheet;
let playerWalkSpritesheet;


let stanky;


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

    map1.generate();    // generate only the first map

    player = new Player(300, 600, playerIdleSpritesheet, playerWalkSpritesheet);   // player x, player y, idle animation, walking animation

    stanky = new Stanky(3300, 500, player);    // create new boss stanky with target as player

    ui = new UI(player.sprite);    // pass in player object into ui class
}
 

function draw() {
    background(0);

    mapHandler();   // handles map events and interactivity (collision, transitions, raycasting)
    
    stanky.draw();
    player.projectiles.overlap(stanky.sprite, projectileDamage);
    player.draw();
    
    // very bad and very temporary event triggering
    events(player.sprite.position.x, player.sprite.position.y-50);

    // draws ui box
    ui.draw(50, 50, player);

}


function projectileDamage(projectile, injured) {

    projectile.remove();
    stanky.health -= 5;
}