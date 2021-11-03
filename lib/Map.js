

class Map {

    constructor(raycasted) {

        this.preProcessed = [];
        this.greyConverted = [];
        this.processed = [];

        this.allBlocks = new Group();

        this.tileWidth = 100;   // width of map tiles
        this.mapWidth = 30; // width of image. must be square.

        this.raycasted = raycasted;
        if (this.raycasted) {
            this.rayCast = new Particle();   // particle which raycasts in all directions
        }

    }


    // there can be up to four types of block per tilemap.
    // xOffset through to block_1_Img are required but all other parameters are optional
    generate(xOffset, yOffset, tileMap, block_1_Img, block_2_Img, block_3_Img, block_4_Img) {

        block_1_Img.resize(this.tileWidth, this.tileWidth)
        
        if (block_2_Img) {
            block_2_Img.resize(this.tileWidth, this.tileWidth);
        }
        
        if (block_3_Img) {
            block_3_Img.resize(this.tileWidth, this.tileWidth);
        }
        
        if (block_4_Img) {
            block_4_Img.resize(this.tileWidth, this.tileWidth);
        }

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
                
                if (this.processed[i][j] > 0) {    // if a pixel has a value greater than zero

                    let block = createSprite(j*this.tileWidth + xOffset, i*this.tileWidth + yOffset, this.tileWidth, this.tileWidth);
                
                    if (this.raycasted == true) {
                        createBoundingBox(block.position.x, block.position.y, this.tileWidth);
                    }
    
                    if (this.processed[i][j] == 255) {
                        block.addImage(block_1_Img);
                    }

                    else if (this.processed[i][j] == 200) {
                        block.addImage(block_2_Img);
                    }

                    else if (this.processed[i][j] == 150) {
                        block.addImage(block_3_Img);
                    }

                    else if (this.processed[i][j] == 100) {
                        block.addImage(block_4_Img);
                    }
                
                    this.allBlocks.add(block);
                }
            } 
        }
    }
    

    draw() {
        
        if (this.raycasted == true) {

        }
        
        // only render sprites nearer than 0.7 * canvas width
        for (let block of this.allBlocks) {
            if (camera.position.dist(block.position) < width*0.7) {
                drawSprite(block);
            }
        }
    }
}

