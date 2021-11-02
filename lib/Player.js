class Player {

    constructor(x, y) {

        // vector for tracking crosshair
        this.crosshair = createVector(0, 0);

        // sprite initialisation
        this.sprite = createSprite(x, y, 20, 20);
        this.sprite.limitSpeed(5);
        this.sprite.setCollider("rectangle", 0, 0, 38, 64);
        this.sprite.depth = 1;
        this.sprite.addAnimation("idle", idleAnim);
        this.sprite.addAnimation("walk", walkAnim);

        this.sprite.changeAnimation("idle");
        

        this.ray = new Ray(this.sprite.position, 0);

        // weapon invectory
        this.ACTIVE_WEAPON = "pistol";


        // jump logic
        this.falling = false;

        // grapple logic
        this.grappled = false;
        this.grapplePoint;
        this.health = 100;
        this.ammo = 25;
        this.ray;

        this.pointBeneathPlayer;
        this.pointAbovePlayer;
        this.pointRightOfPlayer;
        this.pointLeftOfPlayer;

        // states
        this.ALIVE = true;

    }

    
    control() {
        if (this.health < 1) {
            this.ALIVE = false;
        }

        if (this.ALIVE == true) {
            drawSprite(this.weaponSprite);
            this.movement();
            this.mouseLook();
            this.grapple(this.crosshair.x, this.crosshair.y);
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
            else if (keyIsDown(68)) {   // if d is down
                this.sprite.velocity.x = 3;
                this.sprite.changeAnimation("walk");
            }
        }


        // using raycasting to stop acceleration when the player hits the ground
        // if the player is more than 40 pixels above the ground they will be accelerated
        // doing this below the player prevents them from getting stuck on wall sprites
        
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

        // jump logic
        if (keyIsDown(32)) {
            if (this.falling == false) {
                this.sprite.velocity.y -= 5;
            }
        }


        this.pointRightOfPlayer = this.rayCast(this.sprite.position.x + 500, this.sprite.position.y);
        if (dist(this.sprite.position.x, this.sprite.position.y, this.pointRightOfPlayer.x, this.pointRightOfPlayer.y) <= 20) {
            this.sprite.velocity.x = -0.7 * this.sprite.velocity.x;
        }

        this.pointLeftOfPlayer = this.rayCast(this.sprite.position.x - 500, this.sprite.position.y);
        if (dist(this.sprite.position.x, this.sprite.position.y, this.pointLeftOfPlayer.x, this.pointLeftOfPlayer.y) <= 20) {
            this.sprite.velocity.x = -0.7 * this.sprite.velocity.x;
        }

    }


    mouseLook() {

        cursor(CROSS);

        // camera follows player + mouse
        camera.position.x = this.sprite.position.x + 0.3*(mouseX-width /2);
        camera.position.y = this.sprite.position.y + 0.3*(mouseY-height/2);
        this.crosshair.x = camera.position.x + (mouseX-width/2);
        this.crosshair.y = camera.position.y + (mouseY-height/2);


        // weapon follows player + mouse
        //this.weapon.sprite.position = this.sprite.position;
        //let weaponAngle = atan2(this.crosshair.y - this.sprite.position.y, this.crosshair.x - this.sprite.position.x);


        // look left if crosshair is left of player
        if (this.crosshair.x < this.sprite.position.x) {

            this.sprite.mirrorX(-1);

            //this.weapon.sprite.rotation = degrees(-weaponAngle)
            //this.weapon.sprite.mirrorY(-1);
        }

        // look right if crosshair is right of player
        else if (this.crosshair.x > this.sprite.position.x) {

            this.sprite.mirrorX(1);
            
            //this.weapon.sprite.mirrorX(1);
            //this.weapon.sprite.rotation = degrees(weaponAngle);
            //this.weapon.sprite.mirrorY(1);
        }

    }


    grapple(x, y) {

        if (this.sprite.position.y > 0) {
            if (mouseIsPressed && mouseButton === LEFT) {

                if (this.grappled == false) {
                    
                    this.grapplePoint = this.rayCast(x, y)
                    this.grappled = true;
                }
                // set player attraction point to intersection
                line(this.sprite.position.x, this.sprite.position.y, this.grapplePoint.x, this.grapplePoint.y);
                this.sprite.attractionPoint(2, this.grapplePoint.x, this.grapplePoint.y);
            }
    
            else if (!mouseIsPressed) {
                this.grappled = false;
            }
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
