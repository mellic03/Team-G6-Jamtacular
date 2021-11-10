
// map legend, starts at pixel value = 30
// these values are not absolute, the program just takes
// the first image passed into it and maps it to the pixels with a value of 30
// then the second image and 40 and so on,
// I don't really like this system and would like to change it

// main maps:
// 30: grey bricks
// 40: grass bricks
// 50: red bricks
// 60: wood
// 70: grass
// 80: stone

// background maps:
// 30: sky background
// 40: wood background
// 50: brick background
// 60: red brick background


// all maps (currently) are objects defined here, they must each have a bgObject and mapObject tilemap


let mapAssets = {

    bg_brick: null,
    bg_red_brick: null,
    bg_wood: null,
    bg_sky: null,
    grey_brick : null,
    grass_brick: null,
    red_brick: null,
    wood: null,
    grass: null,
    stone: null,

    map_1_bg_tilemap: null,
    map_1_fg_tilemap: null,
    map_2_bg_tilemap: null,
    map_2_fg_tilemap: null,
    map_3_bg_tilemap: null,
    map_3_fg_tilemap: null,

    preload() {

        // image assets
        this.bg_brick = loadImage("assets/img/map/background/bg_grey_brick.png");
        this.bg_red_brick = loadImage("assets/img/map/background/bg_red_brick.png");
        this.bg_wood = loadImage("assets/img/map/background/bg_wood.png");
        this.bg_sky = loadImage("assets/img/map/background/bg_sky.png");
       
        this.grey_brick = loadImage("assets/img/map/foreground/grey_brick.png");
        this.grass_brick = loadImage("assets/img/map/foreground/grass_brick.png");
        this.red_brick = loadImage("assets/img/map/foreground/red_brick.png");
        this.wood = loadImage("assets/img/map/foreground/wood.png");
        this.grass = loadImage("assets/img/map/foreground/grass.png");
        this.stone = loadImage("assets/img/map/foreground/stone.png");
    

        // tilemaps
        this.map_1_bg_tilemap = loadImage("assets/img/map/tilemaps/map_1_bg_tilemap.png");
        this.map_1_fg_tilemap = loadImage("assets/img/map/tilemaps/map_1_fg_tilemap.png");
        
        this.map_2_bg_tilemap = loadImage("assets/img/map/tilemaps/map_2_bg_tilemap.png");
        this.map_2_fg_tilemap = loadImage("assets/img/map/tilemaps/map_2_fg_tilemap.png");

        this.map_3_bg_tilemap = loadImage("assets/img/map/tilemaps/map_3_bg_tilemap.png");
        this.map_3_fg_tilemap = loadImage("assets/img/map/tilemaps/map_3_fg_tilemap.png");
    }
}


let map1 = {

    active: false,

    generate() {
        
        this.bg_tilemap = mapAssets.map_1_bg_tilemap;
        this.main_tilemap =  mapAssets.map_1_fg_tilemap;

        this.bgObject = new Tilemap(false);
        this.bgObject.generate(0, 0, this.bg_tilemap, mapAssets.bg_sky, mapAssets.bg_wood, mapAssets.bg_brick);

        this.mapObject = new Tilemap(true);
        this.mapObject.generate(0, 0, this.main_tilemap, mapAssets.grey_brick, mapAssets.grass_brick, mapAssets.red_brick, mapAssets.wood, mapAssets.grass, mapAssets.stone);
        
        this.active = true;
    },

    transitions() {
        transitionMap(this, 100, 1800, map3, 100, 3100);
    },
}


let map2 = {

    active: false,

    generate() {

        this.bg_tilemap = mapAssets.map_2_bg_tilemap;
        this.main_tilemap = mapAssets.map_2_fg_tilemap;
        
        this.bgObject = new Tilemap(false);
        this.bgObject.generate(3000, 0, this.bg_tilemap, mapAssets.bg_red_brick);

        this.mapObject = new Tilemap(true);
        this.mapObject.generate(3000, 0, this.main_tilemap, mapAssets.grey_brick, mapAssets.grass_brick, mapAssets.red_brick, mapAssets.wood, mapAssets.grass, mapAssets.stone);
        
        this.active = true;
    },

    transitions() {
        transitionMap(this, 3150, 1620, map3, 2600, 4500);
    },
}


let map3 = {

    active: false,
    
    generate() {
        
        this.bg_tilemap = mapAssets.map_2_bg_tilemap;
        this.main_tilemap = mapAssets.map_3_fg_tilemap;

        this.bgObject = new Tilemap(false);
        this.bgObject.generate(0, 3000, this.bg_tilemap, mapAssets.bg_red_brick);

        this.mapObject = new Tilemap(true);
        this.mapObject.generate(0, 3000, this.main_tilemap, mapAssets.grey_brick);
        
        this.active = true;
    },

    transitions() {
        transitionMap(this, 3150, 1620, map1, 2650, 1620);
        transitionMap(this, 2800, 4500, map2, 3250, 1620);
    },
}


let allMaps = [map1, map2, map3]; // array containing all maps
let transitionBuffer = 0;   // buffer which is used to disable all raycasting while transitioning between maps


// transition between maps
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
        
        boundaries.splice(1, 1164);
    }

    // 5 < buffer < 10 so the program isnt forcing controllable = true constantly
    if (transitionBuffer > 5 && transitionBuffer < 10) {
        player.controllable = true;
    }

    transitionBuffer++;
}
