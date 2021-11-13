class Angler {

    constructor(x, y, target, type) {
  
        this.target = target;
        this.targetDist = 0;

        this.health = 100;
        this.prevHealth = this.health;
        this.name = "angler";
        this.collisionType = "none";

        this.sprite = createSprite(x, y, 10, 10);
        this.sprite.setCollider("circle", 0, 0, 24);

        if (type == "normal") {
            this.openImg = loadImage("assets/img/enemy/angler/angler_open.png");
            this.closedImg = loadImage("assets/img/enemy/angler/angler_closed.png");
            this.sprite.maxSpeed = 1.5;
            this.damage = 10;
        }

        else if (type == "abnormal") {
            this.openImg = loadImage("assets/img/enemy/angler/angler_open_2.png");
            this.closedImg = loadImage("assets/img/enemy/angler/angler_closed_2.png");
            this.sprite.maxSpeed = 2.5;
            this.damage = 25;
        }
        
        this.sprite.addImage("closed", this.closedImg);
        this.sprite.addImage("open", this.openImg);

        this.hurtSound = angler_hurt;

        this.ammoDrop = new Pickup("ammo", x, y);
        allEntities.push(this);
    }
  
  
    draw() {

        this.ammoDrop.pos = this.sprite.position;

        this.targetDist = p5.Vector.dist(this.sprite.position, this.target.sprite.position);

        if (this.health > 0) {

            if (this.targetDist < 1000) {
                this.sprite.attractionPoint(3, this.target.sprite.position.x, this.target.sprite.position.y);
                this.sprite.mirrorX(Math.sign(this.sprite.velocity.x));
        
                if (this.target.sprite.position.dist(this.sprite.position) < 150) {
                    this.sprite.changeImage("open");
                }
        
                else {
                    this.sprite.changeImage("closed");
                }
                
    
                if (this.target.projectiles.overlap(this.sprite)) {
                    this.health -= this.target.damage;
                }
                this.target.projectiles.overlap(this.sprite, projectileCleanup);
    
                if (this.sprite.overlap(this.target.sprite)) {
                    this.damagePlayer(this.sprite, this.target);
                }
    
    
                if (this.health < this.prevHealth) {
                    this.hurtSound.play();
                }
    
    
                this.prevHealth = this.health;
    
                drawSprite(this.sprite);
                this.showHealth();
            }

        }

        else {
            this.ammoDrop.draw();
            this.sprite.maxSpeed = 0;
        }



    }


    showHealth() {
        noStroke();

        rectMode(CENTER);

        fill(255, 0, 0);
        rect(this.sprite.position.x, this.sprite.position.y-50, 50, 5);
        
        fill(0, 255, 0);
        rect(this.sprite.position.x, this.sprite.position.y-50, this.health/2, 5);
    }
  

    damagePlayer(ang, target) {
      
        target.health -= this.damage;

        if (target.sprite.position.x < ang.position.x) {
            target.sprite.velocity.x -= 50;
        }
      
        if (target.sprite.position.x > ang.position.x) {
            target.sprite.velocity.x += 50;
        }
    }
}