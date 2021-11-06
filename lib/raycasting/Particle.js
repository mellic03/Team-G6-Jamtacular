class Particle {

    constructor() {
        this.pos = createVector(width/2, height/2);
        this.rays = [];
        for (let a = 0; a < 360; a += 5) {
            this.rays.push(new Ray(this, this.pos, radians(a)));
        }
    }


    cast(walls) {   // emit ray objects and detects which boundaries are closest

        for (let ray of this.rays) {
            
            let closestPt = null;
            let record = Infinity;

            for (let wall of walls) {
                
                const pt = ray.cast(wall);

                if (pt) {

                    const d = p5.Vector.dist(pt, this.pos);

                    if (d < record) {
                        record = d;
                        closestPt = pt;
                    }
                } 
            }

            if (closestPt) {    
                
                stroke(150, 0, 0);
                line(this.pos.x, this.pos.y, closestPt.x, closestPt.y);
                
                // add this code for cool rendering
                //for (let block of map.blocks) {

                //    if (p5.Vector.dist(block.position, closestPt) < 110) {

                //        //drawSprite(block);
                //    }
                //}
            }
        }
    }


    update(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

}
