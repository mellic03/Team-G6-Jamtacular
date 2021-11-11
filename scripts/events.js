
// main function, everything goes in here
function events() {
    
    textAlign(CENTER, CENTER);
    fill(255);

    stankyDialogue.runDialogue();

    pickup("grapple", 2400, 7700);
    pickup("rangedWeapon", 100, 3200);
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
                text("If you free me I can help you get out,", x, y);
            break;

            case (this.d0Timer < 960):
                text("there's a grappling hook down there...", x, y);
            break;

            case (this.d0Timer > 960 && this.d0Timer < 1000):
                this.dialogueState = 1;
                player.controllable = true;
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
                    text("Next you'll need to see in the dark,", x, y);
                break;
    
                case (this.d1Timer < 720):
                    text("In the area to the right you'll", x, y);
                break;
    
                case (this.d1Timer < 840):
                    text("find something for that", x, y);
                break;
    
                case (this.d0Timer > 960):
                    this.dialogueState = 2;
                    player.controllable = true;
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
            image(grapple_open, x-50, y);
        }
    
        if (player.sprite.position.dist(pos) < 20) {
            player.CAN_GRAPPLE = true;
            player.GRAPPLE = true;
            player.MELEE = false;
        }
    }


    if (type == "rangedWeapon") {
        if (!player.CAN_RANGED) {
            image(pistol_img, x-50, y);
        }
    
        if (player.sprite.position.dist(pos) < 20) {
            player.GRAPPLE = false;
            player.MELEE = false;
            player.CAN_RANGED = true;
            player.RANGED = true;
        }
    }

}



// sprite related functions

    // handles player collisions and map drawing
    function mapHandler() {

        for (let map of allMaps) {  // for each map

            if (map.active) {   // draw map if map is active
                
                // remove player projectiles
                player.projectiles.collide(map.mapObject.allBlocks, projectileCleanup);
                player.sprite.collide(map.mapObject.allBlocks);
        
                // remove stanky projectiles
                stanky.projectiles.collide(map.mapObject.allBlocks, projectileCleanup);
                stanky.sprite.collide(map.mapObject.allBlocks);
        
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

