class UI {
    constructor(){ //put player in constructor parameters later
        // this.player = player;
    }

    // shows health bar
    hpBar(){

    }

    // shows player current level
    level(){

    }

    score(){

    }

    all(x, y){
        rect(x, y, 100, 100);

        this.hpBar();
        this.level();
        this.score();
    }
}