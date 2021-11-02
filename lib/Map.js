class Map {

    constructor(TYPE) {

        this.preProcessed = [];
        this.greyConverted = [];
        this.processed = [];

        this.blocks = new Group();
        this.doors = new Group();

        this.tileWidth = 100;   // width of map tiles
        this.mapWidth = 30; // width of image. must be square.

        this.TYPE = TYPE;
        if (TYPE = "raycasted") {
            this.rayCast = new Particle();   // particle which raycasts in all directions
        }
    }


    generate(tileMap, wallImg, brickImg, doorImg, xOffset, yOffset) {

        wallImg.resize(this.tileWidth, this.tileWidth)
        brickImg.resize(this.tileWidth, this.tileWidth)
        
        doorImg.resize(this.tileWidth/2, this.tileWidth);


        tileMap.loadPixels();
        this.preProcessed = tileMap.pixels;
        
        // push every fourth pixel from the pixel array to grayConverted
        for (let i = 0; i < this.preProcessed.length; i += 4) { 
            this.greyConverted.push(this.preProcessed[i]);
        }

        // resize the greyConverted array into a 100x100 matrix called processed
        for (let i = 0; i < sqrt(this.greyConverted.length); i += 1) {
            this.processed[i] = this.greyConverted.slice(i*this.mapWidth, i*this.mapWidth + this.mapWidth);
        }

        // for every position in the matrix where the pixel value is 255, create a sprite at that position * tileWidth
        for (let i = 0; i < sqrt(this.greyConverted.length); i += 1) {      // for height of matrix
            for (let j = 0; j < sqrt(this.greyConverted.length); j += 1) {  // for width of matrix
                
                // wall
                if (this.processed[i][j] == 255) {

                    let block = createSprite(j*this.tileWidth + xOffset, i*this.tileWidth + yOffset, this.tileWidth, this.tileWidth);
                    block.addImage(wallImg);
                    block.depth = 0;
                    this.blocks.add(block);
                    createBoundingBox(block.position.x, block.position.y, this.tileWidth);
                }
                
                // door
                else if (this.processed[i][j] == 200) {

                    let door = createSprite(j*this.tileWidth + xOffset, i*this.tileWidth + yOffset, this.tileWidth/2, this.tileWidth);
                    door.addImage(doorImg);
                    door.depth = 5;
                    this.doors.add(door);
                }
                
                // brick
                else if (this.processed[i][j] == 150) {

                    let brick = createSprite(j*this.tileWidth + xOffset, i*this.tileWidth + yOffset, this.tileWidth/2, this.tileWidth);
                    brick.addImage(brickImg);
                    brick.depth = 0;

                    this.blocks.add(brick);
                    createBoundingBox(brick.position.x, brick.position.y, this.tileWidth);

                }
            } 
        }
    }
    

    draw() {
        
        if (this.TYPE == "raycasted") {

        }
        
        else {
            // only render sprites nearer than 0.7 * canvas width
            for (let block of this.blocks) {
                if (camera.position.dist(block.position) < width*0.7) {
                    drawSprite(block);
                }
            }
            for (let door of this.doors) {
                if (camera.position.dist(door.position) < width*0.7) {
                    drawSprite(door);
                }
            }

        }
    }
}