class Map {

    constructor() {
        this.preProcessed = [];
        this.greyConverted = [];
        this.processed = [];

        this.blocks = new Group();

        this.tileWidth = 100;   // width of map tiles
        this.mapWidth = 25; // width of image. must be square.
    }


    generate(mapFile, img) {

        img.resize(this.tileWidth, this.tileWidth)
        mapFile.loadPixels();
        this.preProcessed = mapFile.pixels;
        
        // push every fourth pixel from the pixel array to grayConverted
        for (let i = 0; i < this.preProcessed.length; i += 4) { 
            this.greyConverted.push(this.preProcessed[i])
        }

        // resize the greyConverted array into a 100x100 matrix called processed
        for (let i = 0; i < sqrt(this.greyConverted.length); i += 1) {
            this.processed[i] = this.greyConverted.slice(i*this.mapWidth, i*this.mapWidth + this.mapWidth)
        }

        // for every position in the matrix where the pixel value is 255, create a sprite at that position * tileWidth
        for (let i = 0; i < sqrt(this.greyConverted.length); i += 1) {      // for height of matrix
            for (let j = 0; j < sqrt(this.greyConverted.length); j += 1) {  // for width of matrix
                if (this.processed[i][j] == 255) {

                    let block = createSprite(j*this.tileWidth, i*this.tileWidth, this.tileWidth, this.tileWidth);
                    block.addImage(img)
                    this.blocks.add(block);
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