class Goomba {

  constructor(x, y, target) {

    this.target = target;
    this.health = 15;
    this.damage = 5;

    this.anim = loadSpriteSheet("assets/img/enemy/goomba_anim.png", 42, 42, 6);

    this.sprite = createSprite(x, y, 10, 10);
    this.sprite.addAnimation("run", this.anim);
    this.sprite.maxSpeed = 1;
    this.sprite.setCollider("rectangle", 0, 5, 20, 30);
    
    if (allEntities) {
      allEntities.push(this);
    }
  }


  draw() {

    if (this.health > 0 && this.sprite.position.dist(this.target.sprite.position) < 800) {

      // gravity
      this.sprite.velocity.y = 1;

      // move toward target only on x axis
      let dir = Math.sign(this.target.sprite.position.x - this.sprite.position.x);
      this.sprite.velocity.x += dir;
      this.sprite.mirrorX(dir);

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
  }


  showHealth() {
    noStroke();
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
