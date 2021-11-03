

let spawn_area = {

    mapObject: null,
    main_tilemap: null,
    wood: null,
    stone: null,
    
    bgObject: null,
    bg_tilemap: null,
    bg_wood: null,
    bg_sky: null,

    preload: function() {

        this.main_tilemap = loadImage("assets/img/map/spawn/house_tilemap.png");
        this.wood = loadImage("assets/img/map/spawn/wood.png");
        this.stone = loadImage("assets/img/map/spawn/stone.png");

        this.bg_tilemap = loadImage("assets/img/map/spawn/bg_tilemap.png");
        this.bg_wood = loadImage("assets/img/map/spawn/bg_wood.png");
        this.bg_sky = loadImage("assets/img/map/spawn/bg_sky.png");
    },

    generate: function() {
        
        this.bgObject = new Map(false);
        this.bgObject.generate(0, -3000, this.bg_tilemap, this.bg_sky, this.bg_wood);

        this.mapObject = new Map(true);
        this.mapObject.generate(0, -3000, this.main_tilemap, this.wood, this.stone);
    },

    draw: function() {

        this.bgObject.draw();
        this.mapObject.draw();

        player.sprite.collide(this.mapObject.allBlocks);
    },
}


let area_1 = {

    bgObject: null,
    bg_tilemap: null,
    bg_brick: null,

    mapObject: null,
    main_tilemap: null,
    grey_brick: null,
    grass_brick: null,
    red_brick: null,
    grass: null,

    preload: function() {

        this.bg_tilemap = loadImage("assets/img/map/area1/bg_tilemap.png");
        this.bg_brick = loadImage("assets/img/map/area1/bg_brick.png");


        this.main_tilemap = loadImage("assets/img/map/area1/area1_tilemap.png");
        this.grey_brick = loadImage("assets/img/map/area1/grey_brick.png");
        this.grass_brick = loadImage("assets/img/map/area1/grass_brick.png");
        this.red_brick = loadImage("assets/img/map/area1/red_brick.png");
        this.grass = loadImage("assets/img/map/area1/grass.png");
    },

    generate: function() {

        this.bgObject = new Map(false);
        this.bgObject.generate(0, 0, this.bg_tilemap, this.bg_brick);

        this.mapObject = new Map(true);
        this.mapObject.generate(0, 0, this.main_tilemap, this.grey_brick, this.grass_brick, this.red_brick, this.grass);
    },


    draw: function() {
        
        this.bgObject.draw();
        this.mapObject.draw();

        player.sprite.collide(this.mapObject.allBlocks);
    }
}