class Weapon {
    
    constructor(owner, type, image) {

        this.owner = owner.sprite;
        this.type = type;
        this.sprite = createSprite(this.x, this.y, 20, 20);
        this.sprite.addImage(image);
        this.sprite.depth = 1;


        if (this.type == "melee") {
            this.damage = 10;
        }

        else if (this.type == "pistol") {
            this.damage = 20;
        }

        else if (this.type = "other type") {
            this.damage = Infinity;
        }
    }


    draw() {

        this.sprite.position = owner.position;

        if (this.type == "pistol") {
            
        }

    }


}