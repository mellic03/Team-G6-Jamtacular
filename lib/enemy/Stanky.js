class Stanky {

    constructor(x, y, target) {

        this.x = x;
        this.y = y;

        this.health = 100;

        this.target = target;

        this.projectiles = new Group();
        this.sprites = new Group();
        
        // body sprite
        this.sprite = createSprite(this.x, this.y, 50, 50);
        this.sprite.addImage("body_mouthOpen", loadImage("assets/img/enemy/stanky/stanky_body_mouthOpen.png"));
        this.sprite.addImage("body_mouthClosed", loadImage("assets/img/enemy/stanky/stanky_body_mouthClosed.png"));
        this.sprite.changeImage("body_mouthClosed");
        this.sprite.setCollider("circle", 0, 20, 92);

        // center eye
        this.center_eye_sprite = createSprite(this.x, this.y, 50, 50);
        this.center_eye_sprite.addImage("center_eye", loadImage("assets/img/enemy/stanky/stanky_center_eye.png"));
        this.center_eye_sprite.changeImage("center_eye");

        // left eye
        this.left_eye_sprite = createSprite(this.x, this.y, 50, 50);
        this.left_eye_sprite.addImage("left_eye", loadImage("assets/img/enemy/stanky/stanky_small_eye.png"));
        this.left_eye_sprite.changeImage("left_eye");

        // right eye
        this.right_eye_sprite = createSprite(this.x, this.y, 50, 50);
        this.right_eye_sprite.addImage("right_eye", loadImage("assets/img/enemy/stanky/stanky_small_eye.png"));
        this.right_eye_sprite.changeImage("right_eye");


        // add sprites to this.sprites
        this.sprites.add(this.center_eye_sprite);
        this.sprites.add(this.left_eye_sprite);
        this.sprites.add(this.right_eye_sprite);
        this.sprites.add(this.sprite);
    
        this.projectileImg = loadImage("assets/img/enemy/stanky/projectile.png");
    
        this.weapon = new RangedWeapon(this, this.projectileImg);   // creates a ranged weapon object tied to "this"
        this.weapon.fireDelay = 10;
        this.weapon.spread = 0;
    
        // raycasting used for detecting if there is a wall between boss and player
        this.ray = new Ray(this, this.sprite.position, 0);
    }
    

    draw() {
        
        if (this.health > 0) {

            drawSprites(this.sprites);
            drawSprites(this.projectiles);

            // health bar
            noStroke();
            
            fill(255, 0, 0);
            rect(this.sprite.position.x-50, this.sprite.position.y - 100, 100, 5);
            
            fill(0, 255, 0);
            rect(this.sprite.position.x-50, this.sprite.position.y - 100, 50 * (this.health/50), 5);



            let targetDist = this.target.sprite.position.dist(this.sprite.position);
            
            // draw if the player is within twice the canvas width
            if (targetDist < 1.2*height) {

                // raycast towards the player
                let point = this.ray.rayCast(this.target.sprite.position.x, this.target.sprite.position.y);

                // if distance between boss and player is less than the distance between boss and intersect point
                // have to include if frameCount > 1, for some reason it doesn't want to work on the zeroth frame
                if (frameCount > 1 && this.sprite.position.dist(this.target.sprite.position) < this.sprite.position.dist(point)) {
                    
                    this.weapon.useWeapon(this.target.sprite.position.x, this.target.sprite.position.y);
                }

                
                this.trackTarget();
        
                // open the mouth if the player is within 300 pixels
                if (targetDist > 300) {
                    this.sprite.changeImage("body_mouthClosed");
                }
                else if (targetDist < 300) {
                    this.sprite.changeImage("body_mouthOpen");
                }
            }
        }

        else {
            drawSprite(this.sprite);
            this.sprite.maxSpeed = 0;
        }
    }


    trackTarget() {

        // movement
        this.sprite.maxSpeed = 3;
        this.sprite.attractionPoint(3, this.target.sprite.position.x, this.target.sprite.position.y);


        // eye tracking
        let eyeAngle = atan2(this.target.sprite.position.y - this.sprite.position.y, this.target.sprite.position.x - this.sprite.position.x);
        this.center_eye_sprite.rotation = (eyeAngle);

        this.center_eye_sprite.position.x = 10 * cos(eyeAngle) + this.sprite.position.x;
        this.center_eye_sprite.position.y = 10 * sin(eyeAngle) + this.sprite.position.y;

        this.left_eye_sprite.position.x = 5 * cos(eyeAngle) + this.sprite.position.x - 35;
        this.left_eye_sprite.position.y = 5 * sin(eyeAngle) + this.sprite.position.y + 17;

        this.right_eye_sprite.position.x = 5 * cos(eyeAngle) + this.sprite.position.x + 35;
        this.right_eye_sprite.position.y = 5 * sin(eyeAngle) + this.sprite.position.y + 17;
    }
}