
class RangedWeapon {

    // owner must be passed to weapon for it to work
    // ammo, fireRate and spread can be edited but timing shouldn't
    // ammo is infinite by default

    constructor(owner, projectileImg) {
        this.owner = owner;

        this.ammo = Infinity;   // ammo count
        this.fireDelay = 5; // number of frames between projectiles
        this.spread = 25;   // projectile spread

        this.timing = 0;   // dont edit

        this.projectileImg = projectileImg;
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

        this.timing++;
    }
}


