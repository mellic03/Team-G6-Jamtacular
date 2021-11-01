class Enemy {

  constructor(type) {
    type = 'goomba'; //replace with enemy type
    this.type = type;
    this.sprite;
  }

  generate(x, y) { 
      if(this.type == 'goomba') {
        this.sprite = createSprite(x, y, width/20, width/20);
        //   this.sprite = addImage(); // ALSO ADD IMAGE PARAMETER TO GENERATE
        console.log(this.sprite);
    }
  }


  logic(track) {
      if(track.sprite.position.x<this.sprite.position.x){
        this.sprite.velocity.x = -1;
    }

      if(track.sprite.position.x>this.sprite.position.x){
        this.sprite.velocity.x = 1;
      }
  }
}
