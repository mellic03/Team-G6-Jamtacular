class UI {
    constructor(owner) {
        this.owner = owner;

        // this.uiGraphics = createGraphics(800, 600);
    
        // this.healthFull = createVector(0, 255, 0);
        // this.healthEmpty = createVector(255, 0, 0);

        // melee weapon img since it is attached to player sprite
        this.melee_img = loadImage("assets/img/weapon/melee.png");

        // states
        this.LOADING = 0;
        this.MAIN_MENU = 1;
        this.MAIN_GAME = 2;
        this.DEATH_SCREEN = 3;
        this.RESTART = 4;
        this.CREDITS = 5;
        
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
        //     case this.CREDITS:
        //         this.creditsScreen();
        //         break;
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

        textAlign(CENTER, CENTER);
        rectMode(CORNER);
        imageMode(CENTER);
        textFont(myFont);

        textSize(20);

        // health background
        fill(255, 0, 0);
        rect(25, 25, 100, 20);

        // health bar
        fill(0, 255, 0);
        rect(25, 25, this.owner.health, 20);
        fill(255);
        text(round(this.owner.health, 0), 50, 35);


        this.showCoordinates(750, 25);

        // current weapon
        //text("Weapon", 55, 100);
        fill(255, 255, 255, 100);
        rect(25, 50, 50, 50);
        if (this.owner.MELEE){
            image(this.melee_img, 50, 75);
        }
        if (this.owner.GRAPPLE){
            if (this.owner.grapple.grappled){
                image(this.owner.grapple_open_img, 38, 75);
            }else{
                image(this.owner.grapple_closed_img, 38, 75);
            }
        }
        if (this.owner.RANGED){
            image(this.owner.rangedImg, 38, 75);

            // ammo bar
            fill("orange");
            rect(25, 95, 0.91*this.owner.rangedWeapon.ammo, 5);
            fill(255);
            text(round(this.owner.rangedWeapon.ammo, 0), 50, 60);
        }
        if (this.owner.RED_KEY) {
            image(red_key_img, 42, 75);
        }
        if (this.owner.BLUE_KEY) {
            image(blue_key_img, 42, 75);
        }
        camera.on();
    }

    loadingMenu() {
        // change crosshair to mouse
        cursor("grab");

        // turn off player controls
        player.controllable = false;

        // make main menu appear after 2 seconds
        if (frameCount == 120){
            this.STATE = this.MAIN_MENU;
        }
        fill(255, 255, 255, 200);
        noStroke();
        ellipse(width/2, height/2, 200, 200);
        textSize(40);
        stroke(10);
        textFont(myFont);
        fill('black');
        text('Loading...', width/2, height/2);
    }

    mainMenu() {

         // bg 
         noStroke();
         fill(255, 255, 255, 200);
         rect(150, 27, width/2 +100, height-50, 10);
 
         // text
         textSize(40);
         stroke(10);
         
         fill('black');
         text('MAIN MENU', width/2, 100);

        //  button(str, x, y, w, h, state)
        this.button("START GAME", 335, 200, 130, 50, this.MAIN_GAME);
        
        this.button("CREDITS", 335, 300, 130, 50, this.CREDITS);
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
        noStroke();
        fill(0, 0, 0, 200);
        rect(150, 27, width/2 +100, height-50, 10);

        // text
        textSize(40);
        stroke(10);
        textFont(myFont);
        fill('white');
        text('YOU HAVE DIED', width/2, height/2-100);


        //  button(str, x, y, w, h, state)
        this.button("RESTART", 335, 260, 130, 50, this.RESTART);

    }

    // as requested by Amira
    creditsScreen(){
        // change crosshair to mouse
        cursor("grab");

        // turn off player controls
        player.controllable = false;

        // bg 
        noStroke();
        fill(255, 255, 255, 200);
        rect(150, 27, width/2 +100, height-50, 10);

        // text
        textSize(40);
        stroke(10);
        
        fill('black');
        text('CREDITS', width/2, 100);
        
        text('Amira Maszidi', width/2, 200);
        text('Jessica Chen', width/2, 250);
        text('Michael Ellicott ', width/2, 300);
        text('Samson Awili', width/2, 350);

        this.button("BACK", 335, 460, 130, 50, this.MAIN_MENU);
    }

    showCoordinates(x, y) {
        text("x: " + round(this.owner.crosshair.x, 0), x, y);
        text("y: " + round(this.owner.crosshair.y, 0), x, y+20);
    }




    // provide string, position, dimensions and state to change this.state to
    button(str, x, y, w, h, state) {

        let boxColor;
        let textColor;

        // if mouse is within the button:
        if (mouseX > x && mouseX < x+w && mouseY > y && mouseY < y+h){
            boxColor = 0;
            textColor = 255;
        
            // change the state if button is pressed! 
            if (this.STATE !== undefined && mouseIsPressed) {
                this.STATE = state;
            }
        }
          
    
        else {
            boxColor = "#cdf842";
            textColor = "black";
        }
    
        fill(boxColor);
        rect(x, y, w, h, 20);
    
        textFont(myFont);
        strokeWeight(1);
        textSize(20);
        fill(textColor);
        text(str, x+65, y+25);
    }
}