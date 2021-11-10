class notEnemy {

  constructor(x, y) {

    this.type = 'goomba'; //replace with enemy type
    this.sprite = createSprite(x, y, 10, 10);

    this.health = 5;
  }


  generate() { 


  }


  logic(target) {

    if (target.sprite.position.x < this.sprite.position.x) {
      this.sprite.velocity.x = -1;
    }

    if (target.sprite.position.x > this.sprite.position.x) {
      this.sprite.velocity.x = 1;
    }


    target.sprite.collide(this.sprite, this.knockback);


    drawSprite(this.sprite);
  }

  knockback(a, b) {
    
    if ()

  }
}
