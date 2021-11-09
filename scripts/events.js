

function events(x, y) {
    
    textAlign(CENTER, CENTER);
    fill(255);


    trigger(player, 2400, 4700, giveGrapple, true);
}



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





// transition between maps, use in maps.js
function transitionMap(mapFrom, xFrom, yFrom, mapTo, xTo, yTo) {

    // in-game map transition marker
    rect(xFrom-50, yFrom-75, 100, 100);
    stroke(0);
    textAlign(LEFT, CENTER);
    textSize(20)
    text("MAP", xFrom-50, yFrom-50);
    text("TRANSITION", xFrom-50, yFrom-25);


    // if the player reaches the transition point
    if (dist(player.sprite.position.x, player.sprite.position.y, xFrom, yFrom) < 100) {
        
        transitionBuffer = 0;   // reset transition buffer

        mapTo.generate();   //generate the new map
        
        player.controllable = false;    // disables raycasting, as there is a short period of time where there are no boundaries between map transitions

        // move the player to the new map at the specified location
        player.sprite.position.x = xTo;
        player.sprite.position.y = yTo;

        unloadMap(mapFrom)   // delete the sprites from the old map
    }

    if (transitionBuffer > 5) {
        player.controllable = true;
    }

    transitionBuffer++;
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

