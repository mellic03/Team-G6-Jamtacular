class Stanky {

    constructor(x, y, target) {

        this.x = x;
        this.y = y;

        this.health = 100;

        this.target = target;

        this.projectiles = new Group();
        this.sprites = new Group();

        this.sprite = createSprite(this.x, this.y, 50, 50);
        this.sprite.addImage("body_mouthOpen", loadImage("assets/img/enemy/stanky/stanky_body_mouthOpen.png"));
        this.sprite.addImage("body_mouthClosed", loadImage("assets/img/enemy/stanky/stanky_body_mouthClosed.png"));
        this.sprite.changeImage("body_mouthClosed");

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
    }
    

    draw() {
        
        let dist = this.target.sprite.position.dist(this.sprite.position)

        if (dist < 2*width) {

            drawSprites(this.sprites);
            drawSprites(this.projectiles);

            this.weapon.useWeapon(this.target.sprite.position.x, this.target.sprite.position.y);
            
            this.followTarget();
            this.lookAtTarget();
       

            if (dist > 300) {
                this.sprite.changeImage("body_mouthClosed");
            }
            if (dist < 300) {
                this.sprite.changeImage("body_mouthOpen");
            }
        }
    }


    followTarget() {

        this.left_eye_sprite.position.x = this.sprite.position.x - 35;
        this.left_eye_sprite.position.y = this.sprite.position.y + 17;

        this.right_eye_sprite.position.x = this.sprite.position.x + 35;
        this.right_eye_sprite.position.y = this.sprite.position.y + 17;


        this.sprite.maxSpeed = 0.5;
        this.sprite.attractionPoint(1, this.target.sprite.position.x, this.target.sprite.position.y)
    }


    lookAtTarget() {

        let eyeAngle = atan2(this.target.sprite.position.y - this.sprite.position.y, this.target.sprite.position.x - this.sprite.position.x);
        this.center_eye_sprite.rotation = (eyeAngle);

        this.center_eye_sprite.position.x = 10 * cos(eyeAngle) + this.sprite.position.x;
        this.center_eye_sprite.position.y = 10 * sin(eyeAngle) + this.sprite.position.y;

        this.left_eye_sprite.position.x = 5 * cos(eyeAngle) + this.left_eye_sprite.position.x;
        this.left_eye_sprite.position.y = 5 * sin(eyeAngle) + this.left_eye_sprite.position.y;

        this.right_eye_sprite.position.x = 5 * cos(eyeAngle) + this.right_eye_sprite.position.x;
        this.right_eye_sprite.position.y = 5 * sin(eyeAngle) + this.right_eye_sprite.position.y;

    }
}