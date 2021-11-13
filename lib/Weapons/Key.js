
class Key {

    constructor(owner, keyImg) {
        this.owner = owner;
    
        this.keyImg = keyImg;
        this.sprite = createSprite(0, 0, 0, 0,);
        this.sprite.addImage("key", keyImg);
        this.weaponAngle = 0;
    }


    useWeapon(x, y) {


        this.followMouse();
    }


    followMouse() {

        this.sprite.position.x = this.owner.sprite.position.x + 15 * Math.sign(this.owner.crosshair.x - this.owner.sprite.position.x);
        this.sprite.position.y = this.owner.sprite.position.y;
        
        this.weaponAngle = atan2(this.owner.crosshair.y - this.sprite.position.y, this.owner.crosshair.x - this.sprite.position.x);

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


