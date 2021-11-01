class Boundary {

    constructor(x1, y1, x2, y2) {

        this.aOg = createVector(x1, y1);    // original values for tracking
        this.bOg = createVector(x2, y2);    // original values for tracking

        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);

    }


    draw() {
        stroke(255);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }

    bind(x, y) {

        this.a.x = x + this.aOg.x;
        this.a.y = y - this.aOg.y;

        this.b.x = x + this.bOg.x;
        this.b.y = y + this.bOg.y;

    }
}


let boundaries = [];    // boundaries array stores all boundaries


function createBoundingBox(x, y, d) {   // creates a square of boundaries given a coordinate and diameter

    d = d / 2;

    boundaries.push(new Boundary(x - d, y - d,   x + d, y - d));
    boundaries.push(new Boundary(x + d, y - d,   x + d, y + d));
    boundaries.push(new Boundary(x + d, y + d,   x - d, y + d));
    boundaries.push(new Boundary(x - d, y + d,   x - d, y - d));
}