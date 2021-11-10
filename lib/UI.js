class UI {
    constructor(owner) {
        this.owner = owner;

        this.uiGraphics = createGraphics(800, 600);
    
        this.healthFull = createVector(0, 255, 0);
        this.healthEmpty = createVector(255, 0, 0);


        // states
        this.LOADING = 0;
        this.MAIN_MENU = 1;
        this.MAIN_GAME = 2;
        this.DEATH_SCREEN = 3;
        this.RESTART = 4;
        
        // current state starts at loading screen
        this.STATE = 0;
    }

    draw() {
        camera.off();

        // switch (this.STATE) {
        //     case this.LOADING:
        //        this.loadingMenu();
        //        break;
        //     case this.MAIN_MENU:
        //        this.mainMenu();
        //        break;
        //     case this.MAIN_GAME:
        //        this.mainGame();
        //        break;
        //     case this.DEATH_SCREEN:
        //        this.deathScreen();
        //        break;
        //     case this.RESTART:
        //         window.location.reload();
        //         break;
        // }


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

        // current weapon
        text("Weapon", 50, 75);
        noFill();
        rect(50, 100, 50, 50);
        if (this.owner.MELEE){
            
        }
        if (this.owner.GRAPPLE){
            if (this.owner.grapple.grappled){
                image(this.owner.grapple_open_img, 60, 60);
            }else{
                image(this.owner.grapple_closed_img, 60, 60);
            }
        }
        if (this.owner.RANGED){
            image(this.owner.rangedImg, 60, 60);
        }

        camera.on();
    }

    loadingMenu() {
        // make main menu appear after 2 seconds
        if (frameCount == 120){
            this.STATE = this.MAIN_MENU;
        }
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

    mainMenu() {
        // change crosshair to mouse
        cursor("grab");

        // turn off player controls
        player.controllable = false;

         // bg 
         rectMode(CENTER);
         noStroke();
         fill(255, 255, 255, 200);
         rect(width/2, height/2, width/2 +100, height-50, 10);
 
         // text
         textAlign(CENTER, CENTER);
         textSize(40);
         stroke(10);
         textFont(myFont);
         fill('black');
         text('MAIN MENU', width/2, 100);

        //  button(str, x, y, w, h, state)
        this.button("START GAME", width/2-130, height/2, 130, 50, this.MAIN_GAME);
    }


    mainGame(){
        // change crosshair to mouse
        cursor(CROSS);

        // turn off player controls
        player.controllable = true;

        if (this.owner.health == 0){
            this.STATE = this.DEATH_SCREEN;
        }
    }

    deathScreen() {
        // bg 
        rectMode(CENTER);
        noStroke();
        fill(255, 255, 255, 200);
        rect(width/2, height/2, width/2 +100, height-50, 10);

        // text
        textAlign(CENTER, CENTER);
        textSize(40);
        stroke(10);
        textFont(myFont);
        fill('black');
        text('DEATH SCREEN', width/2, 100);


        //  button(str, x, y, w, h, state)
        this.button("RESTART GAME", width/2-130, height/2, 130, 50, this.RESTART);

    }

    // as requested by Amira
    creditScreen(){

    }

    showCoordinates(x, y) {
        text("x: " + round(this.owner.crosshair.x, 0), x, y);
        text("y: " + round(this.owner.crosshair.y, 0), x, y+20);
    }




    // provide string, position, dimensions and state to change this.state to
    button(str, x, y, w, h, state) {

        let boxColor;
        let textColor;

        if (mouseX > x - (w/2) && mouseX < x + (w/2) && mouseY > y - (h/2) && mouseY < y + (h/2)) {

          boxColor = 0;
          textColor = 255;
    
            if (this.STATE !== undefined && mouseIsPressed) {
                this.STATE = state;
            }
            
        }
    
        else {
            boxColor = "#cdf842";
            textColor = "black";
        }
    
        rectMode(CENTER);
        fill(boxColor);
        rect(x, y, w, h, 20);
    
        textFont(myFont);
        strokeWeight(1);
        textAlign(CENTER, CENTER);
        textSize(20);
        fill(textColor);
        text(str, x, y);
    }
}











