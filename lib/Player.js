class Player {

    constructor(x, y, idleSpriteSheet, walkSpriteSheet) {

        // vector for tracking crosshair
        this.crosshair = createVector(0, 0);

        // sprite assets
        this.idleSpriteSheet = idleSpriteSheet;
        this.walkSpriteSheet = walkSpriteSheet;
        
        this.idleAnimation = loadAnimation(this.idleSpriteSheet);
        this.walkAnimation = loadAnimation(this.walkSpriteSheet);

        // sprite initialisation
        this.sprite = createSprite(x, y, 20, 20);

        this.sprite.addAnimation("idle", this.idleAnimation);
        this.sprite.addAnimation("walk", this.walkAnimation);
        this.sprite.changeAnimation("idle");

        this.sprite.setCollider("rectangle", 0, 0, 38, 64);
        this.sprite.depth = 1;

        // state
        this.ALIVE = true;
        this.health = 100;
        this.nightVision = false;

        // weapon active state
        this.MELEE = true;
        this.GRAPPLE = false;
        this.RANGED = false;

        // weapon unlock state
        this.CAN_MELEE = true;
        this.CAN_GRAPPLE = true;
        this.CAN_RANGED = true;

        // group for player projectiles
        this.projectiles = new Group();

        // projectile asset
        this.projectileImg = loadImage("assets/img/player/projectile.png");

        // creation of melee weapon
        this.meleeWeapon = new Melee(this, playerMeleeSpritesheet);

        // creation of grapple and ranged weapon objects
        this.grapple = new Grapple(this, grapple_closed, grapple_open);

        // creation of ranged weapon
        this.rangedWeapon = new RangedWeapon(this, this.projectileImg, pistol_img, pistol_anim);
        this.rangedWeapon.ammo = 55;
        this.rangedWeapon.fireDelay = 25;
        this.rangedWeapon.spread = 1;
        this.rangedWeapon.damage = 1;

        // movement and player controls
        this.controllable = true;

        this.rayCaster = new Particle(); // used for raycast gameplay mechanic
        this.ray = new Ray(this, this.sprite.position, 0); // raycast for object detection

        // jump logic
        this.falling = false;
    }

    
    draw() {

        this.mouseLook();
        drawSprite(this.sprite);


        if (this.controllable) {
            this.movement();

            if (this.nightVision) {
                this.raycastMechanic();
            }

            this.useMelee();
            drawSprite(this.sprite);    // player is drawn after raycast and before ranged weapon
            this.useGrapple();
            this.useRanged();
        }

        else {
            this.sprite.changeAnimation("idle");
        }

        drawSprites(this.projectiles);
    }


    useMelee() {

        if (this.MELEE && mouseIsPressed && mouseButton == LEFT) {
            this.meleeWeapon.useWeapon();
        }
    }


    useGrapple() {

        if (this.GRAPPLE) {
            this.grapple.useWeapon(this.crosshair.x, this.crosshair.y);
        }
        this.grapple.grappleResetTimer++;
    }


    useRanged() {

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


    movement() {

        this.sprite.maxSpeed = 15;
        
        if (this.falling == true) {
            this.sprite.friction = 0.01;
        }

        else {
            this.sprite.friction = 0.1;

            // can only use left-right inputs if not falling
            this.sprite.changeAnimation("idle");
            if (keyIsDown(65)) {    // if a is down
                this.sprite.velocity.x = -3;
                this.sprite.changeAnimation("walk");
            }
            if (keyIsDown(68)) {   // if d is down
                this.sprite.velocity.x = 3;
                this.sprite.changeAnimation("walk");
            }
        }


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
            this.sprite.velocity.x = 0.3;
        }

        // raycast right
        let pointRightOfPlayer = this.ray.rayCast(this.sprite.position.x + 500, this.sprite.position.y);
        if (dist(this.sprite.position.x, this.sprite.position.y, pointRightOfPlayer.x, pointRightOfPlayer.y) <= 20) {
            this.sprite.velocity.x = -0.3;
        }

        
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


    raycastMechanic() {
        this.rayCaster.update(player.sprite.position.x, player.sprite.position.y);
        this.rayCaster.cast(boundaries);
    }
}


function mouseReleased() {
    if (mouseButton == LEFT && player.grapple.canGrapple == true) {
        player.grapple.canGrapple = false;
    }
}