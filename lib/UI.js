class UI {
    constructor(player){ //put player in constructor parameters later
        this.player = player;
    }

    // shows health bar
    hpBar(x, y){
        camera.off();
        fill("red");
        rect(x+10, y+20, this.player.health*2, 30);
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