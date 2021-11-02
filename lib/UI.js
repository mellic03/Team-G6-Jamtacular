class UI {
    constructor(player){// passes in player object from main.js
        this.player = player;
        this.mainMenu;
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
    level(x, y){
        camera.off();
        fill("white");
        textFont(myFont);
        textSize(20);
        text(`Level: 1`, x+10, y+100);
        camera.on();
    }

    // shows player score
    score(){

    }


    // shows player ammo
    ammo(x, y){
        camera.off();
        fill("white");
        text(`Ammo: ${this.player.ammo}`, x+10, y+75);
        camera.on();
    }

    draw(x, y){
        // turn camera off
        camera.off();

        // temporary rect to figure out placing on canvas
        // noFill();
        // stroke("RED");
        // rect(x, y, 300, 125);

        this.hpBar(x, y);
        this.level(x, y);
        this.score();
        this.ammo(x, y);

        // turn camera back on
        camera.on();
    }

    // main menu screen 
    mainMenu(){

    }

    // death screen tied to player class -> alive boolean
    deathScreen(){

    }
}
