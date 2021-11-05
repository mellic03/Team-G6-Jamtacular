
//this.projectiles.collide(map1.mapObject.allBlocks, projectileCleanup);







function projectileCleanup(a, b) {  // remove sprite upon collision
    a.remove();
}



let currentMap;
let allMaps = [map1, map2];
let transitionBuffer = 0;


function mapTransition(mapFrom, xFrom, yFrom, mapTo, xTo, yTo) {
    

    // in-game map transition marker
    rect(xFrom-50, yFrom-75, 100, 100);
    stroke(0);
    textSize(20)
    text("MAP", xFrom-50, yFrom-50);
    text("TRANSITION", xFrom-50, yFrom-25);


    if (dist(player.sprite.position.x, player.sprite.position.y, xFrom, yFrom) < 100) {

        mapTo.generate();   //generate the new map

        transitionBuffer = 0;   // reset transition buffer
        
        player.controllable = false;    // disables raycasting, as there is a short period of time where there are no boundaries between map transitions

        player.sprite.position.x = xTo; // move the player to the new map at a specified location
        player.sprite.position.y = yTo;

        mapFrom.unload();   // delete the sprites from the old map

        mapFrom.transitioning = false;
    }

    if (transitionBuffer > 1) {
        player.controllable = true;
    }

    transitionBuffer++;
}