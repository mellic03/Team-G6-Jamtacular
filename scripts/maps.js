
// map legend, starts at pixel value = 30
// the first image passed into it and maps it to the pixels with a value of 30
// then the second image and 40 and so on,
// I don't really like this system and would like to change it


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
    jail_key: null,
    jail_no_key: null,
    bg_door: null,

    map_1_bg_tilemap: null,
    map_1_fg_tilemap: null,
    map_2_bg_tilemap: null,
    map_2_fg_tilemap: null,
    map_3_bg_tilemap: null,
    map_3_fg_tilemap: null,
    map_4_bg_tilemap: null,
    map_4_fg_tilemap: null,


    preload() {

        // image assets
        this.bg_brick = loadImage("assets/img/map/background/bg_grey_brick.png");
        this.bg_red_brick = loadImage("assets/img/map/background/bg_red_brick.png");
        this.bg_wood = loadImage("assets/img/map/background/bg_wood.png");
        this.bg_sky = loadImage("assets/img/map/background/bg_sky.png");
        this.bg_door = loadImage("assets/img/map/background/bg_door.png");

        this.grey_brick = loadImage("assets/img/map/foreground/grey_brick.png");
        this.grass_brick = loadImage("assets/img/map/foreground/grass_brick.png");
        this.red_brick = loadImage("assets/img/map/foreground/red_brick.png");
        this.wood = loadImage("assets/img/map/foreground/wood.png");
        this.grass = loadImage("assets/img/map/foreground/grass.png");
        this.stone = loadImage("assets/img/map/foreground/stone.png");
        this.jail_key_blue = loadImage("assets/img/map/foreground/jail_key_blue.png");
        this.jail_key_red = loadImage("assets/img/map/foreground/jail_key_red.png");
        this.jail_key_gold = loadImage("assets/img/map/foreground/jail_key_gold.png");
        this.jail_no_key = loadImage("assets/img/map/foreground/jail_no_key.png");
    

        // tilemaps
        this.map_1_bg_tilemap = loadImage("assets/img/map/tilemaps/map_1_bg_tilemap.png");
        this.map_1_fg_tilemap = loadImage("assets/img/map/tilemaps/map_1_fg_tilemap.png");
        
        this.map_2_bg_tilemap = loadImage("assets/img/map/tilemaps/map_2_bg_tilemap.png");
        this.map_2_fg_tilemap = loadImage("assets/img/map/tilemaps/map_2_fg_tilemap.png");

        this.map_3_bg_tilemap = loadImage("assets/img/map/tilemaps/map_3_bg_tilemap.png");
        this.map_3_fg_tilemap = loadImage("assets/img/map/tilemaps/map_3_fg_tilemap.png");
    
        this.map_4_bg_tilemap = loadImage("assets/img/map/tilemaps/map_4_bg_tilemap.png");
        this.map_4_fg_tilemap = loadImage("assets/img/map/tilemaps/map_4_fg_tilemap.png");
    }
}


let map1 = {

    active: false,
    sound: null,

    cx: 1500,
    cy: 1500,

    generate() {
        
        this.bg_tilemap = mapAssets.map_1_bg_tilemap;
        this.main_tilemap =  mapAssets.map_1_fg_tilemap;

        this.bgObject = new Tilemap(false);
        this.bgObject.generate(0, 0, this.bg_tilemap, mapAssets.bg_sky, mapAssets.bg_wood, mapAssets.bg_brick, mapAssets.bg_door);

        this.mapObject = new Tilemap(true);
        this.mapObject.generate(0, 0, this.main_tilemap, mapAssets.grey_brick, mapAssets.grass_brick, mapAssets.red_brick, mapAssets.wood, mapAssets.grass, mapAssets.stone);
        
        this.active = true;
    },

    transitions() {
        transitionMap(this, 2800, 1800, map3, 10200, 7500);
    },
}


let map2 = {

    active: false,
    sound: null,

    cx: 1500,
    cy: 4500,

    generate() {

        this.sound = darkMapSound;

        this.bg_tilemap = mapAssets.map_2_bg_tilemap;
        this.main_tilemap = mapAssets.map_2_fg_tilemap;
        
        this.bgObject = new Tilemap(false);
        this.bgObject.generate(0, 3000, this.bg_tilemap, mapAssets.bg_door);

        this.mapObject = new Tilemap(true);
        this.mapObject.generate(0, 3000, this.main_tilemap, mapAssets.grey_brick, mapAssets.grass_brick, mapAssets.red_brick, mapAssets.wood, mapAssets.grass, mapAssets.stone);
        
        this.active = true;
    },

    transitions() {
        transitionMap(this, 100, 4600, map3, 12700, 8800);
    },
}


let map3 = {

    active: false,
    sound: null,

    cx: 11500,
    cy: 7500,
    
    generate() {

        this.bg_tilemap = mapAssets.map_3_bg_tilemap;
        this.main_tilemap = mapAssets.map_3_fg_tilemap;

        this.bgObject = new Tilemap(false);
        this.bgObject.generate(10000, 6000, this.bg_tilemap, mapAssets.bg_brick, mapAssets.bg_red_brick, mapAssets.bg_door);

        this.mapObject = new Tilemap(true);
        this.mapObject.generate(10000, 6000, this.main_tilemap, mapAssets.grey_brick, mapAssets.jail_no_key);
        

        if (stanky.jailed) {
            stankyJailLeft.place();
            stankyJailRight.place();
        }


        this.active = true;
    },

    transitions() {
        transitionMap(this, 12800, 7500, map4, 200, 10500);
        transitionMap(this, 12800, 8800, map2, 250, 4620); // dark map
        transitionMap(this, 10100, 7500, map1, 2700, 1800);
    },

}


let map4 = {

    active: false,
    sound: null,
    
    cx: 1500,
    cy: 10500,
    
    generate() {
        
        this.bg_tilemap = mapAssets.map_4_bg_tilemap;
        this.main_tilemap = mapAssets.map_4_fg_tilemap;

        this.bgObject = new Tilemap(false);
        this.bgObject.generate(0, 9000, this.bg_tilemap, mapAssets.bg_red_brick, mapAssets.bg_door);

        this.mapObject = new Tilemap(true);
        this.mapObject.generate(0, 9000, this.main_tilemap, mapAssets.grey_brick);
        
        this.active = true;
    },

    transitions() {
        transitionMap(this, 100, 10500, map3, 12700, 7500);
    },
}



let allMaps = [map1, map2, map3, map4]; // array containing all maps
let transitionBuffer = 0;   // buffer which is used to disable all raycasting while transitioning between maps


// transition between maps
function transitionMap(mapFrom, xFrom, yFrom, mapTo, xTo, yTo) {

    // in-game map transition marker
    //rectMode(CENTER);
    //rect(xFrom, yFrom, 100, 100);
    //stroke(0);
    //textAlign(LEFT, CENTER);
    //textSize(20)
    //text("MAP", xFrom-50, yFrom-25);
    //text("TRANSITION", xFrom-50, yFrom);


    // if the player reaches the transition point
    if (dist(player.sprite.position.x, player.sprite.position.y, xFrom, yFrom) < 100) {
        boundaries.length = 0;
        
        mapTo.generate();   //generate the new map

        if (mapTo.sound) {
            mapTo.sound.loop();
        }

        transitionBuffer = 0;   // reset transition buffer
        
        player.controllable = false;    // disables raycasting, as there is a short period of time where there are no boundaries between map transitions

        // move the player to the new map at the specified location
        player.sprite.position.x = xTo;
        player.sprite.position.y = yTo;

        if (mapFrom.sound) {
            mapFrom.sound.stop();
        }

        unloadMap(mapFrom)   // delete the sprites from the old map
    }

    // 5 < buffer < 10 so the program isnt forcing controllable = true constantly
    if (transitionBuffer > 10) {
        player.controllable = true;
    }

    transitionBuffer++;
}


// horizontal row of sprites
class Blockade {
    
    constructor(x, y, bWidth, map, img) {

        this.x = x;
        this.y = y;
        this.bWidth = bWidth;
        this.map = map;
        this.img = img;

        this.locked = true;
        this.placed = false;

        this.block;
        this.boundaries = [];
    }


    place() {
        
        if (this.locked) {
            for (let i = 0; i < this.bWidth; i += 100) {

                // create block sprite
                this.block = createSprite(this.x + i, this.y, 100, 100);
                this.block.addImage("locked", this.img);
                this.block.addImage("unlocked", mapAssets.jail_no_key);
                // add sprite to groups
                this.map.mapObject.allBlocks.add(this.block);

                // create raycasting boundary and push to group
                createBoundingBox(this.x + i, this.y, 100, boundaries);
                createBoundingBox(this.x + i, this.y, 100, this.boundaries);
            }
        }
    }

    remove() {

        this.block.remove();
        
        // check both the global boundaries and this.boundaires for boundaries with the same coordinate and remove them
        for (let allBoundary of boundaries) {
            for (let boundary of this.boundaries) {
                if (allBoundary.a.x == boundary.a.x && allBoundary.a.y == boundary.a.y && allBoundary.b.x == boundary.b.x && allBoundary.b.y == boundary.b.y) {
                    
                    allBoundary.a.x = null;
                    allBoundary.a.y = null;
                    allBoundary.b.x = null;
                    allBoundary.b.y = null;
               
                    boundary.a.x = null;
                    boundary.a.y = null;
                    boundary.b.x = null;
                    boundary.b.y = null;
                }
            }
        }
    }
}
