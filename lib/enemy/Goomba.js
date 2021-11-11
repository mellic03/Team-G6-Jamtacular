class Goomba {

  constructor(x, y, target) {

    this.type = 'goomba'; //replace with enemy type
    this.sprite = createSprite(x, y, 10, 10);
    this.target = target;
    this.health = 5;
  }


  draw() {

    if (this.target.sprite.position.x < this.sprite.position.x) {
      this.sprite.velocity.x = -1;
    }

    if (this.target.sprite.position.x > this.sprite.position.x) {
      this.sprite.velocity.x = 1;
    }

    this.target.sprite.bounce(this.sprite, this.knockback);
    
    drawSprite(this.sprite);
  }

  knockback(a, b) {
    
    if (b.position.x < a.position.x) {
      b.velocity.x -= 50;
    }

    if (b.position.x > a.position.x) {
      b.velocity.x += 50;
    }
  }
}
