class Player {

    constructor() {
        this.sprite;
        this.crosshair = createVector(0, 0);

        // grapple logic
        this.grappled = false;
        this.anchorX = 0;
        this.anchorY = 0;
        
        this.health = 100;
        this.ammo = 25;

        this.ray;

    }

    
    generate(x, y) {
        this.sprite = createSprite(x, y, 20, 20);
        this.sprite.limitSpeed(5);
        this.sprite.setCollider("circle", 0, 0, 38);
        this.sprite.depth = 1;

        this.sprite.addAnimation("idle", idleAnim);
        this.sprite.addAnimation("walk", walkAnim);
        this.sprite.changeAnimation("idle");

        this.ray = new Ray(this.sprite.position, 0);
    }


    control() {

        this.movement();
        this.mouseLook();
        this.grapple(this.crosshair.x, this.crosshair.y);
        fill(255)
    }


    movement() {

        this.sprite.friction = 0.04;
        this.sprite.mirrorX(Math.sign(this.sprite.velocity.x)); // mirror sprite to direction
        
        if (this.grappled == true) {
            this.sprite.maxSpeed = 10;
            this.sprite.friction = 0.05;
        }

        else if (this.grappled == false){
            this.sprite.maxSpeed = 5;
            this.sprite.friction = 0.2;
        }


        if (keyIsDown(65)) {    // if a is down
            this.sprite.velocity.x -= 1;
            this.sprite.changeAnimation("walk");
        }
        else if (keyIsDown(68)) {   // if d is down
            this.sprite.velocity.x += 1;
            this.sprite.changeAnimation("walk");
        }
        
        else {
            this.sprite.changeAnimation("idle");
        }


        // jump logic UNFINISHED
        if (keyIsDown(32)) {    // if space is down
            this.sprite.velocity.y -= 1;
        }

        else {
            this.sprite.velocity.y += 2;
        }

    }


    mouseLook() {

        cursor(CROSS);

        // camera follows player + mouse
        camera.position.x = this.sprite.position.x + 0.3*(mouseX-width /2);
        camera.position.y = this.sprite.position.y + 0.3*(mouseY-height/2);
        this.crosshair.x = camera.position.x + (mouseX-width/2);
        this.crosshair.y = camera.position.y + (mouseY-height/2);


        if (this.crosshair.x < this.sprite.position.x) {        // look left if crosshair is left of player
            this.sprite.mirrorX(-1);
        }
        
        else if (this.crosshair.x > this.sprite.position.x) {   // look right if crosshair is right of player
            this.sprite.mirrorX(1);
        }
    }


    grapple(x, y) {

        if (mouseIsPressed && mouseButton === LEFT) {

            if (this.grappled == false) {
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
                    // line between player and nearest intersection
                    this.anchorX = closestPt.x;
                    this.anchorY = closestPt.y;
    
                }

                this.grappled = true;
            }

            // set player attraction point to intersection
            strokeWeight(2)
            stroke(255);
            line(this.sprite.position.x, this.sprite.position.y, this.anchorX, this.anchorY);
            this.sprite.attractionPoint(5, this.anchorX, this.anchorY);
        }

        else if (!mouseIsPressed) {
            this.grappled = false;
        }
    }
}
