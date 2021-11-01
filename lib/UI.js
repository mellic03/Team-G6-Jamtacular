class UI {
    constructor(player){// passes in player object from main.js
        this.player = player;
    }

    // shows health bar
    hpBar(x, y){
        camera.off();

        // show hp images according to player health in Player class
        if (this.player.health <= 100 && this.player.health > 66){
            // show green health bar
            fill("green");
            noStroke();
            rect(x+10, y+20, this.player.health*2, 30);
        }else if(this.player.health <= 66 && this.player.health > 33){
            // show yellow health bar
            fill("yellow");
            noStroke();
            rect(x+10, y+20, this.player.health*2, 30);
        }else if (this.player.health <= 33 && this.player.health > 0){
            // show red health bar
            fill("red");
            noStroke();
            rect(x+10, y+20, this.player.health*2, 30);
        }

        camera.on();
    }

    // shows player current level
    level(){

    }

    // shows player score
    score(){

    }

    draw(x, y){
        // turn camera off
        camera.off();

        noFill();
        stroke("RED");
        rect(x, y, 300, 100);

        this.hpBar(x, y);
        this.level();
        this.score();

        // turn camera back on
        camera.on();
    }
}
