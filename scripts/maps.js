

// map legend, starts at pixel value = 30

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


let map1 = {

    mapObject: null,
    main_tilemap: null,
    wood: null,
    stone: null,
    
    active: false,

    transitionBuffer: 0,

    preload() {

        this.bg_tilemap = loadImage("assets/img/map/tilemaps/bg_tilemap.png");
        this.bg_brick = loadImage("assets/img/map/background/bg_brick.png");
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

    draw() {
        if (this.active) {
            this.bgObject.draw();
            this.mapObject.draw();
            player.sprite.collide(this.mapObject.allBlocks);
        }

    },

    unload() {
        this.bgObject.allBlocks.removeSprites();
        this.mapObject.allBlocks.removeSprites();
        this.active = false;
    },

    transitions() {
        mapTransition(this, 2750, 1620, map2, 3250, 1620);
        this.transitionBuffer++;
    },
}


let map2 = {

    mapObject: null,
    main_tilemap: null,
    wood: null,
    stone: null,

    active: false,
    
    transitionBuffer: 0,

    preload() {

        this.bg_tilemap = loadImage("assets/img/map/tilemaps/map_2_bg_tilemap.png");
        this.bg_brick = loadImage("assets/img/map/background/bg_brick.png");
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

    draw() {
        if (this.active) {
            this.bgObject.draw();
            this.mapObject.draw();
            player.sprite.collide(this.mapObject.allBlocks);
        }
    },

    unload() {
        this.bgObject.allBlocks.removeSprites();
        this.mapObject.allBlocks.removeSprites();
        this.active = false;
    },


    transitions() {
        mapTransition(this, 3150, 1620, map1, 2650, 1620);
        this.transitionBuffer++;
    },

}


let allMaps = [map1, map2];


function mapTransition(mapFrom, xFrom, yFrom, mapTo, xTo, yTo) {
    
    rect(xFrom-50, yFrom-75, 100, 100);
    stroke(0);
    textSize(20)
    text("MAP", xFrom-50, yFrom-50);
    text("TRANSITION", xFrom-50, yFrom-25);



    if (dist(player.sprite.position.x, player.sprite.position.y, xFrom, yFrom) < 100) {

        frameCount = 0;
        player.controllable = false;

        mapTo.generate();

        player.sprite.position.x = xTo;
        player.sprite.position.y = yTo;

        mapFrom.unload();

        mapFrom.transitioning = false;
    }

    if (frameCount > 0) {
        player.controllable = true;
    }
}