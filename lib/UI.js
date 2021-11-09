
class UI {
    constructor(owner) {
        this.owner = owner;

        this.uiGraphics = createGraphics(800, 600);
    
    
        this.healthFull = createVector(0, 255, 0);
        this.healthEmpty = createVector(255, 0, 0);
    }

    draw() {
        camera.off();

        textSize(20);
        textAlign(CENTER, CENTER);

        // health background
        fill(255, 0, 0);
        rect(50, 25, 100, 20);

        // health bar
        fill(0, 255, 0);
        rect(50, 25, 20 * (this.owner.health / 20), 20);
        fill(255);
        text(round(this.owner.health, 0), 100, 37);

        // ammo bar
        fill(255, 255, 0);
        rect(50, 50, 20 * (this.owner.rangedWeapon.ammo / 20), 20);
        fill(255);
        text(round(this.owner.rangedWeapon.ammo, 0), 100, 62);

        this.showCoordinates(750, 25);

        camera.on();
    }


    showCoordinates(x, y) {
        text("x: " + round(this.owner.crosshair.x, 0), x, y);
        text("y: " + round(this.owner.crosshair.y, 0), x, y+10);

    }

}














/*
class UI {
    constructor(player){// passes in player object from main.js
        this.player = player;
    }

    // shows health bar
    hpBar(x, y){
        camera.off();
        
        // health bar bg base
        image(hpBarBg, x, y - 30);
        
        // show hp images according to player health in Player class
        if (this.player.health <= 100 && this.player.health > 66){
            // show green health bar
            image(hpBarGreen, x, y - 30);
        }else if(this.player.health <= 66 && this.player.health > 33){
            // show yellow health bar
            image(hpBarYellow, x, y - 30);
        }else if (this.player.health <= 33 && this.player.health > 0){
            // show red health bar
            image(hpBarRed, x, y - 30);
        }

        camera.on();
    }

    // shows player current level
    level(x, y){
        //camera.off();
        //fill("white");
        //textFont(myFont);
        //textSize(20);
        //text(`Level: 1`, x+10, y+100);
        //camera.on();
    }

    // shows player ammo
    ammo(x, y){
        camera.off();
        fill("white");
        text(`Ammo: ${player.rangedWeapon.ammo}`, x+10, y+75);
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
        this.ammo(x, y);

        // turn camera back on
        camera.on();
    }

    // loading screen 
    loading(button){
        // make main menu appear after 2 seconds
        if (frameCount == 120){
            currentScreen = MAIN_MENU;
        }
        
        button.hide();
        fill(255, 255, 255, 200);
        noStroke();
        ellipse(width/2, height/2, 200, 200);
        textAlign(CENTER, CENTER);
        textSize(40);
        stroke(10);
        textFont(myFont);
        fill('black');
        text('Loading...', width/2, height/2);
    }

    // main menu screen 
    mainMenu(button){
        // start game button 
        button.show();
        button.position(width/2 + 50, height/2 +50);

        rectMode(CENTER);
        noStroke();
        fill(255, 255, 255, 200);
        rect(width/2, height/2, width/2 +100, height-50, 10);
    }

    // death screen tied to player class -> alive boolean
    deathScreen(){

    }
}
*/