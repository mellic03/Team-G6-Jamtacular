let stanky_physDamage = 25;
let stanky_rangedDamage = 5;

class Stanky {

    constructor(x, y, target) {

        this.x = x;
        this.y = y;

        this.health = 400;

        this.name = "stanky";
        this.collisionType = "normal";

        this.target = target;
        this.attackTarget = false;
        this.jailed = true;

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
        this.weapon.fireDelay = 60;
        this.weapon.spread = 0;
    
        // raycasting used for detecting if there is a wall between boss and player
        this.ray = new Ray(this, this.sprite.position, 0);


        allEntities.push(this);
    }
    

    draw() {
        
        if (this.health > 0) {

            drawSprites(this.sprites);
            drawSprites(this.projectiles);

            let targetDist = this.target.sprite.position.dist(this.sprite.position);
            
            // raycast towards the player
            let point = this.ray.rayCast(this.target.sprite.position.x, this.target.sprite.position.y);

            // if distance between boss and player is less than the distance between boss and intersect point
            // have to include if frameCount > 1, for some reason it doesn't want to work on the zeroth frame
            
            if (this.attackTarget) {

                if (this.sprite.position.dist(this.target.sprite.position) < this.sprite.position.dist(point)) {
                    this.weapon.useWeapon(this.target.sprite.position.x, this.target.sprite.position.y);
                }
        
                // open the mouth if the player is within 300 pixels
                if (targetDist > 300) {
                    this.sprite.changeImage("body_mouthClosed");
                }
                else if (targetDist < 300) {
                    this.sprite.changeImage("body_mouthOpen");
                }

                this.showHealth()
            }
            
            this.trackTarget();
        
            // player can harm enemy
            if (this.target.projectiles.overlap(this.sprite)) {
                this.health -= this.target.damage;
            }
            this.target.projectiles.overlap(this.sprite, projectileCleanup);

            // enemy can harm player
            if (this.sprite.overlap(this.target.sprite)) {
                this.damagePlayer(this.sprite, this.target);
            }
            
            this.projectiles.overlap(this.target.sprite, this.rangedDamagePlayer);
        }

        else {
            drawSprite(this.sprite);
            this.sprite.maxSpeed = 0;
        }
    }


    trackTarget() {

        // move to player if attackTarget == true
        if (this.attackTarget) {

            this.sprite.maxSpeed = 3;
            this.sprite.attractionPoint(3, this.target.sprite.position.x, this.target.sprite.position.y);
        }

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

    showHealth() {

        noStroke();
        rectMode(CENTER);
        
        fill(255, 0, 0);
        rect(this.sprite.position.x, this.sprite.position.y - 100, 100, 5);
        
        fill(0, 255, 0);
        rect(this.sprite.position.x, this.sprite.position.y - 100, this.health/4, 5);
    }

    damagePlayer(stnk, target) {
    
        target.health -= stanky_physDamage;
    
        if (target.sprite.position.x < stnk.position.x) {
          target.sprite.velocity.x -= 50;
        }
    
        if (target.sprite.position.x > stnk.position.x) {
          target.sprite.velocity.x += 50;
        }
    }

    rangedDamagePlayer() {
        player.health -= stanky_rangedDamage;
    }
}