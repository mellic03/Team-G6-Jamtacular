class Player {

    constructor() {
        this.sprite;
        this.crosshair = createVector(0, 0);

        // grapple logic
        this.grappled = false;
        this.anchorX = 0;
        this.anchorY = 0;
    }

    
    generate(x, y) {
        this.sprite = createSprite(x, y, 20, 20);
        this.sprite.limitSpeed(5);
        this.sprite.setCollider("circle", 0, 0, 38);
        this.sprite.depth = 1;

        this.sprite.addAnimation("idle", idleAnim);
        this.sprite.addAnimation("walk", walkAnim);
        this.sprite.changeAnimation("idle");
    }


    control() {

        this.movement();
        this.mouseLook();
        this.grapple(this.crosshair.x, this.crosshair.y);
        fill(255)
    }


    movement() {

        this.sprite.friction = 0.04;

        if (this.grappled == true) {
            this.sprite.maxSpeed = 10;
            this.sprite.friction = 0.05;
        }

        else if (this.grappled == false){
            this.sprite.maxSpeed = 5;
            this.sprite.friction = 0.2;
        }

        console.log(this.sprite.friction)

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

        if (mouseIsPressed) {

            if (mouseButton === LEFT) {

                if (this.grappled == false) {
                    this.anchorX = x;
                    this.anchorY = y;
                    this.grappled = true;
                }

                let distance = dist(this.sprite.position.x, this.sprite.position.y, this.anchorX, this.anchorY);

                this.sprite.attractionPoint(5, this.anchorX, this.anchorY);

                stroke(255);
                line(this.sprite.position.x, this.sprite.position.y, this.anchorX, this.anchorY);

            }
        }

        else if (!mouseIsPressed) {
            this.grappled = false;
        }
    }
}



function pendulum() {
    // need to know these values:

    // angle variable
    // radius (distance between subject and anchor point)
    
    // subject position
    // subject velocity
    // subject acceleration

    // anchor point position

    ballpos.x = origin.x + radius * sin(angle);
    ballpos.y = origin.y + radius * cos(angle);

    stroke(255);
    line(250, 250, ballpos.x, ballpos.y);
    ellipse(ballpos.x, ballpos.y, 50, 50);

    ballaAcc = -0.01 * sin(angle);
    ballaVel += ballaAcc;
    angle += ballaVel;

    ballaVel *= 0.99;
}