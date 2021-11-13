let playerJailed = false;
let playerJailPlaceSwitch = true;

let anglers = [];
let goombas = [];


// main events function, everything event-related goes in here
function events() {
    
    textAlign(CENTER, CENTER);
    fill(255);

    stankyDialogue.runDialogue();

    for (let pickup of pickups) {
        pickup.draw();
    }

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
                stankyJailLeft.block.changeImage("unlocked");
            }
        }
    
        // unlock red lock
        if (player.sprite.position.dist(stankyJailRight.block.position) < 100 && player.RED_KEY) {
            if (mouseIsPressed && mouseButton == LEFT) {
                stankyJailRight.locked = false;
                stankyJailRight.block.changeImage("unlocked");
            }
        }
    
        // release stanky
        if (!stankyJailLeft.locked && !stankyJailRight.locked && stanky.jailed) {
            
            // remove stanky jail locks
            stankyJailLeft.remove();
            stankyJailRight.remove();
            
            // push player away and switch to grapple
            player.sprite.velocity.x -= 15;
            player.sprite.velocity.y -= 50;

            stanky.jailed = false;
            stanky.attackTarget = true;
            
            // play music
            map3.sound = stanky_fight_loop;
            map3.sound.loop();
            stankyDialogue.dialogueState = 2;

            for (let blockade of blockades_postRelease) {
                blockade.place();
            }

            // add 5 angler enemies
            for (let i = 0; i < 5; i++) {
                anglers[i] = new Angler(random(10000, 12800), random(6000, 7500), player, "normal");
            }

            // add 3 goomba enemies
            goombas[0] = new Goomba(10700, 6800, player, 10500, 10900);
            goombas[1] = new Goomba(12200, 6800, player, 12000, 12400);
            goombas[2] = new Goomba(11500, 6400, player, 11200, 11700);
        }

        // player jail
        if (playerJailPlaceSwitch) {
            triggerJail.draw();
        }
    }
}



let playerDialogue = {

    dialogueState: 0,
    distance: 50,

    d0Timer: 0,
    d1Timer: 0,
    d2switchChance: 0,

    runDialogue: function() {

        let pos = createVector(11100, 7500);
        let speakerPos = player.sprite.position;

        switch (this.dialogueState) {
    
            case 0:
                if (player.sprite.position.dist(pos) < this.distance && !player.falling) {
                    this.d0(speakerPos.x, speakerPos.y - 150);
                }
            break;
            
            case 1:
                if (player.sprite.position.dist(pos) < this.distance && !player.falling) {
                    this.d1(speakerPos.x, speakerPos.y - 150);
                }
            break;

            case 2:
                this.d2(speakerPos.x, speakerPos.y - 150);
            break;    
        }
    },


    d0: function(x, y) {

        switch(true) {

            case (this.d0Timer < 240):
                text("Hey! you fell down here too?", x, y);
            break;

        }

        this.d0Timer++;
    },

}




let stankyDialogue = {

    dialogueState: 0,
    distance: 50,

    d0Timer: 0,
    d1Timer: 0,
    d2switchChance: 0,

    runDialogue: function() {

        let pos = createVector(11100, 7500);
        let speakerPos = stanky.sprite.position;

        switch (this.dialogueState) {
    
            case 0:
                if (player.sprite.position.dist(pos) < this.distance && !player.falling) {
                    this.d0(speakerPos.x, speakerPos.y - 150);
                }
            break;
            
            case 1:
                if (player.sprite.position.dist(pos) < this.distance && !player.falling) {
                    this.d1(speakerPos.x, speakerPos.y - 150);
                }
            break;

            case 2:
                this.d2(speakerPos.x, speakerPos.y - 150);
            break;    
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
                    text("Once you find them I can break that lock for you.", x, y);
                break;
            }
        
            this.d1Timer++;
        }
    
        else {
            text("Come back once you've found it.", x, y);
        }
    },


    d2: function(x, y) {

        // every 120 frames the dialouge may switch
        if (frameCount % 120 == 0) {
            this.d2switchChance = round(random(0, 10));
        }

        switch(true) {

            case (this.d2switchChance <= 5):
                text("DIEDIEDIEDIEDIE!", x, y);
            break;

            case (this.d2switchChance > 5):
                text("YOU FUCKING IDIOT!", x, y);
            break;
        }
    },
}


let playAmbiance = true;

// sprite related functions

    // handles player collisions and map drawing
    function mapHandler() {

        for (let map of allMaps) {  // for each map

            if (map.active) {   // draw map if map is active
                
                map.bgObject.draw();

                if (map != map2) {
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

