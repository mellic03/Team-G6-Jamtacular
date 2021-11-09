
class RangedWeapon {

    // owner must be passed to weapon for it to work
    // ammo, fireRate and spread can be edited but timing shouldn't
    // ammo is infinite by default

    constructor(owner, projectileImg, weaponImg, weaponAnim) {
        this.owner = owner;

        this.ammo = Infinity;   // ammo count
        this.fireDelay = 5; // number of frames between projectiles
        this.spread = 2;   // projectile spread
        this.damage = 0;

        this.timing = 0;   // dont edit

        this.weaponAngle = 0;

        this.projectileImg = projectileImg;

        this.sprite;

        this.weaponImg;
        if (weaponImg) {
            this.weaponImg = weaponImg;
        }

        this.weaponAnim;
        if (weaponAnim) {
            this.weaponAnim = weaponAnim;
            this.sprite = createSprite(0, 0, 0, 0,);
            this.sprite.addAnimation("fire", this.weaponAnim);
            this.sprite.animation.stop();
            this.sprite.depth = 5
        }
    }


    useWeapon(x, y) {

        // projectile creation

        if (this.timing / this.fireDelay > 0.4) {

            let projectile;

            // create projectiles at an offset if there is a weapon animation
            if (this.weaponAnim) {
                this.sprite.animation.play();
                projectile = createSprite(40 * cos(this.weaponAngle) + this.owner.sprite.position.x, 40 * sin(this.weaponAngle) + this.owner.sprite.position.y, 5, 5);
            }

            // create projectile at owner center if there is no weapon animation
            else {
                projectile = createSprite(this.owner.sprite.position.x,this.owner.sprite.position.y, 5, 5);
            }

            projectile.addImage(this.projectileImg);
            projectile.attractionPoint(10, x, y);

            // add random velocity for projectile spread
            projectile.velocity.x += random(-this.spread, this.spread);
            projectile.velocity.y += random(-this.spread, this.spread);

            // add projectile to the owner's projectile group
            this.owner.projectiles.add(projectile);

            this.ammo--;
            this.timing = 0;
        }

       
        // removes projectile that are off-screen
        for (let projectile of this.owner.projectiles) {

            if (projectile.position.dist(camera.position) > 0.7*width) {
                projectile.remove();
            }
        }

        this.timing++;
    }

    followMouse() {

        this.sprite.position = this.owner.sprite.position;

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


