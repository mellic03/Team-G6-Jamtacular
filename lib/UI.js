class UI {
    constructor(){ //put player in constructor parameters later
        // this.player = player;
        this.player = {};
        this.player.health = 20;
    }

    // shows health bar
    hpBar(x, y){
        camera.off();
        fill("red");
        rect(x+10, y+20, this.player.health*3, 30);
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
        rect(x, y, 200, 100);

        this.hpBar(x, y);
        this.level();
        this.score();

        // turn camera back on
        camera.on();
    }
}