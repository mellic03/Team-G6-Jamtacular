class Player {

    constructor(x, y, idleSpriteSheet, walkSpriteSheet) {

        // vector for tracking crosshair
        this.crosshair = createVector(0, 0);

        // sprite assets
        this.idleSpriteSheet = idleSpriteSheet;
        this.walkSpriteSheet = walkSpriteSheet;
        
        this.idleAnimation = loadAnimation(this.idleSpriteSheet);
        this.walkAnimation = loadAnimation(this.walkSpriteSheet);

        this.sprite = createSprite(x, y, 20, 20);

        this.sprite.addAnimation("idle", this.idleAnimation);
        this.sprite.addAnimation("walk", this.walkAnimation);
        this.sprite.changeAnimation("idle");

        this.sprite.setCollider("rectangle", 0, 0, 38, 64);
        this.sprite.depth = 1;
        
        // states
        this.ALIVE = true;


        // weapons
        this.MELEE = false;
        this.GRAPPLE = false;
        this.PISTOL = false;

        this.grapple = new Grapple(this.sprite);  // creates a new grapple object with owner "this".
        this.rangedWeapon = new RangedWeapon(this.sprite);



        // movement and player controls
        this.controllable = true;

        this.rayCaster = new Particle(); // used for raycast gameplay mechanic
        this.ray = new Ray(this.sprite.position, 0); // raycast for object detection

        this.pointBeneathPlayer;
        this.pointAbovePlayer;
        this.pointRightOfPlayer;
        this.pointLeftOfPlayer;

        // jump logic
        this.falling = false;


        this.health = 100;
        this.ammo = 25;
    }

    
    control() {

        drawSprite(this.sprite);

        this.mouseLook();

        if (this.controllable == true) {

            this.movement();
            this.raycastMechanic();
            
            if (this.GRAPPLE == true) {
                this.grapple.useWeapon(this.crosshair.x, this.crosshair.y);
            }
            else if (this.MELEE == true) {
                //this.melee.useWeapon(this.crosshair.x, this.crosshair.y);
            }
            else if (this.RANGED == true) {
                //this.pistol.useWeapon(this.crosshair.x, this.crosshair.y);
            }
        }

        else {
            this.sprite.changeAnimation("idle");
        }
    }


    movement() {

        this.sprite.maxSpeed = 10;
        
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
        
        this.pointBeneathPlayer = this.rayCast(this.sprite.position.x, this.sprite.position.y + 500);
        if (dist(this.sprite.position.x, this.sprite.position.y, this.pointBeneathPlayer.x, this.pointBeneathPlayer.y) > 40) {
            this.sprite.velocity.y += 0.2;
            this.falling = true;
        }

        else {
            this.falling = false;
        }

        this.pointAbovePlayer = this.rayCast(this.sprite.position.x, this.sprite.position.y - 500);
        if (dist(this.sprite.position.x, this.sprite.position.y, this.pointAbovePlayer.x, this.pointAbovePlayer.y) <= 32) {
            this.sprite.velocity.y = -0.5 * this.sprite.velocity.y;
            this.falling = true;
        }

        this.pointRightOfPlayer = this.rayCast(this.sprite.position.x + 500, this.sprite.position.y);
        if (dist(this.sprite.position.x, this.sprite.position.y, this.pointRightOfPlayer.x, this.pointRightOfPlayer.y) <= 20) {
            this.sprite.velocity.x = -0.3;
        }

        this.pointLeftOfPlayer = this.rayCast(this.sprite.position.x - 500, this.sprite.position.y);
        if (dist(this.sprite.position.x, this.sprite.position.y, this.pointLeftOfPlayer.x, this.pointLeftOfPlayer.y) <= 20) {
            this.sprite.velocity.x = 0.3;
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


        // weapon follows player + mouse
        //let weaponAngle = atan2(this.crosshair.y - this.sprite.position.y, this.crosshair.x - this.sprite.position.x);

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
        
        if (keyIsDown(16)) {
            this.rayCaster.draw(player.sprite.position.x, player.sprite.position.y);
            this.rayCaster.cast(boundaries);
            player.health -= 0.1;
        }
    }


    rayCast(x, y) {

        this.ray.draw();
        this.ray.lookAt(x, y);
        let closestPt = null;
        let record = Infinity;

        for (let boundary of boundaries) {  // iterate through boundaries to detect intersections
        
            let pt = this.ray.cast(boundary);

            if (pt) {   // if an intersection exists

                const d = p5.Vector.dist(pt, this.sprite.position);

                if (d < record) {   // find the nearest intersection
                    record = d;
                    closestPt = pt;
                }
            }
        }

        if (closestPt) {
            return closestPt;
        }
    }
}


function mouseReleased() {
    if (mouseButton == LEFT && player.canGrapple == true) {
        player.canGrapple = false;
    }
}
