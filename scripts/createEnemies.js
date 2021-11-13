let allEntities = [];

let stanky;
let bats1;
let bats2;
let bats3;
let stankyJail;
let goomba;
let angler;
let abAngler;

let pickups = [];
let goldKeyPickup;

let playerJail;

let blockades_postRelease = [];


// blockades on stanky release:
// (11200, 7600)
// (11700, 7600)
// (12600, 7500)


function createEntities() {
    
    // stanky
    stanky = new Stanky(11450, 7550, player);
    stankyJailLeft = new Blockade(11400, 7400, 100, map3, mapAssets.jail_key_blue);
    stankyJailRight = new Blockade(11500, 7400, 100, map3, mapAssets.jail_key_red);
    
    // player jail
    playerJail = new Blockade(10300, 7500, 100, map3, mapAssets.jail_key_gold);
   
    // blockades to add on stanky release
    blockades_postRelease[0] = new Blockade(11200, 7600, 100, map3, mapAssets.jail_no_key);
    blockades_postRelease[1] = new Blockade(11700, 7600, 100, map3, mapAssets.jail_no_key);
    blockades_postRelease[2] = new Blockade(12600, 7500, 100, map3, mapAssets.jail_no_key);

    // bat enemies
    bats1 = new Bats(2400, 10650, 900, 200); // near red key
    bats2 = new Bats(800, 5750, 400, 200); // 
    bats3 = new Bats(400, 10000, 650, 600); // 

    // "goomba" enemy
    goomba = new Goomba(2600, 1850, player, 2400, 2700);    // at spawn

    // angler enemies
    angler = new Angler(850, 5000, player, "normal");
    abAngler = new Angler(2000, 3100, player, "abnormal");

    // pickups
    pickups[0] = new Pickup("grapple", 12400, 7700);
    pickups[1] = new Pickup("rangedWeapon", 100, 3200);
    pickups[2] = new Pickup("nightVision", 300, 9500);
    pickups[3] = new Pickup("redKey", 1900, 5800);
    pickups[4] = new Pickup("blueKey", 2700, 11600);

    goldKeyPickup = new Pickup("goldKey", 0, 0);
}


// draw all enemies
function drawEnemies() {

    for (let map of allMaps) {

        if (map.active) {
            // entities with collisionType = "normal" will collide with map
            for (entity of allEntities) {

                if (entity.name == "goomba" || entity.name == "angler" || entity.name == "bats") {
                    entity.draw();
                }

                if (entity.collisionType == "normal") {
                    entity.sprite.collide(map.mapObject.allBlocks);
                }
            }

            // remove player projectiles
            player.projectiles.collide(map.mapObject.allBlocks, projectileCleanup);

            // remove stanky projectiles
            stanky.projectiles.collide(map.mapObject.allBlocks, projectileCleanup);
        }
    }
}