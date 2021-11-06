
class Grapple {

    constructor(owner) {
        this.owner = owner;
    
        this.ray = new Ray(this.owner.position, 0); // raycast for grapple point calculation

        this.grappled = false;
        this.canGrapple = true;
        this.grappleResetTimer = 0;
        this.grapplePoint;

    }


    useWeapon(x, y) {

        if (mouseIsPressed && this.canGrapple == true) {

            if (this.grappled == false) {
                
                this.grapplePoint = player.ray.rayCast(x, y)
                this.grappled = true;
                this.grappleResetTimer = 0;
            }

            // set player attraction point to intersection
            stroke(255);
            line(this.owner.sprite.position.x, this.owner.sprite.position.y, this.grapplePoint.x, this.grapplePoint.y);
            this.owner.sprite.attractionPoint(2, this.grapplePoint.x, this.grapplePoint.y);
        }

        else if (!mouseIsPressed) {
            this.grappled = false;
            
        }

        // timing for grapple cooldown
        if (this.canGrapple == false) {

            if (this.grappleResetTimer >= 40) {
                this.canGrapple = true;
            }

            this.grappleResetTimer++;
            this.grappleResetTimer = constrain(this.grappleResetTimer, 0, 40);
        }
    }
}


