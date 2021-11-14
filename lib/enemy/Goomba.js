class Goomba {

  constructor(x, y, target, minX, maxX) {

    this.collisionType = "normal";
    this.name = "goomba";

    this.target = target;
    this.health = 15;
    this.prevHealth = this.health;
    this.damage = 5;

    this.minX = minX;
    this.maxX = maxX;

    this.anim = loadSpriteSheet("assets/img/enemy/goomba_anim.png", 42, 42, 6);

    this.sprite = createSprite(x, y, 10, 10);
    this.sprite.addAnimation("run", this.anim);
    this.sprite.maxSpeed = 1;
    this.sprite.setCollider("circle", 0, 5, 20);

    // audio
    this.hurtSound = goomba_hurt;
    
    // drops pickups
    this.healthDrop = new Pickup("health", -100, -100);
  }


  draw() {

    // update location to drop health
    this.healthDrop.pos = this.sprite.position;

    if (this.health > 0) {

      // gravity
      this.sprite.velocity.y = 1;

      // move toward target only on x axis
      let dir = Math.sign(this.target.sprite.position.x - this.sprite.position.x);
      this.sprite.position.x += dir;
      this.sprite.mirrorX(dir);

      // enemy wont move outside of range (minX, maxX)

      this.sprite.position.x = constrain(this.sprite.position.x, this.minX, this.maxX);

      //if (this.sprite.position.x <= this.minX) {
      //  this.sprite.position.x += 2;
      //}

      //if (this.sprite.position.x >= this.maxX) {
      //  this.sprite.position.x -= 2;
      //}

      // player can harm enemy
      if (this.target.projectiles.overlap(this.sprite)) {
        this.health -= this.target.damage;
      }
      this.target.projectiles.overlap(this.sprite, projectileCleanup);

      // enemy can harm player
      if (this.sprite.overlap(this.target.sprite)) {
        this.damagePlayer(this.sprite, this.target);
      }

      this.showHealth();
      drawSprite(this.sprite);
    }

    else if (this.health <= 0) {
      this.healthDrop.draw();
      this.sprite.maxSpeed = 0;
    }


    if (this.health < this.prevHealth) {
      this.hurtSound.play();
    }

    this.prevHealth = this.health;
  }


  showHealth() {
    noStroke();

    rectMode(CENTER);

    fill(255, 0, 0);
    rect(this.sprite.position.x, this.sprite.position.y - 50, 50, 5);
    
    fill(0, 255, 0);
    rect(this.sprite.position.x, this.sprite.position.y - 50, this.health*2, 5);
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
