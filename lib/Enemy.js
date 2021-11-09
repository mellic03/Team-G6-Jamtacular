class Enemy {
  constructor() {
  }



}

var Monster = function (x, y, speed, size) {
  this.x = x;
  this.y = y;
  this.xVelocity = random(-speed, speed);
  this.yVelocity = random(-speed, speed);
  this.speed = speed;
  this.size = size;
  this.update = function() {
      // make the monsters move
      this.x = this.x + this.xVelocity;
      if (this.x < 10 || this.x > 390) {
        this.xVelocity = -this.xVelocity;
      }
      this.y = this.y + this.yVelocity;
      if (this.y < 10 || this.y > 390) {
        this.yVelocity = -this.yVelocity;
      }
      // draw the monster as a red dot just to test
      fill (255,0 ,0);
      ellipse (this.x, this.y, this.size, this.size);
  };
};

// // to test if monster appears (as a dot)
// new monster1 = new Monster(200,200,20, 2);
// new monster = new Monster(200,200,20, 2);

// empty list of monsters
// var monsters = [];
// for (var i = 0; i < 10; i++) {
//   monsters [i] = new Monster (random (10, 390), random (10, 390), random (0, 7), 20);
// }

// var draw = function (){
//   background("white");
//   // monster1.update();      // test
//   // monster2.update();       // test
//   for (var i = 0; i < monsters.length; i++) {
//     monsters [i].update();
//   }


// };
