class Map {

    constructor() {
        this.preProcessed = [];
        this.greyConverted = [];
        this.processed = [];

        this.blocks = new Group();
        this.doors = new Group();

        this.tileWidth = 100;   // width of map tiles
        this.mapWidth = 25; // width of image. must be square.
    }


    generate(tileMap, wallImg, doorImg, xOffset, yOffset) {

        wallImg.resize(this.tileWidth, this.tileWidth)
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
                }
                
                // door
                else if (this.processed[i][j] == 200) {
                    let doorLeft = createSprite(j*this.tileWidth + xOffset - this.tileWidth/8, i*this.tileWidth + yOffset, this.tileWidth/2, this.tileWidth);
                    let doorRight = createSprite(j*this.tileWidth + xOffset + this.tileWidth/8, i*this.tileWidth + yOffset, this.tileWidth/2, this.tileWidth);
                    doorLeft.addImage(doorImg);
                    doorRight.addImage(doorImg);

                    doorLeft.depth = 0;
                    doorRight.depth = 2;
                    this.doors.add(doorLeft);
                    this.doors.add(doorRight);
                }

                // other block type
                else if (this.processed[i][j] == 150) {
                    // code goes here
                    // code goes here
                    // code goes here
                }
            } 
        }
    }
    

    draw() {
        // only render sprites nearer than 0.7 * canvas width
        for (let block of this.blocks) {
            if (camera.position.dist(block.position) < width*0.7) {
                drawSprite(block);
            }
        }
    }
}