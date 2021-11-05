
class RangedWeapon {

    constructor(owner) {
        this.owner = owner;
        
        this.ammo;
        this.timing = 0;
        this.FIRE_RATE = 5; // number of frames between projectiles

        this.spread = 25;
    }


    useWeapon(x, y) {

        // projectile creation
        if (this.timing % this.FIRE_RATE == 0 && this.ammo > 0) {

            let projectile = createSprite(this.owner.sprite.position.x, this.owner.sprite.position.y, 5, 5);
            projectile.attractionPoint(10, x + random(-this.spread, this.spread), y + random(-this.spread, this.spread));
            this.owner.projectiles.add(projectile);
            
            this.ammo--;
        }

        // removes projectile that are off-screen
        for (let projectile of this.owner.projectiles) {

            if (projectile.position.dist(this.owner.sprite.position) > 0.7*width) {
                projectile.remove();
            }
        }

        this.timing++;
    }
}


