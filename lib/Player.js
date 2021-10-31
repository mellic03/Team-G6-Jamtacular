class Player {

    constructor() {
        this.sprite;

        // variables for jump logic
        this.canJump = true;
        this.jumpRecharging = false;
        this.jumpCounter = 0;
    }

    generate(x, y) {
        this.sprite = createSprite(x, y, width/20, width/20);
        console.log(this.sprite);
    }


    control() {
        
        // camera follows player + mouse
        camera.position.x = player.sprite.previousPosition.x + 0.3*(mouseX - width/2);
        camera.position.y = player.sprite.previousPosition.y - 100 + 0.3*(mouseY - height/2);

        this.sprite.friction = 0.1;

        if (keyIsDown(65)) {
            this.sprite.velocity.x -= 1;
        }
        else if (keyIsDown(68)) {
            this.sprite.velocity.x += 1;
        }
        

        // jump logic UNFINISHED
        if (keyIsDown(32)) {

            this.sprite.velocity.y -= 1;
        }
        else {
            this.sprite.position.y += 4;
        }
        ////////////////////////////////


        this.sprite.maxSpeed = 5;
        console.log(this.jumpCounter)
    }
}