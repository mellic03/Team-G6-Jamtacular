let allEntities = [];


let stanky;
let bats1;
let bats2;
let bats3;
let stankyJail;
let goomba;
let angler;
let abAngler;



function createEnemies() {
    
    // stanky
    stanky = new Stanky(1450, 7550, player);
    stankyJailLeft = new Blockade(1400, 7400, 100, map3, mapAssets.jail_key_blue);
    stankyJailRight = new Blockade(1500, 7400, 100, map3, mapAssets.jail_key_red);

    // bat enemies
    bats1 = new Bats(2400, 10650, 900, 200); // near red key
    bats2 = new Bats(800, 5750, 400, 200); // 
    bats3 = new Bats(400, 10000, 650, 600); // 

    // "goomba" enemy
    goomba = new Goomba(2250, 1600, player);    // at spawn

    // angler enemies
    angler = new Angler(850, 5000, player, "normal");
    abAngler = new Angler(2000, 3100, player, "abnormal");

}


// draw all enemies
function drawEnemies() {

    for (let map of allMaps) {

        if (map.active) {
            // entities with collisionType = "normal" will collide with map
            for (entity of allEntities) {

                // if entity is within bounds of current map 
                //if (entity.sprite.position.y < map.cy + 1500 && entity.sprite.position.y > map.cy - 1500) {

                    if (entity.name == "goomba" || entity.name == "angler" || entity.name == "bats") {
                        entity.draw();
                    }

                    if (entity.collisionType == "normal") {
                        entity.sprite.collide(map.mapObject.allBlocks);
                    }
                //}
            }

            // remove player projectiles
            player.projectiles.collide(map.mapObject.allBlocks, projectileCleanup);

            // remove stanky projectiles
            stanky.projectiles.collide(map.mapObject.allBlocks, projectileCleanup);
        }
    }
}