
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



let map1 = {

    mapObject: null,
    main_tilemap: null,
    wood: null,
    stone: null,

    bgObject: null,
    bg_tilemap: null,

    active: false,

    preload() {

        this.bg_tilemap = loadImage("assets/img/map/tilemaps/bg_tilemap.png");
        this.bg_brick = loadImage("assets/img/map/background/bg_grey_brick.png");
        this.bg_wood = loadImage("assets/img/map/background/bg_wood.png");
        this.bg_sky = loadImage("assets/img/map/background/bg_sky.png");

        this.main_tilemap = loadImage("assets/img/map/tilemaps/map_1_tilemap.png");
        this.grey_brick = loadImage("assets/img/map/foreground/grey_brick.png");
        this.grass_brick = loadImage("assets/img/map/foreground/grass_brick.png");
        this.red_brick = loadImage("assets/img/map/foreground/red_brick.png");
        this.wood = loadImage("assets/img/map/foreground/wood.png");
        this.grass = loadImage("assets/img/map/foreground/grass.png");
        this.stone = loadImage("assets/img/map/foreground/stone.png");
    },

    generate() {
        
        this.bgObject = new Tilemap(false);
        this.bgObject.generate(0, 0, this.bg_tilemap, this.bg_sky, this.bg_wood, this.bg_brick);

        this.mapObject = new Tilemap(true);
        this.mapObject.generate(0, 0, this.main_tilemap, this.grey_brick, this.grass_brick, this.red_brick, this.wood, this.grass, this.stone);
        
        this.active = true;
    },

    unload() {
        this.bgObject.allBlocks.removeSprites();
        this.mapObject.allBlocks.removeSprites();
        
        this.active = false;
    },

    transitions() {
        transitionMap(this, 2750, 1620, map2, 3250, 1620);
    },
}


let map2 = {

    mapObject: null,
    main_tilemap: null,
    wood: null,
    stone: null,

    bgObject: null,
    bg_tilemap: null,

    active: false,
    
    preload() {

        this.bg_tilemap = loadImage("assets/img/map/tilemaps/map_2_bg_tilemap.png");
        this.bg_brick = loadImage("assets/img/map/background/bg_grey_brick.png");
        this.bg_wood = loadImage("assets/img/map/background/bg_wood.png");
        this.bg_red_brick = loadImage("assets/img/map/background/bg_red_brick.png");
        
        this.main_tilemap = loadImage("assets/img/map/tilemaps/map_2_tilemap.png");
        this.grey_brick = loadImage("assets/img/map/foreground/grey_brick.png");
        this.red_brick = loadImage("assets/img/map/foreground/red_brick.png");
    },

    generate() {
        
        this.bgObject = new Tilemap(false);
        this.bgObject.generate(3000, 0, this.bg_tilemap, this.bg_red_brick);

        this.mapObject = new Tilemap(true);
        this.mapObject.generate(3000, 0, this.main_tilemap, this.grey_brick, this.grass_brick, this.red_brick, this.wood, this.grass, this.stone);
        
        this.active = true;
    },

    unload() {
        this.bgObject.allBlocks.removeSprites();
        this.mapObject.allBlocks.removeSprites();
        
        this.active = false;
    },

    transitions() {
        transitionMap(this, 3150, 1620, map1, 2650, 1620);
    },
}


let map3 = {

    mapObject: null,
    main_tilemap: null,
    wood: null,
    stone: null,

    bgObject: null,
    bg_tilemap: null,

    active: false,
    
    preload() {

        this.bg_tilemap = loadImage("assets/img/map/tilemaps/map_2_bg_tilemap.png");
        this.bg_brick = loadImage("assets/img/map/background/bg_grey_brick.png");
        this.bg_wood = loadImage("assets/img/map/background/bg_wood.png");
        this.bg_red_brick = loadImage("assets/img/map/background/bg_red_brick.png");
        
        this.main_tilemap = loadImage("assets/img/map/tilemaps/map_3_tilemap.png");
        this.grey_brick = loadImage("assets/img/map/foreground/grey_brick.png");
        this.red_brick = loadImage("assets/img/map/foreground/red_brick.png");
    },

    generate() {
        
        this.bgObject = new Tilemap(false);
        this.bgObject.generate(0, 3000, this.bg_tilemap, this.bg_red_brick);

        this.mapObject = new Tilemap(true);
        this.mapObject.generate(0, 3000, this.main_tilemap, this.grey_brick);
        
        this.active = true;
    },

    unload() {
        this.bgObject.allBlocks.removeSprites();
        this.mapObject.allBlocks.removeSprites();
        
        this.active = false;
    },

    transitions() {
        transitionMap(this, 3150, 1620, map1, 2650, 1620);
    },
}
