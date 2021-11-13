let allEntities = [];

let stanky;
let stankyJail;

let goombae = [];
let anglers = [];
let bats = [];

let pickups = [];
let goldKeyPickup;

let playerJail;

let blockades_postRelease = [];


// place goomba:
// 1200, 10300
// 1700, 10700
// 1500, 9500, minX = 1100, maxX = 1800


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
    bats[0] = new Bats(2400, 10650, 900, 200); // near red key
    bats[1] = new Bats(800, 5750, 400, 200); // 
    bats[2] = new Bats(400, 10000, 650, 600); // 

    // "goomba" enemy
    goombae[0] = new Goomba(2600, 1850, player, 2400, 2700);
    goombae[1] = new Goomba(1200, 10300, player);
    goombae[2] = new Goomba(1700, 10700, player);
    goombae[3] = new Goomba(1500, 9500, player, 1100, 1800);

    // angler enemies
    anglers[0] = new Angler(850, 5000, player, "normal");
    anglers[1] = new Angler(2000, 3100, player, "abnormal");

    // pickups
    pickups[0] = new Pickup("grapple", 12400, 7700);
    pickups[1] = new Pickup("rangedWeapon", 100, 3200);
    pickups[2] = new Pickup("nightVision", 300, 9500);
    pickups[3] = new Pickup("redKey", 1900, 5800);
    pickups[4] = new Pickup("blueKey", 2700, 11600);

    goldKeyPickup = new Pickup("goldKey", 0, 0);
}


// draw all enemies
function drawEntities() {


    for (let angler of anglers) {
        if (player.sprite.position.dist(angler.sprite.position) < 1000) {
            angler.draw();
        }
    }

    for (let bat of bats) {
        bat.draw();
    }


    for (let goomba of goombae) {
        if (player.sprite.position.dist(goomba.sprite.position) < 1000) {
            goomba.draw();
        }
        goomba.sprite.collide(active_map.mapObject.allBlocks);
    }


    player.sprite.collide(active_map.mapObject.allBlocks);
    stanky.sprite.collide(active_map.mapObject.allBlocks);

    // remove player projectiles
    player.projectiles.collide(active_map.mapObject.allBlocks, projectileCleanup);

    // remove stanky projectiles
    stanky.projectiles.collide(active_map.mapObject.allBlocks, projectileCleanup);
}