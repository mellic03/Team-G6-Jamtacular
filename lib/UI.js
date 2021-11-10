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
        
        this.STATE = 1;
    }

    draw() {
        camera.off();

        //switch (this.STATE) {
        //    case this.LOADING:
        //        this.loadingMenu();
        //        break;
        //    case this.MAIN_MENU:
        //        this.mainMenu();
        //        break;
        //    case this.MAIN_GAME:
        //        this.mainGame();
        //        break;
        //    case this.DEATH_SCREEN:
        //        this.deathscreen();
        //        break;
        //}


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

    
    mainMenu() {
        cursor("grab");
        player.controllable = false;

        fill(220);
        rect(0, 0, 800, 600);

        this.button("TEST BUTTON", 400, 300, 130, 50, this.MAIN_MENU);
    }


    loadingMenu() {
        
    }


    deathScreen() {

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
            boxColor = 255;
            textColor = 0;
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











