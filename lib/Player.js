class Player {

    constructor(x, y, idleSpriteSheet, walkSpriteSheet) {

        // vector for tracking crosshair
        this.crosshair = createVector(0, 0);
        this.collisionType = "normal";

        // sprite assets
        this.idleSpriteSheet = idleSpriteSheet;
        this.walkSpriteSheet = walkSpriteSheet;
        
        this.idleAnimation = loadAnimation(this.idleSpriteSheet);
        this.walkAnimation = loadAnimation(this.walkSpriteSheet);

        // sprite initialisation
        this.sprite = createSprite(x, y, 20, 20);

        this.sprite.addAnimation("idle", this.idleAnimation);
        this.sprite.addAnimation("walk", this.walkAnimation);
        this.sprite.addAnimation("death", playerDeathSpritesheet);
        
        this.sprite.changeAnimation("idle");

        this.sprite.setCollider("rectangle", 0, 0, 38, 64);
        this.sprite.depth = 1;

        // state
        this.ALIVE = true;
        this.maxHealth = 100;
        this.health = 50;
        this.prevHealth = this.health;
        this.CAN_NIGHTVISION = false;

        // weapon active state
        this.MELEE = true;
        this.GRAPPLE = false;
        this.RANGED = false;
        this.RED_KEY = false;
        this.BLUE_KEY = false;
        this.GOLD_KEY = false;
    
        this.damage;

        // weapon unlock state
        this.CAN_MELEE = true;
        this.CAN_GRAPPLE = false;
        this.CAN_RANGED = false;
        this.CAN_RED_KEY = false;
        this.CAN_BLUE_KEY = false;
        this.CAN_GOLD_KEY = false;

        // images for UI
        this.grapple_closed_img = grapple_closed;
        this.grapple_open_img = grapple_open;
        this.rangedImg = pistol_img;

        // group for player projectiles
        this.projectiles = new Group();

        // projectile asset
        this.projectileImg = loadImage("assets/img/player/projectile.png");

        // creation of melee weapon
        this.meleeWeapon = new Melee(this, playerMeleeSpritesheet);

        // creation of grapple and ranged weapon objects
        this.grapple = new Grapple(this, this.grapple_closed_img, this.grapple_open_img);

        // creation of ranged weapon
        this.rangedWeapon = new RangedWeapon(this, this.projectileImg, this.rangedImg, pistol_anim, player_shoot_sound);
        this.rangedWeapon.ammo = 45;
        this.rangedWeapon.fireDelay = 25;
        this.rangedWeapon.spread = 1;
        this.rangedWeapon.projectileSpeed = 20;

        // creation of keys
        this.redKey = new Key(this, red_key_img);
        this.blueKey = new Key(this, blue_key_img);
        this.goldKey = new Key(this, gold_key_img);


        // movement and player controls
        this.controllable = true;
        this.walk_sound = player_walk_sound;
        this.walk_sound.loop();
        this.walk_sound.stop();

        this.rayCaster = new Particle(); // used for raycast gameplay mechanic
        this.ray = new Ray(this, this.sprite.position, 0); // raycast for object detection

        // jump logic
        this.falling = false;
    
        allEntities.push(this);
    }

    
    draw() {

        drawSprite(this.sprite);

        this.health = constrain(this.health, 0, this.maxHealth);

        if (this.health > 0) {
            this.mouseLook();

            if (this.controllable) {

                this.movement();
                this.useMelee();
    
                drawSprite(this.sprite);    // player is drawn after raycast and before ranged weapon
    
                this.useGrapple();
                this.useRanged();
                this.useKeys();
            }
    
            else {
                this.sprite.changeAnimation("idle");
            }
        }

        else {
            this.sprite.changeAnimation("death");
            this.sprite.animation.looping = false;
            this.gravity();
        }



        drawSprites(this.projectiles);

        // flash red when health decreases
        if (this.prevHealth > this.health) {
            background(255, 0, 0, 150);
        }


        this.prevHealth = this.health;
    }


    useMelee() {

        this.damage = 1;

        if (this.MELEE && mouseIsPressed && mouseButton == LEFT) {
            this.meleeWeapon.useWeapon();
        }

        for (let projectile of this.projectiles) {

            if (projectile.depth == 10) {

                if (this.sprite.position.dist(projectile.position) > 50) {
                    
                    projectile.remove();
                }
            }
        }
    }


    useGrapple() {

        this.damage = 0;

        if (this.GRAPPLE) {
            this.grapple.useWeapon(this.crosshair.x, this.crosshair.y);
        }
        this.grapple.grappleResetTimer++;
    }


    useRanged() {

        this.damage = 10;


        if (this.RANGED) {

            // weapon follows mouse
            this.rangedWeapon.followMouse();
            
            if (mouseIsPressed && mouseButton == LEFT  && this.rangedWeapon.ammo > 0) {
                this.rangedWeapon.useWeapon(this.crosshair.x, this.crosshair.y);
            }

            else {
                this.rangedWeapon.sprite.animation.rewind();
                this.rangedWeapon.sprite.animation.stop();
            }
        }
    }


    useKeys() {

        if (this.RED_KEY) {
            this.redKey.useWeapon(this.crosshair.x, this.crosshair.y);
        }

        if (this.BLUE_KEY) {
            this.blueKey.useWeapon(this.crosshair.x, this.crosshair.y);
        }
    
        if (this.GOLD_KEY) {
            this.goldKey.useWeapon(this.crosshair.x, this.crosshair.y);
        }
    }


    movement() {

        this.sprite.maxSpeed = 15;
        
        if (this.falling == true) {
            this.sprite.friction = 0.01;
            this.sprite.changeAnimation("idle");
            this.walk_sound.pause();
        }

        else {
            this.sprite.friction = 0.1;

            // can only use left-right inputs if not falling
            this.sprite.changeAnimation("idle");

            if (keyIsDown(65)) {    // if a is down

                if (this.walk_sound.isPlaying() == false) {
                    this.walk_sound.play();
                }

                this.sprite.velocity.x = -3;
                this.sprite.changeAnimation("walk");
            }

            else if (keyIsDown(68)) {   // if d is down

                if (this.walk_sound.isPlaying() == false) {
                    this.walk_sound.play();
                }

                this.sprite.velocity.x = 3;
                this.sprite.changeAnimation("walk");
            }

            else {
                this.walk_sound.pause();
            }
        
        }

        this.gravity();
        
        // jumping
        if (keyIsDown(32) && this.falling == false) {
            this.sprite.velocity.y -= 5;
        }

    }


    mouseLook() {

        cursor(CROSS);

        // camera follows player + mouse
        camera.position.x = this.sprite.position.x + 0.6*(mouseX-width /2);
        camera.position.y = this.sprite.position.y + 0.6*(mouseY-height/2);
        this.crosshair.x = camera.position.x + (mouseX-width/2);
        this.crosshair.y = camera.position.y + (mouseY-height/2);


 
        // look left if crosshair is left of player
        if (this.crosshair.x < this.sprite.position.x) {

            this.sprite.mirrorX(-1);
            this.lookDir = "left";
        }

        else if (this.crosshair.x > this.sprite.position.x) {

            this.sprite.mirrorX(1);
            this.lookDir = "right";
        }
    }


    gravity() {

        // using raycasting to stop acceleration when the player hits the ground or when they hit a ceiling
        // doing this above and below the player prevents them from getting stuck on wall sprites
        
        let pointBeneathPlayer = this.ray.rayCast(this.sprite.position.x, this.sprite.position.y + 500);
        if (dist(this.sprite.position.x, this.sprite.position.y, pointBeneathPlayer.x, pointBeneathPlayer.y) > 40) {
            this.sprite.velocity.y += 0.2;
            this.falling = true;
        }

        else {
            this.falling = false;
        }

        // raycast upwards
        let pointAbovePlayer = this.ray.rayCast(this.sprite.position.x, this.sprite.position.y - 500);
        if (dist(this.sprite.position.x, this.sprite.position.y, pointAbovePlayer.x, pointAbovePlayer.y) <= 32) {
            this.sprite.velocity.y = -0.5 * this.sprite.velocity.y;
            this.falling = true;
        }


        // raycast left
        let pointLeftOfPlayer = this.ray.rayCast(this.sprite.position.x - 500, this.sprite.position.y);
        if (dist(this.sprite.position.x, this.sprite.position.y, pointLeftOfPlayer.x, pointLeftOfPlayer.y) <= 20) {
            this.sprite.velocity.x = 0.6;
        }

        // raycast right
        let pointRightOfPlayer = this.ray.rayCast(this.sprite.position.x + 500, this.sprite.position.y);
        if (dist(this.sprite.position.x, this.sprite.position.y, pointRightOfPlayer.x, pointRightOfPlayer.y) <= 20) {
            this.sprite.velocity.x = -0.6;
        }
    }

    raycastMechanic() {
        if (this.CAN_NIGHTVISION) {
            this.rayCaster.update(player.sprite.position.x, player.sprite.position.y);
            this.rayCaster.cast(boundaries);
        }   
    }
}


function mouseReleased() {
    if (mouseButton == LEFT && player.grapple.canGrapple == true) {
        player.grapple.canGrapple = false;
    }
}