
class Grapple {

    constructor(owner) {
        this.owner = owner;
    
        this.ray = new Ray(this.owner.position, 0); // raycast for grapple point calculation

        this.grappled = false;
        this.canGrapple = true;
        this.grapplePoint;
        this.grappleResetTimer = 240;
    }


    useWeapon(x, y) {

        // grapple recharge bar
        noStroke();
        fill(255, 0, 0)
        rect(this.owner.position.x - 12.5, this.owner.position.y - 50, 25, 5);
        fill(0, 255, 0);
        rect(this.owner.position.x - 12.5, this.owner.position.y - 50, 25 * (this.grappleResetTimer/240), 5);

        if (mouseIsPressed && mouseButton === LEFT && this.canGrapple == true) {

            if (this.grappled == false) {
                
                this.grapplePoint = player.rayCast(x, y)
                this.grappled = true;
                this.grappleResetTimer = 0;
            }

            // set player attraction point to intersection
            stroke(255);
            line(this.owner.position.x, this.owner.position.y, this.grapplePoint.x, this.grapplePoint.y);
            this.owner.attractionPoint(2, this.grapplePoint.x, this.grapplePoint.y);
        }

        else if (!mouseIsPressed) {
            this.grappled = false;
        }

        // timing for grapple cooldown
        if (this.canGrapple == false) {

            if (this.grappleResetTimer >= 240) {
                this.canGrapple = true;
            }

            this.grappleResetTimer++;
            this.grappleResetTimer = constrain(this.grappleResetTimer, 0, 240);
        }
    }
}


function mouseReleased() {
    if (mouseButton == LEFT && player.grapple.canGrapple == true) {
        player.grapple.canGrapple = false;
    }
}