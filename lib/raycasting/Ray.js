class Ray {

    constructor(owner, pos, angle) {
        this.owner = owner;
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(angle);
    }


    lookAt(x, y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }


    draw() {
        stroke(255);
        push();
        translate(this.pos.x, this.pos.y);
        pop();
    }

    cast(wall) {

        let x1 = wall.a.x; 
        let y1 = wall.a.y; 
        let x2 = wall.b.x; 
        let y2 = wall.b.y; 

        let x3 = this.pos.x;
        let y3 = this.pos.y;
        let x4 = this.pos.x + this.dir.x;
        let y4 = this.pos.y + this.dir.y;

        let d = ((x1-x2)*(y3-y4)) - ((y1-y2)*(x3-x4));
        
        if (d == 0) {
            return;
        }

        let t = (((x1-x3)*(y3-y4)) - ((y1-y3)*(x3-x4))) / d;
        let u = (((x1-x3)*(y1-y2)) - ((y1-y3)*(x1-x2))) / d;


        if (t > 0 && t < 1 && u > 0) {
            let pt = createVector();
            pt.x = x1 + (t*(x2-x1));
            pt.y = y1 + (t*(y2-y1));
            return pt;
        }

        else {
            return;
        }

    }

    rayCast(x, y) {
        this.draw();
        this.lookAt(x, y);
        let closestPt = null;
        let record = Infinity;

        for (let boundary of boundaries) {  // iterate through boundaries to detect intersections
        
            let pt = this.cast(boundary);

            if (pt) {   // if an intersection exists

                const d = p5.Vector.dist(pt, this.owner.sprite.position);

                if (d < record) {   // find the nearest intersection
                    record = d;
                    closestPt = pt;
                }
            }
        }

        if (closestPt) {
            //line(this.owner.sprite.position.x, this.owner.sprite.position.y, closestPt.x, closestPt.y);
            return closestPt;
        }
    }
 
}