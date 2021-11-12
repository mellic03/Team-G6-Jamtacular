let boundaries = [];    // boundaries array stores all boundaries


class Tilemap {

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

        this.x;
        this.y;
    }


    // there can be up to four types of block per tilemap.
    // xOffset through to block_1_Img are required but all other parameters are optional
    generate(xOffset, yOffset, tileMapFile) {

        this.x = xOffset;
        this.y = yOffset;

        tileMapFile.loadPixels();
        this.preProcessed = tileMapFile.pixels;
        
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
                
                if (this.processed[i][j] > 0 && this.processed[i][j] < 255) {    // if a pixel has a value greater than zero

                    let block = createSprite(j*this.tileWidth + xOffset, i*this.tileWidth + yOffset, this.tileWidth, this.tileWidth);
                    if (this.raycasted == true) {
                        createBoundingBox(block.position.x, block.position.y, this.tileWidth, boundaries);
                    }

                    for (let c = 3; c < arguments.length; c++) {    // takes the number of block type arguments

                        if (this.processed[i][j] == c * 10) {   //pixel colour increases in increments of 10
                            arguments[c].resize(this.tileWidth, this.tileWidth);
                            block.addImage(arguments[c]);
                            block.depth = 10;
                        }
                    }
                    this.allBlocks.add(block);
                }
            } 
        }
    }


    draw() {
        // only render sprites nearer than 0.7 * canvas width
        for (let block of this.allBlocks) {

            if (p5.Vector.dist(camera.position, block.position) < width*0.7) {
                drawSprite(block);
            }
        }
    }
}
