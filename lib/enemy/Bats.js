class Bats {
  
  // provide x and y position, along with x and y dimensions
  constructor(xPos, yPos, xWidth, yWidth, debug) {

    this.debug;

    this.collisionType = "none";
    this.name = "bats";

    if (debug) {
      this.debug = debug;
    }

    this.boxPos = createVector(xPos, yPos);
    this.xWidth = xWidth;
    this.yWidth = yWidth;

    // this.x, this.y is center of box
    this.lowestX = xPos - xWidth/2;
    this.lowestY = yPos - yWidth/2;
    this.highestX = xPos + xWidth/2;
    this.highestY = yPos + yWidth/2;

    this.balls = new Group();
    this.ballImg = loadImage("assets/img/enemy/stanky/projectile.png");
    this.ballImg.resize(15, 15);

    // single sprite used for location
    this.sprite = createSprite(xPos, yPos, 0, 0);

    // create many sprites
    for (let i = 0; i < 10; i++) {
      let ballSprite = createSprite(random(this.lowestX, this.highestX), random(this.lowestY, this.highestY));
      ballSprite.velocity.x = random(-2, 2);
      ballSprite.velocity.y = random(-2, 2);
      ballSprite.setCollider("circle", 0, 0, 15);
      ballSprite.addAnimation("bats", batImg);
      this.balls.add(ballSprite);
    }
  }

  draw() {

    if (this.debug) {
      rectMode(CENTER);
      noFill();
      stroke(255);
      rect(this.boxPos.x, this.boxPos.y, this.xWidth, this.yWidth);
    }


    for (let ball of this.balls) {

      // make the monsters move
      ball.position.x += ball.velocity.x;
      ball.position.y += ball.velocity.y;

      if (ball.position.x < this.lowestX || ball.position.x > this.highestX) {
        ball.velocity.x = -ball.velocity.x;
      }

      if (ball.position.y < this.lowestY || ball.position.y > this.highestY) {
        ball.velocity.y = -ball.velocity.y;
      }

      // draw the monster as a red dot just to test
      //fill (255, 0 ,0);
      //ellipse(ball.position.x, ball.position.y, 15, 15);
    }

    drawSprites(this.balls);
    
    player.sprite.overlap(this.balls, this.harm);
    
    for (let projectile of player.projectiles) {
      projectile.overlap(this.balls, this.shootBalls);
    }

  }

  harm() {
    player.health -= 25;
  }

  shootBalls(a, b) {

    b.remove();

  }
}



