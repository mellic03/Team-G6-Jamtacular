let allEntities = [];

function createEnemies() {
    
    // stanky
    stanky = new Stanky(1450, 7550, player);
    stankyJailLeft = new Blockade(1400, 7400, 100, map3, mapAssets.jail_key_blue);
    stankyJailRight = new Blockade(1500, 7400, 100, map3, mapAssets.jail_key_red);

    // bat enemies
    bats1 = new Enemy(2400, 10650, 900, 200); // in dark map
    bats2 = new Enemy(800, 5750, 400, 200); // near gold key

    // "goomba" enemy
    goomba = new Goomba(2250, 1600, player);    // at spawn

    // angler enemies
    angler = new Angler(850, 5000, player, "normal");
    abAngler = new Angler(2000, 3100, player, "abnormal");

}


// draw all enemies
function drawEnemies() {
    for (let entity of allEntities) {
        if (entity.name == "goomba" || entity.name == "angler" || entity.name == "bats") {
            entity.draw();
        }
    }
}