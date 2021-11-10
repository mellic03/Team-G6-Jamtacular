
// main function, everything goes in here
function events(x, y) {
    
    textAlign(CENTER, CENTER);
    fill(255);


    trigger(player, 2400, 4700, giveGrapple, true);
}




// other functions for tidiness

function giveGrapple(entity) {
    entity.CAN_GRAPPLE = true;
}

function giveRanged(entity) {
    entity.CAN_RANGED = true;
}


// trigger, runs callback once player is within 100 pixels
function trigger(triggerEntity, xpos, ypos, callback, debug) {

    let triggerPos = createVector(xpos, ypos);

    // function text at trigger location
    if (debug) {
        textSize(12);
        text(eval(callback), triggerPos.x, triggerPos.y);
    }

    if (triggerEntity.sprite.position.dist(triggerPos) < 100) {
        callback(triggerEntity);
    }
}


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

