
class Melee {


    constructor(owner, meleeSpriteSheet) {
        
        this.owner = owner;

        this.timer = 0;

        if (meleeSpriteSheet) {
            this.owner.sprite.addAnimation("melee", meleeSpriteSheet);
        }
    }


    useWeapon() {

        this.owner.sprite.changeAnimation("melee");

        if (this.timer > 60) {
            let meleeProjectile = createSprite(this.owner.sprite.position.x, this.owner.sprite.position.y, 10, 10);
            meleeProjectile.attractionPoint(5, this.owner.crosshair.x, this.owner.crosshair.y);
            meleeProjectile.depth = 10;
            meleeProjectile.visible = false;
            this.owner.projectiles.add(meleeProjectile);
            this.timer = 0;
        }

        this.timer++;

    }
}