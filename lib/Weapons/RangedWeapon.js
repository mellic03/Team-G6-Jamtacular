
class RangedWeapon {

    // owner must be passed to weapon for it to work
    // ammo, fireRate and spread can be edited but timing shouldn't
    // ammo is infinite by default

    constructor(owner, projectileImg, spriteImg) {
        this.owner = owner;

        this.ammo = Infinity;   // ammo count
        this.fireDelay = 5; // number of frames between projectiles
        this.spread = 25;   // projectile spread

        this.timing = 0;   // dont edit

        this.projectileImg = projectileImg;

        this.sprite;

        if (spriteImg) {
            this.sprite = createSprite(0, 0, 0, 0,);
            this.sprite.addImage(spriteImg);
            this.sprite.depth = 5
        }

    }


    useWeapon(x, y) {

        // projectile creation
        if (this.timing % this.fireDelay == 0 && this.ammo > 0) {

            let projectile = createSprite(this.owner.sprite.position.x, this.owner.sprite.position.y, 5, 5);
            projectile.addImage(this.projectileImg);

            projectile.attractionPoint(10, x + random(-this.spread, this.spread), y + random(-this.spread, this.spread));

            this.owner.projectiles.add(projectile);
            
            this.ammo--;
        }

        // removes projectile that are off-screen
        for (let projectile of this.owner.projectiles) {

            if (projectile.position.dist(camera.position) > 0.7*width) {
                projectile.remove();
            }
        }


        if (this.sprite) {

            
        }

        this.timing++;
    }

    followMouse() {

        this.sprite.position = this.owner.sprite.position;


        let weaponAngle = atan2(this.owner.crosshair.y - this.sprite.position.y, this.owner.crosshair.x - this.sprite.position.x);
    
        // look left if owner crosshair is left of owner
        if (this.owner.crosshair.x < this.owner.sprite.position.x) {

            this.sprite.rotation = degrees(-weaponAngle)
            this.sprite.mirrorY(-1);
        }

        // look right if owner crosshair is right of owner
        else if (this.owner.crosshair.x > this.owner.sprite.position.x) {

            this.sprite.mirrorX(1);
            this.sprite.rotation = degrees(weaponAngle);
            this.sprite.mirrorY(1);
        }


        drawSprite(this.sprite);
    }
}


