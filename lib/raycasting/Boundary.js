class Boundary {

    constructor(x1, y1, x2, y2) {

        this.aOg = createVector(x1, y1);    // original values for tracking
        this.bOg = createVector(x2, y2);    // original values for tracking

        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
    }


    bind(x, y) {

        this.a.x = x + this.aOg.x;
        this.a.y = y - this.aOg.y;

        this.b.x = x + this.bOg.x;
        this.b.y = y + this.bOg.y;
    }
}



function createBoundingBox(x, y, d, arry) {   // creates a square of boundaries given a coordinate and diameter

    d = d / 2;

    arry.push(new Boundary(x - d, y - d,   x + d, y - d));
    arry.push(new Boundary(x + d, y - d,   x + d, y + d));
    arry.push(new Boundary(x + d, y + d,   x - d, y + d));
    arry.push(new Boundary(x - d, y + d,   x - d, y - d));
}