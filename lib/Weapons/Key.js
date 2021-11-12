
class Grapple {

    constructor(owner, keyImg) {
        this.owner = owner;
    
        this.keyImg = keyImg;
        this.sprite = createSprite(0, 0, 0, 0,);
        this.sprite.addImage("key", this.closedImg);
        this.weaponAngle = 0;
    
        this.ray = new Ray(this.owner.position, 0); // raycast for grapple point calculation

    }


    useWeapon(x, y) {

        if (mouseIsPressed && this.canGrapple) {

            // set player attraction point to intersection
            stroke(255);
            strokeWeight(2);
            line(this.owner.sprite.position.x + (25*cos(this.weaponAngle)), this.owner.sprite.position.y + (25 * sin(this.weaponAngle)), this.grapplePoint.x, this.grapplePoint.y);
            this.owner.sprite.attractionPoint(0.8, this.grapplePoint.x, this.grapplePoint.y);
        }

        // if mouse is not pressed, player is not grappled
        else if (!mouseIsPressed) {
            this.grappled = false;
            this.sprite.changeImage("closed");
        }

        // timing for grapple cooldown
        if (!this.canGrapple) {

            if (this.grappleResetTimer >= 40) {
                this.canGrapple = true;
            }

            this.grappleResetTimer++;
            this.grappleResetTimer = constrain(this.grappleResetTimer, 0, 40);
        }
    
        this.followMouse();
    }


    followMouse() {

        this.sprite.position = this.owner.sprite.position;

        // if grappled, point the grapple towards the grapple point
        if (this.grappled) {
            this.weaponAngle = atan2(this.grapplePoint.y - this.sprite.position.y, this.grapplePoint.x - this.sprite.position.x);
        }

        // else, point the grapple towards the mouse
        else {
            this.weaponAngle = atan2(this.owner.crosshair.y - this.sprite.position.y, this.owner.crosshair.x - this.sprite.position.x);
        }


        // look left if owner crosshair is left of owner
        if (this.owner.crosshair.x < this.owner.sprite.position.x) {

            this.sprite.rotation = degrees(-this.weaponAngle)
            this.sprite.mirrorY(-1);
        }

        // look right if owner crosshair is right of owner
        else if (this.owner.crosshair.x > this.owner.sprite.position.x) {

            this.sprite.mirrorX(1);
            this.sprite.rotation = degrees(this.weaponAngle);
            this.sprite.mirrorY(1);
        }

        drawSprite(this.sprite);
    }
}

