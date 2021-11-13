
let stankySwitch = true;


// main events function, everything event-related goes in here
function events() {
    
    textAlign(CENTER, CENTER);
    fill(255);

    stankyDialogue.runDialogue();

    pickup("grapple", 2400, 7700);
    pickup("rangedWeapon", 100, 3200);
    pickup("nightVision", 300, 9500);
    pickup("redKey", 1900, 5800);
    pickup("blueKey", 2700, 11600);


    if (keyIsDown(97)) {
        stankyJailLeft.locked = false;
        stankyJailRight.locked = false;

    }

    // condition to free stanky


    // unlock blue lock
    if (stankyJailLeft.block && stankyJailRight.block) {

        if (player.sprite.position.dist(stankyJailLeft.block.position) < 100 && player.BLUE_KEY) {
            if (mouseIsPressed && mouseButton == LEFT) {
                stankyJailLeft.locked = false;
                stankyJailLeft.block.changeImage("unlocked");}
        }
    
        // unlock red lock
        if (player.sprite.position.dist(stankyJailRight.block.position) < 100 && player.RED_KEY) {
            if (mouseIsPressed && mouseButton == LEFT) {
                stankyJailRight.locked = false;
                stankyJailRight.block.changeImage("unlocked");
            }
        }
    
    
        // release stanky
        if (!stankyJailLeft.locked && !stankyJailRight.locked && stankySwitch) {
            
            stankyJailLeft.remove();
            stankyJailRight.remove();
            
            player.sprite.velocity.x -= 15;
            player.sprite.velocity.y -= 50;
            
            stanky.jailed = false;
            stanky.attackTarget = true;
            
    
            map3.sound = stanky_fight_loop;
            map3.sound.loop();
            stankySwitch = false;
        }  
    }




}


let stankyDialogue = {

    dialogueState: 0,
    distance: 50,

    d0Timer: 0,
    d1Timer: 0,
    d2Timer: 0,
    d3Timer: 0,

    runDialogue: function() {

        let pos = createVector(1100, 7500);
        speakerPos = stanky.sprite.position;

        if (player.sprite.position.dist(pos) < this.distance && !player.falling) {

            switch (this.dialogueState) {
        
                case 0:
                    this.d0(speakerPos.x, speakerPos.y - 150);
                break;
                
                case 1:
                    this.d1(speakerPos.x, speakerPos.y - 150);
                break;
    
                case 2:
                    this.d2(speakerPos.x, speakerPos.y - 150);
                break;    
            }
        }
    },
    

    d0: function(x, y) {

        switch(true) {


            case (this.d0Timer < 240):
                text("Hey! you fell down here too?", x, y);
            break;

            case (this.d0Timer < 480):
                text("I'm trapped in here, I need help.", x, y);
            break;

            case (this.d0Timer < 720):
                text("I could blow apart that lock if you let me out,", x, y);
            break;

            case (this.d0Timer < 960):
                text("there's a grappling hook down there somewhere...", x, y);
            break;

            case (this.d0Timer > 960 && this.d0Timer < 1000):
                this.dialogueState = 1;
            break;
        }

        this.d0Timer++;
    },


    d1: function(x, y) {

        if (player.CAN_GRAPPLE) {

            switch(true) {

                case (this.d1Timer < 240):
                    text("Hey! You found it!", x, y);
                break;
    
                case (this.d1Timer < 480):
                    text("Next you'll need to find the keys for these locks,", x, y);
                break;
    
                case (this.d1Timer < 720):
                    text("I know one is in the dark area below...", x, y);
                break;
    
                case (this.d0Timer > 840):
                    this.dialogueState = 2;
                break;
            }
        
            this.d1Timer++;
        }
    
        else {
            text("Come back once you've found it.", x, y);
        }
    },

    d2: function(x, y) {
        text("case 2!", x, y);
    },
}


// at (2400, 4700) place grapple pickup
function pickup(type, x, y) {

    let pos = createVector(x, y);

    if (type == "grapple") {

        if (!player.CAN_GRAPPLE) {
            image(grapple_open, x, y);
        
            if (player.sprite.position.dist(pos) < 20) {
                player.CAN_GRAPPLE = true;
                player.GRAPPLE = true;
                player.MELEE = false;
            }
        }
    }

    if (type == "rangedWeapon") {
        
        if (!player.CAN_RANGED) {
            image(pistol_img, x, y);
        
            if (player.sprite.position.dist(pos) < 20) {
                player.GRAPPLE = false;
                player.MELEE = false;
                player.CAN_RANGED = true;
                player.RANGED = true;
            }
        }
    }

    if (type == "nightVision") {
        
        if (!player.CAN_NIGHTVISION) {

            image(eye_img, x, y);

            if (player.sprite.position.dist(pos) < 20) {
                player.CAN_NIGHTVISION = true;
            }
        }

    }
    
    if (type == "blueKey") {
        
        if (!player.CAN_BLUE_KEY) {
            image(blue_key_img, x, y);
        
            if (player.sprite.position.dist(pos) < 20) {
                player.GRAPPLE = false;
                player.MELEE = false;
                player.RANGED = false;
                player.BLUE_KEY = true;
            }
        }
    }

    if (type == "redKey") {
        
        if (!player.CAN_RED_KEY) {
            image(red_key_img, x, y);
        
            if (player.sprite.position.dist(pos) < 20) {
                player.GRAPPLE = false;
                player.MELEE = false;
                player.RANGED = false;
                player.BLUE_KEY = false;
                player.CAN_RED_KEY = true;
                player.RED_KEY = true;
            }
        }
    }

}

let playAmbiance = true;

// sprite related functions

    // handles player collisions and map drawing
    function mapHandler() {

        for (let map of allMaps) {  // for each map

            if (map.active) {   // draw map if map is active
                

                if (map != map2) {
                    map.bgObject.draw();
                    map.mapObject.draw();
                }

                else if (map == map2) {
                    player.raycastMechanic();            
                }
            
            }
            // run transitions
            map.transitions();
        }
    }


    // deletes all sprites of a map
    function unloadMap(map) {

        for (let block of map.bgObject.allBlocks) {
            block.remove();
        }
        for (let block of map.mapObject.allBlocks) {
            block.remove();
        }

        map.bgObject.allBlocks.removeSprites();
        map.mapObject.allBlocks.removeSprites();
        
        map.active = false;
    }


    // remove sprite, use as callback in collisions
    function projectileCleanup(a) {
        a.remove();
    }


// damage
function kill(a, b) {

    if (a.health) {
      a.health = 0;
    }
    
    if (b.health) {
      b.health = 0;
    }
  
    player.health = 0;
}

