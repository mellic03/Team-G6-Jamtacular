//____________________________________________________________VIDEO
let tutorialVideos = [];

//____________________________________________________________AUDIO
let chomp;
let grubDeath;

let playerShootSound;
let splat;
let empty;
let powerupSound;
let click;

//____________________________________________________________DATA
let playerName;
let nameButton;
let nameField;
let runGameOver = false;
let entities;
let powerupArray = [];
let powerupSpriteGroup;
let activePowerups = [];


//grub
let grub = [];
let grubMouthGroup;

//____________________________________________________________PLAYER
let playerEntity;

//img
let playerImg;
let playerShootAnimation;
let playerMissileImgLeft;
let playerMissileImgRight;
let playerExplosionSpriteSheet;
let crosshairImg;

//sprite
let crosshairSprite;
let playerMissile;
let playerTarget;
let playerExplosionSprite;

//sprite group
let playerMissileGroup;
let playerTargetGroup;
let playerExplosionGroup;

//animation
let playerExplosionAnimation;


//____________________________________________________________ENEMY
let enemyEntities = []; //JSON array
let enemyArray = [];  //array containing info from JSON array
let enemyMissile; //sprite
let enemyMissileGroup;
let enemyExplosionGroup;  //group of explosion sprites
let cherrySplit;
//____________________________________________________________STATE
let currentState = 0;
const LOADING = 0;
const MAIN_MENU = 1;
const MAIN_GAME = 2;
const CREDITS = 3;
const DEAD = 4
const LEADERBOARD = 5;
const TUTORIAL = 6;

let grubDelay = 0;  //used to create a delay between the last grub death and the death screen

//____________________________________________________________LOADING SCREEN
let backGround;

//____________________________________________________________MAIN MENU

//____________________________________________________________MAIN GAME
let mainGameBG;
let score = 0;
let wave = 1;
let highScore = 0;
let powerupSprite;

let leaderBoard = [];


function preload() {
  //audio
  chomp = loadSound("assets/audio/chomp.mp3");
  grubDeath = loadSound("assets/audio/grubDeath.mp3");

  playerShootSound = loadSound("assets/audio/playershoot.mp3");
  splat = loadSound("assets/audio/splat.mp3");
  empty = loadSound("assets/audio/empty.mp3");
  powerupSound = loadSound("assets/audio/powerup.mp3");
  click = loadSound("assets/audio/click.mp3");
 
  //video
  tutorialVideos[0] = createVideo("assets/video/tut1.mp4");
  tutorialVideos[1] = createVideo("assets/video/tut1.mp4");
  tutorialVideos[2] = createVideo("assets/video/tut2.mp4");
  tutorialVideos[3] = createVideo("assets/video/tut3.mp4");

  for (let i = 0; i < tutorialVideos.length; i++) {
    tutorialVideos[i].looping = true;
    tutorialVideos[i].size(500, 500); 
    tutorialVideos[i].volume(0);
    tutorialVideos[i].loop();
    tutorialVideos[i].hide();
    tutorialVideos[i].position(250, 200);
  }

  //entities
  entities = loadJSON("entities.json", assignToEntities);


  //loading
  backGround = loadImage("assets/img/scene/BG.png");
  uiFont = loadFont("assets/font/BeVietnamPro-SemiBold.ttf");

  hamAnimation = loadAnimation(
    "assets/img/scene/hamAnim_1.png",
    "assets/img/scene/hamAnim_2.png",
    "assets/img/scene/hamAnim_3.png",
    "assets/img/scene/hamAnim_4.png"
  )

}


function assignToEntities() { //reads the entities.json file and assigns images and values
  //player
  playerEntity = entities.player;
  playerImg = loadImage(playerEntity.imagePath);
  playerShootAnimation = loadAnimation(
    "assets/img/player/animation/burgerCannon1.png",
    "assets/img/player/animation/burgerCannon2.png",
    "assets/img/player/animation/burgerCannon3.png",
    "assets/img/player/animation/burgerCannon4.png",
    "assets/img/player/animation/burgerCannon5.png"
  );
  playerShootAnimation.looping = false;
  playerMissileImgLeft = loadImage(playerEntity.missilePathLeft);
  playerMissileImgRight = loadImage(playerEntity.missilePathRight);
  playerExplosionSpriteSheet = loadSpriteSheet(playerEntity.spriteSheetPath, 128, 128, 24);
  playerExplosionAnimation = loadAnimation(playerExplosionSpriteSheet)
  playerExplosionAnimation.looping = false;
  playerExplosionAnimation.frameDelay = 8;
  crosshairImg = loadImage(playerEntity.crosshairPath);
  
  //explosion for explosion radius powerup
  playerExplosionSpriteSheetLarge = loadSpriteSheet("assets/img/player/burgerExplosionLarge.png", 256, 256, 24)
  playerExplosionAnimationLarge = loadAnimation(playerExplosionSpriteSheetLarge)
  playerExplosionAnimationLarge.looping = false;
  playerExplosionAnimationLarge.frameDelay = 8;


  //fill enemyArray with arrays containing information about each entity from entities.json
  //loading enemy information in this way makes it much easier to add or remove enemy types
  enemyEntities = entities.enemy;
  for (let i = 0; i < enemyEntities.length; i++) {
    //assets
    enemyArray[i] = new Array(); //array created to store name, image, spritesheet, animation of each enemy
    enemyArray[i].img = loadImage(enemyEntities[i].imagePath);
    enemyArray[i].spriteSheet = loadSpriteSheet(enemyEntities[i].spriteSheetPath, 64, 64, 24);
    enemyArray[i].explosionAnimation = loadAnimation(enemyArray[i].spriteSheet);
    enemyArray[i].explosionAnimation.looping = false;

    //values
    enemyArray[i].name = enemyEntities[i].name;
    enemyArray[i].explosionAnimation.frameDelay = 8;
    enemyArray[i].damage = enemyEntities[i].damage;
    enemyArray[i].score = enemyEntities[i].score;
  }

  //powerup information is loaded into powerupArray
  powerupEntities = entities.powerup;
  for (let i = 0; i < powerupEntities.length; i++) {
    //assets
    powerupArray[i] = new Array();//array created to store name, desc, image and values of each powerups
    powerupArray[i].img = loadImage(powerupEntities[i].imagePath);

    //values
    powerupArray[i].name = powerupEntities[i].name;
    powerupArray[i].description = powerupEntities[i].description;
    powerupArray[i].duration = int(powerupEntities[i].duration);
    powerupArray[i].value = int(powerupEntities[i].value);
    
    //other
    powerupArray[i].timer = 500;
    powerupArray[i].active = false;
  }
}


function setup() {
  createCanvas(1000, 800);
  frameRate(60);

  //html inputs
  nameField = createInput();
  nameField.size(100, 15);
  nameField.position(425, 490);
  nameField.hide();

  nameButton = createButton("play");
  nameButton.size(50, 21);
  nameButton.position(nameField.x + nameField.width, nameField.y);
  nameButton.hide();

  tutorialNextButton = createButton("Next");
  tutorialNextButton.size(100, 50);
  tutorialNextButton.position(650, 730);
  tutorialNextButton.style("background-color", "white");
  tutorialNextButton.style("border-radius", "14px");
  tutorialNextButton.value(1);
  tutorialNextButton.hide();

  tutorialBackButton = createButton("Back");
  tutorialBackButton.size(100, 50);
  tutorialBackButton.position(250, 730);
  tutorialBackButton.style("background-color", "white");
  tutorialBackButton.style("border-radius", "14px");
  tutorialBackButton.value(-1);
  tutorialBackButton.hide();

  //p5 play sprite groups
  playerMissileGroup = new Group();
  playerTargetGroup = new Group();
  playerExplosionGroup = new Group();
  enemyMissileGroup = new Group();
  enemyExplosionGroup = new Group();
  powerupSpriteGroup = new Group();
  
  //sprite used for cherry splitting
  cherrySplit = createSprite(500, 300, width, 10);
  cherrySplit.visible = false;

  hamAnimation.frameDelay = 32;

  player.initialise();
  player.crosshair.initialise();

  grubMouthGroup = new Group();

  grub[0] = new Grub(1 * width/6, 750);
  grub[1] = new Grub(2 * width/6, 750);
  grub[2] = new Grub(4 * width/6, 750);
  grub[3] = new Grub(5 * width/6, 750);

  for (let i = 0; i < grub.length; i++) { //create sprites for mouth collision detection as mixing arrays and p5 play groups doesn't work well
    grubMouth = createSprite(grub[i].mouthX, grub[i].mouthY, 20, 20);
    grubMouth["index"] = i;
    grubMouth.visible = false;
    grubMouthGroup.add(grubMouth);
  }
}


function keyPressed() {
  //launches a missile to the crosshair when space is pressed only if ammoCount > 1 and the player has submitted a name
  if (keyCode == 32 && player.ammoCount > 0 && playerName !== undefined) {
    playerShootSound.play();
    playerSprite.changeAnimation("shoot");
    playerSprite.animation.rewind();
    new Missile().player(player.cx, player.cy, crosshairSprite.position.x, crosshairSprite.position.y);
    player.ammoCount--;
  }
  
  else if (keyCode == 32 && player.ammoCount <= 0) {  //if no ammo left, play empty click noise
    empty.play();
  }
}


let player = {

  cx: 500,
  cy: 720,

  ammoCount: 10,
  ammoCapacity: 15,

  missileSpeed: 3,  //player missile speed
  missileSpeedDefault: 3,

  explosionRadius: 60,  //player missile explosion redius
  explosionRadiusDefault: 60,

  reloadTime: 5, //player reload time in seconds
  reloadTimer: 0,  //counter that increments each frame separate from the main frameCount. Only increments when ammo is < 1

  initialise: function() {
    playerSprite = createSprite(this.cx, this.cy);
    playerSprite.addImage(playerImg);
    playerSprite.addAnimation("shoot", playerShootAnimation);
    playerSprite.depth = 2;
  },

  draw: function() {
    this.ammoCount = constrain(this.ammoCount, 0, this.ammoCapacity)

    //makes sure the cannon is facing the crosshair
    let a = atan2(this.cy - crosshairSprite.position.y, this.cx - crosshairSprite.position.x);
    playerSprite.rotation = a * 180/PI;
    stroke(50);
    strokeWeight(10);
    line(this.cx, this.cy, this.cx, this.cy+50);


    //missile reload when ammo < 1
    if (this.ammoCount < 1) {
      this.reloadTimer++;
      if (this.reloadTimer / 60 > this.reloadTime) {
        this.reloadTimer = 0;
        this.ammoCount = 1;
      }
    }

  },

  crosshair: {

    DEFAULT_CROSSHAIR_X: 500,
    DEFAULT_CROSSHAIR_Y: 500,
    crosshairSpeed: 5,
  
    initialise: function() {
      crosshairSprite = createSprite(this.DEFAULT_CROSSHAIR_X, this.DEFAULT_CROSSHAIR_Y);
      crosshairSprite.addImage(crosshairImg);
      crosshairSprite.depth = 5;
    },
  
    input: function() {
      //up/down/left/right controls for the crosshair
      if (keyIsDown(UP_ARROW)) {
        crosshairSprite.position.y -= this.crosshairSpeed;
      }
      if (keyIsDown(DOWN_ARROW)) {
        crosshairSprite.position.y += this.crosshairSpeed;
      }
      if (keyIsDown(LEFT_ARROW)) {
        crosshairSprite.position.x -= this.crosshairSpeed;
      }
      if (keyIsDown(RIGHT_ARROW)) {
        crosshairSprite.position.x += this.crosshairSpeed;
      }
    },

    keepInBounds: function()
    {
      if (crosshairSprite.position.x < 0) {
        crosshairSprite.position.x += this.crosshairSpeed;
      }
      
      if (crosshairSprite.position.x > width) {
        crosshairSprite.position.x -= this.crosshairSpeed;
      }

      if (crosshairSprite.position.y < drawMenu.MAIN_GAME_UI_TOP_END_Y) {
      crosshairSprite.position.y += this.crosshairSpeed;
      }
      
      if (crosshairSprite.position.y > drawMenu.MAIN_GAME_UI_BOTTOM_START_Y) {
        crosshairSprite.position.y -= this.crosshairSpeed;
      }
    },
  },
}


let enemyAttack = { //determines how often non-player missiles are launched

  pointsPerWave: 100, //score required to reach the next wave
  multiplier: 1,
  
  run: function() {

    //% chance of each item being spawned per second

    //enemy missiles
    let carrotChance = this.multiplier * 15;
    let strawberryChance = this.multiplier * 4;
    let cherrySingleChance = this.multiplier * 3;  
    let cherryDoubleChance = this.multiplier * 2;  

    //powerups
    let extrasauceChance = this.multiplier * 0.5;
    let extraspeedChance = this.multiplier * 0.5;
    let ammoChance = this.multiplier * 3;


    //first make sure at least one grub is still alive, otherwise program can hang
    if ((grub[0].alive == true) || (grub[1].alive == true) || (grub[2].alive == true) || (grub[3].alive == true)) {
      
      //the wave increases by 1 for every pointsPerWave
      if (score % this.pointsPerWave == 0 && score >= this.pointsPerWave) {
        wave = score / this.pointsPerWave + 1;
      }
      
      //difficulty multiplier increases for each wave
      this.multiplier = 1 + wave / 10;


      //carrot missile
      if (random(0, 60) * 60 < carrotChance) {
        new Missile().enemy("carrot", 1, random(0, width), -50, getLivegrubMouth("X"), getLivegrubMouth("Y"));
      }
  
      //strawberry missile
      if(random(0, 60) * 60 < strawberryChance && wave > 3) {
        new Missile().enemy("strawberry", 3, random(0, width), -50, getLivegrubMouth("X"), getLivegrubMouth("Y"));
      }  

      //single cherry missiles
      if (random(0, 60) * 60 < cherrySingleChance && wave > 5) {
        let grubX = getLivegrubMouth("X");
        new Missile().enemy("cherrySingle", 2, grubX, -50, grubX, getLivegrubMouth("Y"));
      }

      //double cherry missiles
      if (random(0, 60) * 60 < cherryDoubleChance && wave > 7) {
        let grubX = getLivegrubMouth("X");
        new Missile().enemy("cherryDouble", 1, grubX, -50, grubX, getLivegrubMouth("Y"));
      }


      //explosion radius powerup
      if (random(0, 60) * 60 < extrasauceChance) {
        let mX = random(0, width);
        new Missile().powerup("extra sauce", 1, mX, -50, mX, 770);
      }
    
      //missile speed powerup
      if (random(0, 60) * 60 < extraspeedChance) {
        let mX = random(0, width);
        new Missile().powerup("faster missiles", 1, mX, -50, mX, 770);
      }
  
      //ammo pickup
      if (random(0, 60) * 60 <  ammoChance) {
        let mX = random(0, width);
        new Missile().powerup("ammo", 1, mX, -50, mX, 770);
      }
    }
  },
}


let Missile = class {

  constructor(index) {
    this.index = index;
  }

  player(originX, originY, targetX, targetY) {
    playerMissile = createSprite(originX, originY, 10, 10);
    //since the "missile" is assymetrical, there are two images for each side of the screen
    if (crosshairSprite.position.x <= width/2) {
      playerMissile.addImage(playerMissileImgLeft);
    }

    else if (crosshairSprite.position.x > width/2) {
      playerMissile.addImage(playerMissileImgRight);
    }
  
    playerMissile.attractionPoint(player.missileSpeed, targetX, targetY);
    playerMissile.rotateToDirection = true;
    playerMissile.depth = 1;

    //an invisible sprite is created to act as the target point for the sprite.
    //arrays with coordinates in them could have been used
    //but i found it easier to work with sprites
    playerTarget = createSprite(targetX, targetY, 10, 10);
    playerTarget.visible = false;

    //targets and missiles are given a finite lifespan in case they never collide
    //this prevents collisions from happening where they shouldn't
    playerMissile.life = 1000;
    playerTarget.life = 1000;

    //missile and target are added to groups
    playerMissileGroup.add(playerMissile);
    playerTargetGroup.add(playerTarget);
  }

  enemy(TYPE, SPEED, originX, originY, targetX, targetY) {
    //iterate through enemyArray to find the information for the missile type specified
    enemyMissile = createSprite(originX, originY, 10, 10);
    for (let i = 0; i < enemyArray.length; i++) {
      if (enemyArray[i].name == TYPE) {
        this.index = i;
      }
    }

    enemyMissile.addImage(enemyArray[this.index].img);
    enemyMissile.attractionPoint(SPEED, targetX, targetY);
    enemyMissile.rotateToDirection = true;
    enemyMissile.setCollider("circle", 0, 0, 15);
    enemyMissile.depth = 0;
    enemyMissile.life = 2000;
    enemyMissile["TYPE"] = TYPE;
    
    enemyMissile["damage"] = int(enemyArray[this.index].damage);
    enemyMissile["score"] = int(enemyArray[this.index].score);

    enemyMissileGroup.add(enemyMissile);
  }

  //powerups are considered a type of missile, this is easier and uses less code than creating a separate class
  powerup(TYPE, SPEED, originX, originY, targetX, targetY) {
    //like with the enemy missiles, powerupArray is iterated through to generate the powerup specified
    powerupSprite = createSprite(originX, originY, 10, 10);
    for (let i = 0; i < powerupArray.length; i++) {
      if (powerupArray[i].name == TYPE) {
        this.index = i;
      }
    }
    powerupSprite.addImage(powerupArray[this.index].img);
    powerupSprite.attractionPoint(SPEED, targetX, targetY);
    powerupSprite.setCollider("circle", 0, 0, 15);
    powerupSprite.depth = 0;
    powerupSprite.life = 1000;
    powerupSprite["TYPE"] = TYPE;
    powerupSpriteGroup.add(powerupSprite);
  }
}

let missileCollisions = {

  run: function() {
    playerMissileGroup.overlap(playerTargetGroup, missileCollisions.playerMissile_playerTarget);
    enemyMissileGroup.overlap(playerExplosionGroup, missileCollisions.enemyMissile_playerExplosion);
    powerupSpriteGroup.overlap(playerExplosionGroup, missileCollisions.playerExplosion_powerup);
    enemyMissileGroup.overlap(grubMouthGroup, missileCollisions.enemyMissile_grubMouth)
    enemyMissileGroup.overlap(cherrySplit, missileCollisions.splitCherry);

    //shrinks the collider for explosion sprites to keep them roughly the same size as the animation
    for (let i = 0; i < playerExplosionGroup.length; i++) {
      let diam = playerExplosionGroup[i].collider.radius;
      //if the explosion radius powerup is active the radius shrinks faster
      if (powerupArray[0].active == true) {
        diam -= 0.4;
      }
      else {
        diam -= 0.2;
      }
      playerExplosionGroup[i].setCollider("circle", 0, 0, diam)
    }

    for (let i = 0; i < enemyExplosionGroup.length; i++) {
      let diam = enemyExplosionGroup[i].collider.radius;
      diam -= 0.2;
      enemyExplosionGroup[i].setCollider("circle", 0, 0, diam)
    }

  },
  
  playerMissile_playerTarget: function(playerMissile, playerTarget) {  //triggered when a player missile hits its target
    //find the index position of the overlapping missile and target to ensure they are of the same index position
    //without this, missiles can collide with the wrong target
    let playerMissileindex = playerMissileGroup.indexOf(playerMissile);
    let playerExplosionindex = playerTargetGroup.indexOf(playerTarget);

    if (playerMissileindex == playerExplosionindex) {

      //check to see if explosion radius powerup is active to decide which explosion sprite to load
      if (powerupArray[0].active == true) {
        playerExplosionSprite = createSprite(playerTarget.position.x, playerTarget.position.y)
        playerExplosionSprite.addAnimation("explosionAnim", playerExplosionAnimationLarge);
        playerExplosionSprite.setCollider("circle", 0, 0, player.explosionRadius);
        playerExplosionSprite.life = 128;
        playerExplosionGroup.add(playerExplosionSprite);
      }

      else {
        playerExplosionSprite = createSprite(playerTarget.position.x, playerTarget.position.y)
        playerExplosionSprite.addAnimation("explosionAnim", playerExplosionAnimation);
        playerExplosionSprite.setCollider("circle", 0, 0, player.explosionRadius);
        playerExplosionSprite.life = 128;
        playerExplosionGroup.add(playerExplosionSprite);  
      }

      splat.play();
      //remove the missile which just exploded and its target sprite
      playerMissile.remove();
      playerTarget.remove();
    }
  },
  
  enemyMissile_playerExplosion: function(enemyMissile, b) { //triggered when an enemy missile overlaps a player explosion
    
    //add to the player score
    score += enemyMissile.score;
    splat.play();
    missileCollisions.enemyMissileExplode(enemyMissile); //assigns the correct explosion animation and removes the sprite
  },

  playerExplosion_powerup: function(powerup) {  //triggered when a powerup overlaps a player explosion
    powerupIndex = powerupSpriteGroup.indexOf(powerup);

    for (let i = 0; i < powerupArray.length; i++) {
      if (powerupArray[i].name == powerup.TYPE) {
        //timer is reset in case player already has this powerup
        powerupArray[i].timer = 0;
        powerupArray[i].active = true;
      }
    }
    powerupSound.play();
    powerup.remove();
  },

  splitCherry: function(enemyMissile) {
    if (enemyMissile.TYPE == "cherryDouble") {
      new Missile().enemy("cherrySingle", 2, enemyMissile.position.x, enemyMissile.position.y, getLivegrubMouth("X"), getLivegrubMouth("Y"));
      new Missile().enemy("cherrySingle", 2, enemyMissile.position.x, enemyMissile.position.y, getLivegrubMouth("X"), getLivegrubMouth("Y"));
      enemyMissile.remove();
    }
  },

  enemyMissile_grubMouth: function(enemyMissile, grubMouth) {
    missileCollisions.enemyMissileExplode(enemyMissile);
    grub[grubMouth.index].health -= enemyMissile.damage;
    chomp.play();

    if (grub[grubMouth.index].health < 1) {
      grubDeath.play();
      grubMouth.remove();
    }
  },
  
  enemyMissileExplode: function(enemyMissile) {
    //a loop is used to determine which type of enemy missile has collided and assigns the correct explosion animation
    
    enemyExplosionSprite = createSprite(enemyMissile.position.x, enemyMissile.position.y);
    
    for (let i = 0; i < enemyArray.length; i++) {
      if (enemyMissile.TYPE == enemyArray[i].name) {
        enemyExplosionSprite.addAnimation("explosionAnim", enemyArray[i].explosionAnimation);
      }
    }
    enemyExplosionSprite.setCollider("circle", 0, 0, 30);
    enemyExplosionSprite.life = 128;
    enemyExplosionGroup.add(enemyExplosionSprite);

    //remove the enemy missile
    enemyMissile.remove();
  },
}


/*
function powerupTiming(i, val, defaultVal) {

  if (powerupArray[i].active == true) {
    val = powerupArray[i].value;

    if ((60 * powerupArray[i].duration) / powerupArray[i].timer < 1) {
      powerupArray[i].active = false;
    }

    console.log(val);
    console.log(defaultVal);

    if (60 * powerupArray[i].timer < 5){
      fill(0, 100, 0);
      rect(400, 0, 600, 30); //rect acting as background in case picks up two powerups at once
      fill(255);
      textSize(26);
      textAlign(RIGHT, TOP);
      text(powerupArray[i].description, width, 0);
    }
    powerupArray[i].timer++;
  }

  else if (powerupArray[i].active == false) {
    powerupArray[i].active = false;
    powerupArray[i].timer = 0;
    val = defaultVal;
  }

  return val;
}
*/

function powerupActive() {
  //I would have liked to have the program automatically change variables described in entities.json
  //but i couldn't figure out how so I assigned the variables for each powerup to change manually


  //powerupTiming(0, player.explosionRadius, player.explosionRadiusDefault);

  //there is a function commented out above which I also tried using
  //I couldn't get it to change variables of the player object 


  //explosion radius
  if (powerupArray[0].active == true) {
    player.explosionRadius = powerupArray[0].value;

    if ((60 * powerupArray[0].duration) / powerupArray[0].timer < 1) {
      powerupArray[0].active = false;
      powerupArray[0].timer = 0;
      player.explosionRadius = player.explosionRadiusDefault;
    }

    if (powerupArray[0].timer / 60 < 3){
      fill(0, 100, 0);
      rect(400, 0, 600, 30); //rect acting as background in case picks up two powerups at once
      fill(255);
      textSize(26);
      textAlign(RIGHT, TOP);
      text(powerupArray[0].description, width, 0);
    }
    powerupArray[0].timer++;
  }


  //missile speed
  if (powerupArray[1].active == true) {
    player.missileSpeed = powerupArray[1].value;
  
    if ((60 * powerupArray[1].duration) / powerupArray[1].timer < 1) {
      powerupArray[1].active = false;
      powerupArray[1].timer = 0;
      player.missileSpeed = player.missileSpeedDefault;
    }
  
    if (powerupArray[1].timer / 60 < 3){
      fill(0, 100, 0);
      rect(400, 0, 600, 30);
      fill(255);
      textSize(26);
      textAlign(RIGHT, TOP);
      text(powerupArray[1].description, width, 0);
    }
    powerupArray[1].timer++;
  }


  //ammo pickup
  if (powerupArray[2].active == true) {
    powerupArray[2].timer = 0;
    player.ammoCount += powerupArray[2].value;
    powerupArray[2].active = false;  
  }

  if (powerupArray[2].timer / 60 < 3){
    fill(0, 100, 0);
    rect(400, 0, 600, 30);
    fill(255);
    textSize(26);
    textAlign(RIGHT, TOP);
    text(powerupArray[2].description, width, 0);
  }

  powerupArray[2].timer++;

}

let Grub = class {

  constructor(bottomX, bottomY) {

    this.bottomX = bottomX;
    this.bottomY = bottomY;
    this.bottomXDefault = bottomX;
    this.bottomYDefault = bottomY;

    this.torsoX = bottomX;
    this.torsoY = bottomY - 50;
    this.torsoSizeX = 75;
    this.torsoSizeY = 60
    this.breatheSpeed = 0.05 * random(1, 2);

    this.headX = this.torsoX;
    this.headY = this.torsoY - 35

    this.mouthX = this.bottomX;
    this.mouthY = this.bottomY - 80;

    this.eyeXL = this.headX - 15;
    this.eyeXR = this.headX + 15;
    this.eyeY = this.headY - 5;
    this.eyesOpen = true;

    this.health = 10;
    this.red = 250;
    this.bodyGreen = 200;
    this.mouthGreen = 50;
    this.bodyBlue = 200;
    this.alive = true;
  }

  run() {

    this.draw();
    if (this.alive == true) {
      this.blink();
      this.breathe();
      this.eatMissiles();
    }
  }

  draw() {
    strokeWeight(2);
    stroke(250, 150, 150);

    //body
    fill(this.red, this.bodyGreen, this.bodyBlue)
    ellipse(this.bottomX, this.bottomY, 100, 95); //bottom
    ellipse(this.torsoX, this.torsoY, this.torsoSizeX, this.torsoSizeY) //torso
    ellipse(this.headX, this.headY, 50) //head
    
    if (this.health > 5) {
      this.alive = true;
      //high-health colours
      this.red = 250;
      this.bodyGreen = 200;
      this.bodyBlue = 200;
      this.mouthGreen = 50;
    }

    if (this.health <= 5) {
      //low-health colours
      this.red = 250;
      this.bodyGreen = 100;
      this.bodyBlue = 100;
      this.mouthGreen = 50;
    }

    //death
    if (this.health <= 0) {
      this.alive = false;

      stroke(0);
      ellipse(this.eyeXL, this.bottomY, 8, 2); //left eye
      ellipse(this.eyeXR, this.bottomY, 8, 2); //right eye
      
      //body position
      this.torsoY = this.bottomY;
      this.headY = this.bottomY;
      this.eyeY = this.bottomY;
    }
  }

  blink() {
    if (this.health > 0) { 
    
      if (frameCount % 120 == 0) {
        this.eyesOpen = !this.eyesOpen;
      }

      fill(0);

      if (this.eyesOpen == true) {
        ellipse(this.eyeXL, this.eyeY, 10, 5); //left eye closed
        ellipse(this.eyeXR, this.eyeY, 10, 5); //right eye closed
      }

      else {
        circle(this.eyeXL, this.eyeY, 10); //left eye open
        circle(this.eyeXR, this.eyeY, 10); //right eye open
      }
    }
  }

  breathe() {
    
    let MouthXDiam = 20;
    let openMouthTopY;
    let openMouthBottomY;
    let closedMouthTopY;
    let closedMouthBottomY; 

    if (this.health > 5) {
      openMouthTopY = 10
      openMouthBottomY = 20
      closedMouthTopY = 5;
      closedMouthBottomY = 10; 
    }
    else {
      openMouthTopY = 15
      openMouthBottomY = 5
      closedMouthTopY = 5;
      closedMouthBottomY = 1; 
    }


    fill(255, 100, 100);

    if (this.health > 0) { 
 
      if (this.torsoSizeX > 80 || this.torsoSizeX < 75) {
        this.breatheSpeed = -this.breatheSpeed;
      }
    
      if (this.breatheSpeed > 0) { //breathe in

        arc(this.mouthX, this.mouthY, MouthXDiam, openMouthTopY, PI, 0);
        arc(this.mouthX, this.mouthY, MouthXDiam, openMouthBottomY, 0, PI);
      }
      
      else if (this.breatheSpeed < 0) {  //breathe out

        arc(this.mouthX, this.mouthY, MouthXDiam, closedMouthTopY, PI, 0);
        arc(this.mouthX, this.mouthY, MouthXDiam, closedMouthBottomY, 0, PI);
      }

      this.torsoSizeX += this.breatheSpeed;
      this.torsoSizeY += this.breatheSpeed;
      this.headY -= this.breatheSpeed;
      this.eyeY -= this.breatheSpeed;
      this.mouthY -= this.breatheSpeed;
    }



  }

  eatMissiles() {

    fill(255, 100, 100)

    if (enemyMissileGroup.length > 0) {

      for (let i = 0; i < enemyMissileGroup.length; i++) {

        if (dist(enemyMissileGroup[i].position.x, enemyMissileGroup[i].position.y, this.mouthX, this.mouthY) < 100) {
          arc(this.mouthX, this.mouthY, -20, 20, 0, PI);
          arc(this.mouthX, this.mouthY, -20, 20, PI, 0);
        }
      }
    }
  }

  reset() {

    this.bottomX = this.bottomXDefault;
    this.bottomY = this.bottomYDefault;
    
    this.torsoX = this.bottomX;
    this.torsoY = this.bottomY - 50;
    this.torsoSizeX = 75;
    this.torsoSizeY = 60
    this.breatheSpeed = 0.05 * random(1, 2);

    this.headX = this.torsoX;
    this.headY = this.torsoY - 35

    this.mouthX = this.bottomX;
    this.mouthY = this.bottomY - 80;

    this.eyeXL = this.headX - 15;
    this.eyeXR = this.headX + 15;
    this.eyeY = this.headY - 5;
    this.eyesOpen = true;

    this.health = 10;
    this.red = 250;
    this.bodyGreen = 200;
    this.mouthGreen = 50;
    this.bodyBlue = 200;
    this.alive = true;

  }
}

function getLivegrubMouth(val) {  //generates a random living grub coordinate
  
  let i = int(random(0, 4));

  while (grub[i].alive == false) {
    i = int(random(0, 4));
  }
  if (val == "X") {
    return grub[i].mouthX;
  }
  else if (val == "Y") {
    return grub[i].mouthY;
  }
}


function gameOver() { //resets game altering variables
  if (runGameOver == true) {
    //player
    playerName = undefined;
    player.cx = 500;
    player.cy = 720;
    player.ammoCount = 10;
    player.ammoCapacity = 15;
    player.missileSpeed = 3;
    player.missileSpeedDefault = 3;
    player.explosionRadius = 60;
    player.explosionRadiusDefault = 60;
    player.reloadTime = 5;
    player.reloadTimer = 0; 

    //player.crosshair
    player.crosshair.DEFAULT_CROSSHAIR_X = 500;
    player.crosshair.DEFAULT_CROSSHAIR_Y = 500;
    player.crosshair.crosshairSpeed = 5;
    player.crosshair.BOUNDING_BOX_X = 1000;
    player.crosshair.BOUNDING_BOX_Y = 770;
    crosshairSprite.position.x = 500;
    crosshairSprite.position.y = 400;


    currentState = 1;
    score = 0;
    wave = 1;

    grubDelay = 0;

    for (let i = 0; i < grub.length; i++) {
      grub[i].reset();  //resets all grub values
      
      grubMouth = createSprite(grub[i].mouthX, grub[i].mouthY, 20, 20); //create grub mouth sprite
      grubMouth["index"] = i;
      grubMouth.visible = false;
      grubMouthGroup.add(grubMouth);
    }


    //turn all active powerups off
    for (let i = 0; i < powerupArray.length; i++) {
      powerupArray[i].active = false;
    }

    //remove sprite groups
    playerMissileGroup.removeSprites();
    playerTargetGroup.removeSprites();
    playerExplosionGroup.removeSprites();
    powerupSpriteGroup.removeSprites();
    enemyMissileGroup.removeSprites();
    
    nameField.value("");//clear player name

    //update high score
    for (let i = 0; i < leaderBoard.length; i++) {
      if (leaderBoard[i][1] > highScore) {
        highScore = leaderBoard[i][1];
      }
    }

    sortScores(leaderBoard);  //sort leaderboard from highest to lowest

    runGameOver = false;  //turn off this function
  }
}

function sortScores(array) {  //sorts a 2D array by the value of the second indice of each element within from highest to lowest
  for (let i = 0; i < array.length; i++) {
    for (let y = 0; y < array.length - i - 1; y++) {
      if (array[y+1][1] < array[y][1]) {
        [array[y][0], array[y+1][0]] = [array[y+1][0], array[y][0]];
        [array[y][1], array[y+1][1]] = [array[y+1][1], array[y][1]];
      }
    }
  }
  array.reverse();
  return array;
}


let drawMenu = {

  MAIN_GAME_UI_TOP_END_Y: 30,
  MAIN_GAME_UI_BOTTOM_START_Y: 770,
  uiElementsX: [],

  tutorialPageNumber: 1,
  tutorialText: [
    "",
    "Increase your score by stopping the health-terrified from being force fed healthy foods.",
    "Enough healthy food will kill them, some food will hurt them more than others.",
    "Powerups will make your attacks stronger. Try to get as high a score as possible",
  ],

  programmingCredits: [
    ["Programming", "Michael Ellicott"],
    ["User Interface", "Michael Ellicott"]
  ],
  
  artCredits: [
    ["Background art (modified)", "Paulina Riva"],
    ["Food Sprites", "magdum"],
    ["Explosion sprite (modified)", "qubodup"],
    ["Speed and Sauce powerup", "Michael Ellicott"],
    ["Audio", "Michael Ellicott"],
    [""],
    [""],
    [""],
    [""],
    [""],
    ["FULL ACCREDITATION IN LICENCES.TXT", ""]
  ],

  loadScreen: function() {
    background(backGround);

    //text
    fill(255);
    textSize(64);
    textFont(uiFont);
    textAlign(CENTER, CENTER);
    text("loading...", width/2, 500)

    animation(hamAnimation, 300, 510);

    //waits so the program appears to be loading
    if (frameCount % 240 == 0) {
      currentState = MAIN_MENU;
    }
  },

  mainMenu: function() {
    background(backGround);
    drawMenu.uiHeader("FOOD COMMAND");

    drawMenu.button("Play", 500, 400, 150, 50, MAIN_GAME);
    drawMenu.button("Leaderboard", 500, 500, 170, 50, LEADERBOARD);
    drawMenu.button("Credits", 500, 600, 150, 50, CREDITS);
    drawMenu.button("How to play", 500, 700, 150, 50, TUTORIAL);
  },

  mainGame: function() {
    //top
    strokeWeight(0);
    fill(0, 100, 0);
    rect(0, 0, width, 30);
    fill(255);
    textAlign(LEFT, TOP);
    textSize(24);
    text("Powerups: ", 0, 0);

    //display active powerups at top of screen
    for (let i = 0; i < powerupArray.length; i++) {
      if (powerupArray[i].active == true && i != 2) {
        image(powerupArray[i].img, 200 + 50 * -i, 0, 30, 30);
      }
    }

    //bottom

    fill(0, 100, 0);
    rect(0, 770, width, 50);  //background

    //lines dividing bottom ui elements
    for (let i = 0; i < 6; i++) {
      strokeWeight(1);
      line((width/6)*i, 771, (width/6)*i, 800);
      this.uiElementsX[i] = (width/6)*i + (width/6)*1/2;
    }

    textAlign(CENTER, CENTER);
    fill(255);

    noStroke();
    //ammo counter
    text("Ammo: " + player.ammoCount, this.uiElementsX[0], 785);

    //reload bar
    if (player.ammoCount < 1) { //only runs when player has no ammo
      if (player.reloadTimer/60 < player.reloadTime) {
        fill(200, 0, 0);
      }
      else {
        fill(0, 200, 0);
      }
      let reloadBarWidth = (player.reloadTimer/player.reloadTime)/60 * (width/6)
      rect(this.uiElementsX[1] - (1/2) * (width/6), 770, reloadBarWidth, 50);
    }

    else {
      fill(0, 200, 0);
      rect(this.uiElementsX[1] - (1/2) * (width/6), 770, width/6, 50);
    }

    fill(255);
    text("RELOAD", this.uiElementsX[1], 785);

    //wave counter
    text("Wave: " + wave, this.uiElementsX[2], 785);

    //score counter
    text("Score: " + score, this.uiElementsX[3], 785);

    //high score
    text("High: " + highScore, this.uiElementsX[4], 785);

    //player name
    text(playerName, this.uiElementsX[5], 785);



  },

  death: function() {
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text("GAME OVER", 500, 450);
    drawMenu.button("MAIN MENU", 500, 500, 130, 50, LOADING);
  },

  credits: function() {
    background(backGround);

    drawMenu.button("Back", 80, 50, 100, 50, MAIN_MENU);  //back button
    drawMenu.uiHeader("CREDITS");
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    fill(255);
    rect(250, 500, 450, 550); //white background
    rect(750, 500, 450, 550); //white background

    //LEFT
    textFont(uiFont);
    fill(200);
    rect(250, 260, 420, 50);
    fill(0);
    textSize(20);
    text("Programming", 250, 260);
    for (let i = 0; i < this.programmingCredits.length; i++) {
      textFont(uiFont);
      textAlign(LEFT, CENTER);
      text(this.programmingCredits[i][0], 40, 320 + 40*i);
     
      textAlign(RIGHT, CENTER);
      textFont("Helvetica");
      text(this.programmingCredits[i][1], 460, 320 + 40*i);
    }

    //RIGHT
    textFont(uiFont);
    fill(200);
    rect(750, 260, 420, 50);
    fill(0);
    text("Art", 750, 260);
    for (let i = 0; i < this.artCredits.length; i++) {
      textFont(uiFont);
      textAlign(LEFT, CENTER);
      text(this.artCredits[i][0], 540, 320 + 40*i);
     
      textAlign(RIGHT, CENTER);
      textFont("Helvetica");
      text(this.artCredits[i][1], 960, 320 + 40*i);
    }
  },

  leaderBoard: function() {
    background(backGround);
    drawMenu.button("Back", 80, 50, 100, 50, MAIN_MENU);  //back button

    drawMenu.uiHeader("LEADERBOARD"); //header
  
    //white background
    rectMode(CENTER);
    fill(255);
    rect(500, 500, 450, 550);

    //lines
    line(500, 225, 500, 775);
    for (let i = 0; i < 550; i += 50) {
      line(275, 225+i, 725, 225+i);
    }

    //name and score column
    textFont(uiFont);
    textSize(20);
    fill(0);
    textAlign(LEFT, CENTER);
    text("NAME", 280, 250);
    text("SCORE", 505, 250);

    //names and scores
    for (let i = 0; i < 10; i++) {  //only shows top 10 scores
      if (leaderBoard[i] !== undefined) {
        text((i+1) + ". " + leaderBoard[i][0], 280, 300 + 50*i);
        text(leaderBoard[i][1], 505, 300 + 50*i);
      }
    }

  },

  tutorial: function() {
    background(backGround);
    drawMenu.button("Back", 80, 50, 100, 50, MAIN_MENU);  //back button
    drawMenu.uiHeader("HOW TO PLAY"); //header

    if (this.tutorialPageNumber <= tutorialVideos.length - 2) { //the next button wont appear on last page
      tutorialNextButton.show();
    }
    
    else {
      tutorialNextButton.hide();
    }


    if (this.tutorialPageNumber > 1) {  //the back button wont appear on page 1
      tutorialBackButton.show();
    }
    else  {
      tutorialBackButton.hide();
    }

    tutorialNextButton.mousePressed(drawMenu.nextPage);
    tutorialBackButton.mousePressed(drawMenu.PrevPage);


    for (let i = 0; i < tutorialVideos.length; i++) { //only display the current page's corresponding video
      tutorialVideos[i].show();
      if (tutorialVideos[i] !== tutorialVideos[this.tutorialPageNumber]) {
        tutorialVideos[i].hide();
      }
    }

    textAlign(CENTER, CENTER);
    textSize(26);
    noStroke();
    fill(255);
    text(this.tutorialText[this.tutorialPageNumber], 500, 660, 500);
  },

  button: function(str, x, y, w, h, state) {
    if (mouseX > x - (w/2) && mouseX < x + (w/2) && mouseY > y - (h/2) && mouseY < y + (h/2)) {
      boxColor = 0;
      textColor = 255;

      if (state !== undefined && mouseIsPressed) {
        click.play();
        currentState = state;
      }
    }

    else {
      boxColor = 255;
      textColor = 0;
    }

    rectMode(CENTER);
    fill(boxColor);
    rect(x, y, w, h, 20);

    textFont(uiFont);
    strokeWeight(1);
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(textColor);
    text(str, x, y);
  },

  uiHeader: function(str) {
    noStroke();
    rectMode(CENTER)
    fill(0, 0, 0, 160);
    rect(500, 158, width, 80);

    fill(255);
    stroke(10);
    textSize(64);
    textFont(uiFont);
    textAlign(CENTER, CENTER);
    text(str, 500, 150);
  },

  takeName: function() {
    playerName = nameField.value();
    if (playerName === "")
    {
      playerName = "Player";
    }
  },

  nextPage: function() {
    click.play();
    drawMenu.tutorialPageNumber++;
  },

  PrevPage: function() {
    click.play();
    drawMenu.tutorialPageNumber--;
  }
}


function draw() {

  if (currentState !== TUTORIAL) {
    for (let i = 0; i < tutorialVideos.length; i++) {
      drawMenu.tutorialPageNumber = 1;
      tutorialNextButton.hide();
      tutorialBackButton.hide();
      tutorialVideos[i].hide();
    }
  }

  if (currentState == LOADING) {
    drawMenu.loadScreen();
  }

  else if (currentState == MAIN_MENU) {
    gameOver();
    drawMenu.mainMenu();
  }

  else if (currentState == MAIN_GAME) {
    background(backGround);

    //draw grub
    for (let i = 0; i < 4; i++) {
      grub[i].run();
    }
    //detect if all are dead, if so, change state to DEAD
    if ((grub[0].alive == false) && (grub[1].alive == false) && (grub[2].alive == false) && (grub[3].alive == false)) {
     
      grubDelay++;
     
      if (grubDelay / 60 == 1) {
        let boardPlayerName = playerName;
        let boardScore = score;
        let leaderBoardValues = new Array();
        leaderBoardValues[0] = boardPlayerName;
        leaderBoardValues[1] = boardScore;
        leaderBoard.push(leaderBoardValues);
        currentState = DEAD;
      }
    }



    drawSprites();
    player.draw();
    drawMenu.mainGame();


    ///game will only begin when a name has been submitted
    if (playerName == undefined) {
      text("Enter Name", 500, 470);
      nameField.show();
      nameButton.show();
    }

    else {
      nameField.hide();
      nameButton.hide();
      powerupActive();
      player.crosshair.input();
      player.crosshair.keepInBounds();
      enemyAttack.run();
      missileCollisions.run();
    }

    nameButton.mousePressed(drawMenu.takeName);
  }

  else if (currentState == DEAD) {
    runGameOver = true;
    drawMenu.death();
  }

  else if (currentState == CREDITS) {
    drawMenu.credits();
  }

  else if (currentState == LEADERBOARD) {
    drawMenu.leaderBoard();
  }

  else if (currentState == TUTORIAL) {
    drawMenu.tutorial();
  }
}