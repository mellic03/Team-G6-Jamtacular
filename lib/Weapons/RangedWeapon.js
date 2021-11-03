
class RangedWeapon {

    constructor(owner) {
        this.owner = owner;
    }


    useWeapon(x, y) {

        if (mouseIsPressed && mouseButton === LEFT) {
            let projectile = createSprite(this.owner.sprite.x, this.owner.sprite.y, 5, 5);
            projectile.setDirection
        }
    }
}
