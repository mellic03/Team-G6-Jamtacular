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
    bats.push(new Bats(2400, 10650, 900, 200));
    bats.push(new Bats(800, 5750, 400, 200));
    bats.push(new Bats(400, 10000, 650, 600));

    // "goomba" enemy
    goombae.push(new Goomba(2600, 1850, player, 1600, 2700));
    goombae.push(new Goomba(1200, 10300, player, 1080, 1320));
    goombae.push(new Goomba(1700, 10700, player, 1500, 2600));
    goombae.push(new Goomba(1500, 9500, player, 700, 1800));

    // angler enemies
    anglers.push(new Angler(850, 5000, player, "normal"));
    anglers.push(new Angler(2000, 3100, player, "abnormal"));

    // pickups
    pickups.push(new Pickup("grapple", 12400, 7700));
    pickups.push(new Pickup("rangedWeapon", 100, 3200));
    pickups.push(new Pickup("nightVision", 300, 9500));
    pickups.push(new Pickup("redKey", 1900, 5800));
    pickups.push(new Pickup("blueKey", 2700, 11600));

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