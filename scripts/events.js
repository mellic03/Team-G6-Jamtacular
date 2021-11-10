
// main function, everything goes in here
function events(x, y) {
    
    textAlign(CENTER, CENTER);
    fill(255);

    stankyDialogue.runDialogue();

}





let stankyDialogue = {

    dialogueState: 0,
    distance: 50,

    d0Timer: 0,
    d1Timer: 0,
    d2Timer: 0,
    d3Timer: 0,


    runDialogue: function() {

        let pos = createVector(1100, 4500);
        speakerPos = stanky.sprite.position;

        if (player.sprite.position.dist(pos) < this.distance) {

            switch (this.dialogueState) {
        
                case 0: 
                    this.d0(speakerPos.x, speakerPos.y - 150);
                break;
                
                case 1:
                    this.d1(speakerPos.x, speakerPos.y);
                break;
    
                case 2:
                    this.d2(speakerPos.x, speakerPos.y);
                break;    
            }
        }
    },
    
    d0: function(x, y) {

        player.controllable = false

        if (this.d0Timer < 240) {
            text("Hey! you fell down here too?", x, y);
        }
        if (this.d0Timer > 240 && this.d0Timer < 480) {
            text("Mo'fuggin crackas took my beans, nigguh", x, y);
        }
        if (this.d0Timer > 480) {
            player.controllable = true;
        }

        this.d0Timer++;
    },

    d1: function(x, y) {
        text("case 1!", x, y);
    },

    d2: function(x, y) {
        text("case 1!", x, y);
    },
}



// other functions for tidiness

function giveGrapple(entity) {
    entity.CAN_GRAPPLE = true;
}

function giveRanged(entity) {
    entity.CAN_RANGED = true;
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

