
let allMaps = [map1, map2]; // array containing all maps
let transitionBuffer = 0;   // buffer which is used to disable all raycasting while transitioning between maps


function mapHandler() {

    for (let map of allMaps) {  // for each map

        // if shift is down (activating raycast mechanic), stop drawing map but continue detecting collisions
        if (map.active && (keyIsDown(16))) {
            player.sprite.collide(map.mapObject.allBlocks);
        }

        // else if shift is not down, draw the map normally 
        else if (map.active && !(keyIsDown(16))) {
            map.bgObject.draw();
            map.mapObject.draw();
            player.projectiles.collide(map.mapObject.allBlocks, projectileCleanup);
            player.sprite.collide(map.mapObject.allBlocks);
        }

        // run transitions
        map.transitions();
    }
}



function transitionMap(mapFrom, xFrom, yFrom, mapTo, xTo, yTo) {

    // in-game map transition marker
    rect(xFrom-50, yFrom-75, 100, 100);
    stroke(0);
    textSize(20)
    text("MAP", xFrom-50, yFrom-50);
    text("TRANSITION", xFrom-50, yFrom-25);


    // if the player reaches the transition point
    if (dist(player.sprite.position.x, player.sprite.position.y, xFrom, yFrom) < 100) {

        mapTo.generate();   //generate the new map

        transitionBuffer = 0;   // reset transition buffer
        
        player.controllable = false;    // disables raycasting, as there is a short period of time where there are no boundaries between map transitions

        player.sprite.position.x = xTo; // move the player to the new map at a specified location
        player.sprite.position.y = yTo;

        mapFrom.unload();   // delete the sprites from the old map

    }

    if (transitionBuffer > 1) {
        player.controllable = true;
    }

    transitionBuffer++;
}



function projectileCleanup(a) {  // remove sprite upon collision
    a.remove();
}