
class Melee {


    constructor(owner, meleeSpriteSheet) {
        this.owner = owner;

        this.timing = 0;   // dont edit

        if (meleeSpriteSheet) {
            this.owner.sprite.addAnimation("melee", meleeSpriteSheet);
        }

    }


    useWeapon() {

        this.owner.sprite.changeAnimation("melee");
        
    }
}